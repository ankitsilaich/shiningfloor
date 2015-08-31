<?php
// ---------------- Seller Authentication ---------------- //

$authenticate_seller = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['seller'])) {
          echo 'not seller';
//            $app->redirect('/shiningfloor/admin-shiningfloor/#/access/signin');
        }
    };
};
//------------ Post method for seller to athenticate ------------------//
$app->post("/auth/process/seller", function() use ($app, $db)
{
    $array    = (array) json_decode($app->request()->getBody());
    $email    = $array['email'];
    $password = md5(sha1($array['password']));
    $person   = $db->sellers()->where('email', $email)->where('password', $password);
    $count    = count($person);
    if ($count == 1) {
        $_SESSION['seller'] = $email;
        $data             = array(
            'login_success' => "true",
            'login_attempt_by' => $email,
            'message' => "Successfull sigin"
        );
    } else {
        $data = array(
            'login_success' => "false",
            'login_attempt_by' => $email,
            'message' => "please provide correct details"
        );
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

//---------- Seller signup for the build corner --------------//
$app->post("/auth/signup/seller", function() use ($app, $db)
{
    $array    = (array) json_decode($app->request()->getBody());
    $email    = $array['email'];
    // $password = $array['password'];
    $q = $db->sellers()->where('email',$email);
    if($q->fetch()){
        $data = array(
            'signup_success' => "false",
            'message' => "please provide correct details"
        );
    }
    else
    {
      $array['password'] = md5(sha1($array['password']));
      $joindate=getdate(date("U"));
//      echo  "$joindate[month] $joindate[mday], $joindate[year]";
      $array['join_date'] = "$joindate[month] $joindate[mday], $joindate[year]" ;
      $data = $db->sellers()->insert($array);
//      echo $data;
      $_SESSION['seller'] = $email;
        $data             = array(
            'signup_success' => "true",
            'message' => "Successfull signup"
        );
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

//------ Get authentication details ------------------//

$app->get('/auth/process/seller', function() use ($app)
{
    if (isset($_SESSION['seller'])) {
        $data = $_SESSION['seller'];
    } else {
        $data = false;
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

// ----------   Logout Process --------------//

$app->get("/auth/logout/seller", function() use ($app)
{
    unset($_SESSION['seller']);
});


//------------ Seller Details --------------//

$app->get('/shiningfloor/seller/info' , $authenticate_seller($app) ,function() use ($app, $db)
{
       $email = $_SESSION['seller'];
       //$id = $db
        $data = null;
        if ($seller = $db->sellers()->where('email', $email)->fetch()) {
             $allp = $db->sellers_products()->where('sellers_id',$seller['id']);
             $countall = count($allp);
            $data = array(
                'id' => $seller['id'],
                'owner_name' => $seller['owner_name'],
                'owner_phone' => $seller['owner_phone'], 
                'address' => $seller['address'],
                'name' => $seller['name'],
                'email' => $seller['email'],
                'img'=> $seller['image_name'],
                'phone' => $seller['phone'],
                'pincode' => $seller['pincode'],
                'city' => $seller['city'],
                'state' => $seller['state'],
                'storename' => $seller['storename'],
                'comments' => $seller['comments'],
                'noofproducts' => $countall
            );
        }
    $seller = array(
        'seller_data' => $data
    );
    $app->response()->header('content-type', 'application/json');
    echo json_encode($seller);
});

//--------------- Sellerupdate Information --------------//

$app->put('/shiningfloor/sellers/update', $authenticate_seller($app),function() use ($app, $db)
{
    $email = $_SESSION['seller'] ;
    $seller = $db->sellers()->where('email', $email);
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    if ($seller->fetch()) {
       $post = (array) json_decode($app->request()->getBody());
        $info = array(
                'owner_name' => $post['owner_name'],
                'owner_phone' => $post['owner_phone'],                
                'name' => $post['name'],
                'phone' => $post['phone'],
                'storename' => $post['storename'],
                'email' => $post['email'],
                'address' => $post['address'],
                'pincode' => $post['pincode'],
                'city' => $post['city'],
                'state' => $post['state'],
                'comments' => $post['comments']
        );
        $data = $seller->update($info);
    }
    echo json_encode(array(
        "status" => (bool) $post,
        "message" => "data updated successfully"
    ));
});


// upload profile pic
$app->post('/seller/uploadprofile', $authenticate_seller($app),function() use ($app,$db)
{
     $user = $_SESSION['seller'];  
     // echo $user;    
     $seller = $db->sellers()->where('email',$user)->select('id')->fetch();      
     $seller_id = $seller['id'] ;
     // echo $seller_id;
     if ( !empty( $_FILES ) ) {
     $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
     $temp = explode(".",$_FILES["file"]["name"]);
      
     $newfilename = $seller_id .'.jpg';
     $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/sellers/'  .$newfilename;
     move_uploaded_file( $tempPath, $uploadPath );
     $answer = array( 'lastid' => $seller_id,
     'filename' => $newfilename);
     echo $db->sellers->where('email',$user)->fetch(); 
     if($db->sellers->where('email',$user)->update(array('image_name'=>  '../uploads/sellers/'.$newfilename)))
        echo json_encode( array('status' => 'success'));
      // else
      //   echo json_encode( array('status' => 'fail'));
        
    } else {
     echo 'No files';
    }
});
// --------------- Choose products from already listed products ------------- //

$app->get('/shiningfloor/seller/chooseproducts', $authenticate_seller($app), function() use ($app, $db)
{
        $data  = array();
        $email = $_SESSION['seller'];
        $user_id = $db->sellers->where('email',$email)->fetch('id');
        if($user_id){
        global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
        global $resultPerPage , $pageNo ;
        $get = filter_input_array(INPUT_GET);
        if(array_key_exists('pageNo', $get)){
            $pageNo = ( int )$get['pageNo'] ;
          }
        findAllFilters();
        $query ='';
//        $query = $db->products()->where("NOT id", $db->sellers_products()->where('sellers_id',$user_id )->select('products_id'));
        $query = $db->products(); // Choose all products which are currently on website and available for edit.
        if(isset($_GET['category']))
            $query =  categoryFilteredQuery($_GET['category'],$query);
        if(isset($_GET['query']))
            $query = $query->where('product_name LIKE ?' ,"%".$_GET['query']."%");
        $query = setFinalFilterQuery($query);
        $totalResults = count($query);
        $start = (($pageNo -1)*( int )$resultPerPage);
        $last = $start + $resultPerPage;
        if($last> $totalResults){
        $last = $totalResults;
        }
        $query = $query->order('product_price ASC');
        $query = $query->limit(30,$start) ;
        //echo $query;
        $data = findAllProducts($query,'');
        $app->response()->header('content-type','application/json');
        echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));
    }
    else
    {
        echo 'error';
    }
});

//-------------- Delete a product from seller account not from DB ---------------//

$app->delete('/shiningfloor/seller/deleteproduct(/:product_id)', $authenticate_seller($app), function($product_id) use ($app, $db)
{
//echo 'ss';
  $data = null;
  $email = $_SESSION['seller'];
  $seller_id = $db->sellers()->where('email', $email)->fetch()['id'];
  $p = $db->sellers_products()->where('sellers_id', $seller_id)->where('products_id',$product_id) ;
    //  $product = $db->deposits()->where('id', $p['products_id']);
   if ($p->fetch()) {
        $data = $p->delete();
    }
  $app->response()->header('Content-Type', 'application/json');
 echo json_encode($data);
});

//----------------------- Seller listed products ---------------------------//

$app->get('/shiningfloor/seller/selectedproducts', $authenticate_seller($app),function() use ($app, $db)
{
        $user = $_SESSION['seller'];
        $user_id = $db->sellers->where('email',$user)->fetch();
        global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
        global $resultPerPage , $pageNo ;
        $get = filter_input_array(INPUT_GET);
        if(array_key_exists('pageNo', $get)){
            $pageNo = ( int )$get['pageNo'] ;
          }
        if($user_id){
        $data  = array();
        findAllFilters();       // All filters from url
        $query ='';
        $p = $db->sellers_products()->where('sellers_id',$user_id)->select('products_id');
        $query = $db->products()->where('id',$p);
        if(isset($_GET['category'])){
            $type_id = $db->types()->where('type_name',$_GET['category'])->select('id');
            $query = $query->where('type_id',$type_id);
//            echo $query;
       }
        if(isset($_GET['query']))
            $query = $query->where('product_name LIKE ?' ,"%".$_GET['query']."%");
        $query = setFinalFilterQuery($query) ;
        $totalResults = count($query);
        $start = (($pageNo -1)*( int )$resultPerPage);
        $last = $start + $resultPerPage;
        if($last> $totalResults){
          $last = $totalResults;
        }
        $query = $query->order('product_price ASC');
        $query = $query->limit(30,$start) ;
        foreach ($query as $p) {
            $usages =array();
            $applications = array();
            $images = array();         
            $colors = array(); 
            foreach ($p->product_colors() as $product_colors) {
                $colors[] = $product_colors['color_name'];
            }
            foreach ($p->product_usages() as $product_usages) {
                $usages[] = $product_usages['usage_name'];
            }
            foreach ($p->product_applications() as $product_applications) {
                $applications[] = $product_applications['application_name'];
            }
             
            foreach ($p->product_images() as $product_images) {
                $images[] = $product_images['image_name'];
            }
        $product_category = '';
        foreach ($db->types() as $product_type) {
            if($product_type['id'] == $p['type_id'])
              $product_category = $product_type['type_name'];
        }
        foreach ($p->sellers_products() as $q ) {
              $seller_product_price = $q['price'];
              $seller_product_comments = $q['comments'] ;
              $seller_minimum_boxes = $q['minimum_boxes'] ;
              $seller_product_code = $q['seller_product_code'] ;
               
              $seller_total_quantity = $q['total_quantity'];
         }
          $data[] =  array(
                         'product_id' => $p['id'],
                        'product_brand' =>   $p['product_brand'],
                        'product_name' => $p['product_name'],
                        'product_category' => $product_category ,
                        'product_type_id' => $p['type_id'],
                        'product_desc' =>  $p['product_desc'], 
                        'product_origin_country' => $p['product_origin_country'],
                         'product_degree_of_variation' => $p['product_degree_of_variation'],
                        'product_material' =>  $p['product_material'],
                        'product_width' =>  $p['product_width'],
                        'product_height' =>  $p['product_height'],
                        'product_thickness' =>  $p['product_thickness'],
                        'product_w_unit' =>  $p['product_width_unit'],
                        'product_h_unit' =>  $p['product_height_unit'],
                        'product_t_unit' =>  $p['product_thickness_unit'],
                        'product_shape' =>  $p['product_shape'],
                        'product_application' =>  $applications,
                        'product_look' =>  $p['product_look'],
                        'product_finish_type'=> $p['product_finish_type'],
                        'product_items_per_box' => $p['product_items_per_box'],    
                        'product_usages'=> $usages,
                        'product_colors'=> $colors,
                        'product_images' =>  $images,
                        'product_features'=> $p['product_desc'],
                        'seller_product_price' => $seller_product_price,
                        'seller_product_comments' => $seller_product_comments,
                        'seller_minimum_boxes' => $seller_minimum_boxes,
                        'seller_product_code' => $seller_product_code,
                        'seller_total_quantity' => $seller_total_quantity
                    );
              }
        $app->response()->header('content-type','application/json');
        echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));
    }
    else
    {
      echo 'error';
    }
});

// Seller Updating his information for products
$app->put('/shiningfloor/seller/products/update_product', function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();

    $data = $db->sellers_products()->where('products_id',$array['products_id'])->where('sellers_id',$seller_id)->update($array);
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);
});
function resize($origin,$width,$height,$saveTo){   
        // some settings
    $max_upload_width = 1200;
    $max_upload_height = 800;
    $remote_file = $saveTo;      
    // if uploaded image was JPG/JPEG
    if($_FILES["file"]["type"] == "image/jpeg" || $_FILES["file"]["type"] == "image/pjpeg"){  
      $image_source = imagecreatefromjpeg($origin);
    }        
    imagejpeg($image_source,$remote_file,80);
    chmod($remote_file,0644);    
    // get width and height of original image
    list($image_width, $image_height) = getimagesize($remote_file);  
     
      $proportions = $image_width/$image_height;   
      if($width && $height){   
          if($image_width>$image_height){
            $new_width = $width;
            $new_height = $height;
          }   
          else{
            $new_height = $height;
            $new_width = $width;
          }   
      } // for original image put 0 , 0
      else{

        if($image_width > $max_upload_width){
          if($image_width>$image_height){            
                $new_width = $max_upload_width ;
                $new_height  = $new_width/$proportions ;
            }
             
          else{
            $new_width = $max_upload_height ;
            $new_height  = $new_width/$proportions ;
          }  
        }
        else{ 
        // if original image width height is lesser than max allowd size than take original image
            $new_height =$image_height;
            $new_width = $image_width ;
        }             
      }     
      $new_image = imagecreatetruecolor($new_width , $new_height);
      $image_source = imagecreatefromjpeg($remote_file);      
      imagecopyresampled($new_image, $image_source, 0, 0, 0, 0, $new_width, $new_height, $image_width, $image_height);
      imagejpeg($new_image,$remote_file,80);      
      imagedestroy($new_image);
      imagedestroy($image_source);   
}

//----------------------------------------
$app->post('/seller/uploadfile(/:id)', $authenticate_seller($app),function($id = null) use ($app,$db)
{
//echo sizeof($_FILES);
  if($id==null)
   {
      $last_product = $db->products()->select('id')->order('id desc')->limit(1,0)->fetch() ;
       $last_id = $last_product['id'] ;
     }
    else{
      $last_id = $id;
    } 
     echo $last_id;
     if ( !empty( $_FILES ) ) {
     $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
     $temp = explode(".",$_FILES["file"]["name"]);
     print_r ($temp);
     $i=1;
     while(file_exists(dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/products' . DIRECTORY_SEPARATOR .$last_id. '_'.$i.'.' .'jpg'))
     {
      echo $i;
            $i++;
     }
     $newfilename = $last_id. '_'.$i.'.' .'jpg';
     $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/products' . DIRECTORY_SEPARATOR .$newfilename;
     resize($tempPath,0,0,"../uploads/products/".$newfilename);
//     move_uploaded_file( $tempPath, $uploadPath );
     $answer = array( 'lastid' => $last_id,
     'filename' => $newfilename);
     $db->product_images->insert(array('image_name'=>  '../uploads/products' . DIRECTORY_SEPARATOR .$newfilename , 'products_id'=>$last_id));
     
     // $db->concept_images->insert(array('concept_name'=>  '../uploads/concepts' . DIRECTORY_SEPARATOR .$newfilename , 'products_id'=>$last_id));
     $json = json_encode( $answer );
     echo $json;
     resize($uploadPath,50,50,"../uploads/products_50_50/".$newfilename);
     resize($uploadPath,100,100,"../uploads/products_100_100/".$newfilename);
     resize($uploadPath,256,256,"../uploads/products_256_256/".$newfilename);
     resize($uploadPath,500,500,"../uploads/products_500_500/".$newfilename);
       
    } else {
     echo 'No files';
    }
      
});

// Uplaod a new concept by seller

$app->post('/seller/uploadConcept(/:id)', $authenticate_seller($app), function($id=null) use ($app,$db)
{
//echo sizeof($_FILES);
  if($id==null)
   {
      $last_product = $db->products()->select('id')->order('id desc')->limit(1,0)->fetch() ;
       $last_id = $last_product['id'] ;
     }
    else{
      $last_id = $id;
    } 
//     $last_id = $last_product['id'] ;
     if ( !empty( $_FILES ) ) {
     $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
     $temp = explode(".",$_FILES["file"]["name"]);
 //    print_r ($temp);
     $i=1;
     while(file_exists(dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/concepts' . DIRECTORY_SEPARATOR .$last_id. '_'.$i.'.' .'jpg'))
     {
            $i++;
     }
     $newfilename = $last_id. '_'.$i.'.' .'jpg';
     $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/concepts' . DIRECTORY_SEPARATOR .$newfilename;
      resize($tempPath,0,0,"../uploads/concepts/".$newfilename);

     // move_uploaded_file( $tempPath, $uploadPath );
     $answer = array( 'lastid' => $last_id,
     'filename' => $newfilename);
     $db->concept_images->insert(array('concept_name'=>  '../uploads/concepts' . DIRECTORY_SEPARATOR .$newfilename , 'products_id'=>$last_id));
     $json = json_encode( $answer );
     echo $json;
     resize($uploadPath,50,50,"../uploads/concepts_50_50/".$newfilename);
     resize($uploadPath,100,100,"../uploads/concepts_100_100/".$newfilename);
     resize($uploadPath,256,256,"../uploads/concepts_256_256/".$newfilename);
     resize($uploadPath,500,500,"../uploads/concepts_500_500/".$newfilename);
    } else {
     echo 'No files';
    }
});


$app->post('/shiningfloor/seller/updateImages(/:product_id)',$authenticate_seller($app), function($product_id) use ($app,$db)
{

});
$app->post('/shiningfloor/seller/updateConceptImages(/:product_id)', $authenticate_seller($app), function($product_id) use ($app,$db)
{
});

//------------------------------------------
$app->post('/shiningfloor/seller/addproduct', $authenticate_seller($app),function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();
    $lastProduct = $db->products()->select('id')->order('id desc')->limit(1,0)->fetch();
    $image_name = (string)($lastProduct['id'] + 1) ;
    $image_name .=  '_1.' .'jpg';
    //echo $image_name;
    // echo($array['name']);
    // //echo $seller_id['id'];
    if($array['thickness']=='') $array['thickness'] = 0;

    $query = $db->products()->where('product_name',ucfirst($array['name']))->where('product_brand', ucfirst($array['brand']))->where('type_id' , $array['type'])->where('product_items_per_box', $array['items_per_box'])->where('product_width', $array['width'])->where('product_height' , $array['height'])->where('product_thickness' , $array['thickness'])->where('product_width_unit' , $array['w_unit'])->where('product_thickness_unit' , $array['t_unit']) ;
    $existedId = $query->select('id')->fetch();
    $product_id = 0;
    if(!$existedId)
    {
      $product = array(
        'product_addedby' =>  $seller_id['id'] ,
        'product_isNew' =>  1 ,        
        'product_editedby' =>  $seller_id['id'] ,        
        'product_name' =>  ucfirst($array['name']) , 
        'product_brand' => ucfirst($array['brand']),
        'product_finish_type' => ucfirst($array['finish_type']),
        'product_desc'=> ucfirst($array['features']),
        'product_shape' =>  ucfirst($array['shape']),
        'product_origin_country' => ucfirst($array['origin_country']),
        'product_degree_of_variation' => $array['variation'],
        'type_id' => $array['type'],
        'product_items_per_box' => $array['items_per_box'],
        'product_material' => ucfirst($array['material']),                   
        'product_look' => ucfirst($array['look']),
        'product_width' => $array['width'],
        'product_height' => $array['height'],
        'product_thickness' => $array['thickness'],
        'product_width_unit' => $array['w_unit'],
        'product_height_unit' => $array['w_unit'],
        'product_isEdited' => 1,        
        'product_thickness_unit' => $array['t_unit']
         
        );

        $data = $db->products()->insert($product);
// if seller insert a new finish, shape, material, look then insert into respective table for next time suggest option .       
        if($array['finish_type']!=''){
          $finish =  $db->finishes()->where('finish_name', $array["finish_type"]);   
          if(!count($finish)){
              $db->finishes()->insert(array('finish_name' => $array['finish_type'] , 'type_id' => 1) );
          }
        }

        if( $array['shape']!=''){
          $shape =  $db->shapes()->where('shape_name',$array["shape"]);
          if(!count($shape) ){
              $db->shapes()->insert(array('shape_name'=> $array['shape'], 'type_id' => 1));
          }
        }
        if( $array['material']!=''){
          $material =  $db->materials()->where('material_name',$array["material"]);
          if(!count($material)){
              $db->materials()->insert(array('material_name'=>$array['material'], 'type_id' => 1));
          }
        }

        if($array['look']!=''){
            $look =  $db->looks()->where('look_name', $array["look"]);
            if(!count($look)){
                $db->looks()->insert(array('look_name' => $array['look'], 'type_id' => 1));
            }
        }


       $colors = explode(",", $array['colors']);
       for($i=0;$i<sizeof($colors);$i++)
       {
            if($colors[$i]!="")
                $db->product_colors->insert(array('color_name'=> $colors[$i] , 'products_id'=>$data['id']));
       }
       $usages = explode(",", $array['usages']);
       for($i=0;$i<sizeof($usages);$i++)
       {
            if($usages[$i]!="")
                $db->product_usages->insert(array('usage_name'=> $usages[$i] , 'products_id'=>$data['id']));
       }
       $applications = explode(",", $array['applications']);
       for($i=0;$i<sizeof($applications);$i++)
       {
            if($applications[$i]!="")
                $db->product_applications->insert(array('application_name'=> $applications[$i] , 'products_id'=>$data['id']));
       }

       $product_id = $data['id'];
    }
    else
    {
        $product_id = $existedId ;
        // IF SAME PRODUCT TRYING TO INSERT AGAIN THEN DONOT CHANGE THE DATA.
    }
    // if same seller you uploaded it trying to add it as new product.
    $query = $db->sellers_products->where('sellers_id',$seller_id['id'])->where('products_id',$product_id);
    $id = $query->select('id')->fetch();
//    echo $id;
    $seller_products = array(
         'sellers_id' =>  $seller_id['id'] ,
         'products_id' =>  $product_id ,
         'price' => $array['price'],        
        'seller_product_code' => $array['seller_product_code'],
        'comments'=> $array['comments'],
        'minimum_boxes' => $array['minimum_boxes'],
        'total_quantity' => $array['total_boxes']
       );
    if(!$id){
        $seller = $db->sellers_products()->insert($seller_products); 
         
    }
    else
        $seller = $db->sellers_products()->where('id',$id)->update($seller_products);

    $app->response()->header('Content-Type', 'application/json');
    if(!$existedId)
      echo json_encode(array('status' => 'new'));
    else
     echo json_encode(array('status' => 'exist'));;
});
//----------------------------

$app->post('/shiningfloor/seller/checkproduct', $authenticate_seller($app),function() use ($app, $db)
{
  $id =0;
    $array = (array) json_decode($app->request()->getBody());
    $query = $db->products->where('product_name',ucfirst($array['product_name']))->where('type_id',$array['product_type'])->where('product_brand',ucfirst($array['product_brand']))->select('id');
    $id = $query->fetch();
    $app->response()->header('Content-Type', 'application/json');
    echo $id;
});

//------------------------------------------
$app->put('/shiningfloor/seller/editproduct/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();

    $product = array(
        'product_editedby' =>  $seller_id['id'] ,
        'product_name' =>  ucfirst($array['name']) , 
        'product_brand' => ucfirst($array['brand']),
        'product_finish_type' => ucfirst($array['finish_type']),
        'product_desc'=> ucfirst($array['features']),
        'product_shape' =>  ucfirst($array['shape']),
        'product_origin_country' => $array['origin_country'],
        'product_degree_of_variation' => $array['variation'],
        'type_id' => $array['type'],
        'product_items_per_box' => $array['items_per_box'],
        'product_material' => ucfirst($array['material']),                   
        'product_look' => ucfirst($array['look']),
        'product_width' => $array['width'],
        'product_height' => $array['height'],
        'product_thickness' => $array['thickness'],
        'product_width_unit' => $array['w_unit'],
        'product_height_unit' => $array['w_unit'],
        'product_isEdited' => 1,        
        'product_thickness_unit' => $array['t_unit']         
        ); 
    
    $product_existed = $db->products()->where('id', $product_id)->fetch();

    if($product_existed['product_isEdited']==0  || ($product_existed['product_isEdited']==1 && $product_existed['product_editedby'] == $seller_id['id']))
    {  
        $data = $db->products()->where('id', $product_id)->update($product);
      if($array['finish_type']!=''){
        $finish =  $db->finishes()->where('finish_name', $array["finish_type"]);   
        if(!count($finish)){
            $db->finishes()->insert(array('finish_name' => $array['finish_type'], 'type_id' => 1));
          }
      }

      if( $array['shape']!=''){
        $shape =  $db->shapes()->where('shape_name',$array["shape"]);
        if(!count($shape) ){
            $db->shapes()->insert(array('shape_name'=> $array['shape'], 'type_id' => 1));
        }
      }
      if( $array['material']!=''){
        $material =  $db->materials()->where('material_name',$array["material"]);
        if(!count($material)){
            $db->materials()->insert(array('material_name'=>$array['material'], 'type_id' => 1));
        }
      }

      if($array['look']!=''){
          $look =  $db->looks()->where('look_name', $array["look"]);
          if(!count($look)){
              $db->looks()->insert(array('look_name' => $array['look'], 'type_id' => 1));
          }
      }

      $colors = explode(",", $array['colors']);
      for($i=0;$i<sizeof($colors);$i++)
      {
        if($colors[$i]!=""){
          $query = $db->product_colors()->where('products_id', $product_id)->where('color_name',$colors[$i]);
          if(!$query->fetch())        
              $db->product_colors->insert(array('color_name'=> $colors[$i] , 'products_id'=>$product_id));
        }
      }
      
      $usages = explode(",", $array['usages']);
      for($i=0;$i<sizeof($usages);$i++)
      {
        if($usages[$i]!=""){
          $query = $db->product_usages()->where('products_id', $product_id)->where('usage_name',$usages[$i]);
          if(!$query->fetch())        
              $db->product_usages->insert(array('usage_name'=> $usages[$i] , 'products_id'=>$product_id));
        }
      }

      $applications = explode(",", $array['applications']);
      for($i=0;$i<sizeof($applications);$i++)
      {
        if($applications[$i]!=""){
          $query = $db->product_applications()->where('products_id', $product_id)->where('application_name',$applications[$i]);
          if(!$query->fetch())        
              $db->product_applications->insert(array('application_name'=> $applications[$i] , 'products_id'=>$product_id));
        }
    }
       $app->response()->header('Content-Type', 'application/json');
       echo json_encode(array('status' => 'success'));
    }
    else{
       $app->response()->header('Content-Type', 'application/json');
       echo json_encode(array('status' => 'fail'));
    }


});

//--------- data for seller edited product
$app->get('/shiningfloor/seller/products/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    // $array = (array) json_decode($app->request()->getBody());
    $seller_product = '';
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();    
    $product_data = $db->sellers_products()->where('products_id',$product_id)->where('sellers_id',$seller_id)->fetch(); 
    if($product_data){
      $seller_product = array(
          
         'products_id' =>  $product_id ,
         'price' => $product_data['price'],        
        'seller_product_code' =>$product_data['seller_product_code'],
        'comments'=> $product_data['comments'],
        'minimum_boxes' => $product_data['minimum_boxes'],
        'total_quantity' => $product_data['total_quantity']
       );
  }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode(array(
        'seller_product_data'=> $seller_product
        ));
});

//----------------- 
$app->post('/shiningfloor/seller/addSellerData/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();    
    $seller_products = array(
         'sellers_id' =>  $seller_id['id'] ,
         'products_id' =>  $product_id ,
         'price' => $array['price'],        
        'seller_product_code' => $array['seller_product_code'],
        'comments'=> $array['comments'],
        'minimum_boxes' => $array['minimum_boxes'],
        'total_quantity' => $array['total_boxes']
       );
    $seller = $db->sellers_products()->insert($seller_products); 
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($seller['id']);
});
// Update request to update a product data of seller

$app->put('/shiningfloor/seller/editSellerData/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();    
    $seller_products = array(
         'sellers_id' =>  $seller_id['id'] ,
         'products_id' =>  $product_id ,
         'price' => $array['price'],        
        'seller_product_code' => $array['seller_product_code'],
        'comments'=> ucfirst($array['comments']),
        'minimum_boxes' => $array['minimum_boxes'],
        'total_quantity' => $array['total_boxes']
       );
    $seller = $db->sellers_products()->where('sellers_id',$seller_id['id'])->where('products_id',$product_id)->update($seller_products); 
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($seller['id']);
});


//------------------------------------------
$app->post('/shiningfloor/seller/addColorsData/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $colors = explode(",", $array['colors']);
    for($i=0;$i<sizeof($colors);$i++)
    {
      if($colors[$i]!=""){
        $query = $db->product_colors()->where('products_id', $product_id)->where('color_name',$colors[$i]);
        if(!$query->fetch())        
            $db->product_colors->insert(array('color_name'=> $colors[$i] , 'products_id'=>$product_id));
      }
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($seller['id']);
});
//------------------------------------------
$app->post('/shiningfloor/seller/addUsagesData/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $usages = explode(",", $array['usages']);
    for($i=0;$i<sizeof($usages);$i++)
    {
      if($usages[$i]!=""){
        $query = $db->product_usages()->where('products_id', $product_id)->where('usage_name',$usages[$i]);
        if(!$query->fetch())        
            $db->product_usages->insert(array('usage_name'=> $usages[$i] , 'products_id'=>$product_id));
      }
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($seller['id']);
});
//------------------------------------------
$app->post('/shiningfloor/seller/addApplicationsData/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $applications = explode(",", $array['applications']);
    for($i=0;$i<sizeof($applications);$i++)
    {
      if($applications[$i]!=""){
        $query = $db->product_applications()->where('products_id', $product_id)->where('application_name',$applications[$i]);
        if(!$query->fetch())        
            $db->product_applications->insert(array('application_name'=> $applications[$i] , 'products_id'=>$product_id));
      }
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($seller['id']);
});


// -----------------------------------------
$app->post('/shiningfloor/seller/sellers_products', $authenticate_seller($app),function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();
    //echo $seller_id['id'];
     $seller_products = array(
          'sellers_id' =>  $seller_id['id'] ,
          'products_id' =>  $array['products_id'] ,
          'price' => $array['price'],
         'total_quantity' => $array['total_quantity'],
         'seller_product_code' => $array['seller_product_code'],
         'comments'=> $array['comments'],
         'minimum_boxes' => $array['minimum_boxes']
        );
    $data = $db->sellers_products()->insert($seller_products);
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);
});

?>