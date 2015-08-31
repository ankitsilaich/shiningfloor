<?php 


$authenticate_admin = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['admin'])) {
            $app->redirect('/shiningfloor/admin-shiningfloor/#/access/signin');
        }
    };
};

$app->post("/auth/process/admin", function() use ($app, $db)
{
    $array    = (array) json_decode($app->request()->getBody());
    $email    = $array['email'];
    $password = md5(sha1($array['password']));
    $person   = $db->admin()->where('email', $email)->where('password', $password);
    $count    = count($person);
//    print_r ($array);
    if ($count == 1) {
        $_SESSION['admin'] = $email;
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

$app->post("/auth/signup/admin", function() use ($app, $db)
{
    $array    = (array) json_decode($app->request()->getBody());
    // $name    = $array['name'];
    $email    = $array['email'];
    // $password = $array['password'];
    $q = $db->admin()->where('email',$email)->fetch('email');
   // echo $q;
    if($q){
        $data = array(
            'signup_success' => "false",
            'message' => "Email already exists"
        );
    }
    else
    {
      $array['password'] = md5(sha1($array['password']));
      $db->admin()->insert($array);
      $_SESSION['admin'] = $email;
        $data             = array(
            'signup_success' => "true",
            'message' => "Successfull signup"
        );
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

$app->get('/auth/process/admin', function() use ($app)
{
    if (isset($_SESSION['admin'])) {
        $data = $_SESSION['admin'];
    } else {
        $data = false;
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
 
$app->get("/auth/logout/admin", function() use ($app)
{
    unset($_SESSION['admin']);
});


$app->delete('/shiningfloor/admin/deleteproduct(/:seller_id)(/:product_id)', $authenticate_admin($app), function($seller_id, $product_id) use ($app, $db)
{
//echo 'ss';
$data = null;
  $p = $db->sellers_products()->where('sellers_id', $seller_id)->where('products_id',$product_id) ;
    //  $product = $db->deposits()->where('id', $p['products_id']);
   if ($p->fetch()) {
        $data = $p->delete();
    }
  $app->response()->header('Content-Type', 'application/json');
 echo json_encode($data);
});
$app->delete('/shiningfloor/admin/deleteseller(/:seller_id)', $authenticate_admin($app), function($seller_id) use ($app, $db)
{
  $data = null;
  foreach( $db->sellers_products()->where('sellers_id', $seller_id) as $p)
  {
    if ($p->fetch()) {
        $p->delete();
     }
  }
    //  $product = $db->deposits()->where('id', $p['products_id']);
   $data = $db->sellers->where('id',$seller_id)->delete();
  $app->response()->header('Content-Type', 'application/json');
  echo json_encode($data);
});

// --------- Seller Info -------------
$app->get('/shiningfloor/admin/sellers/newproducts', $authenticate_admin($app),function() use ($app, $db)
{
    global $resultPerPage , $pageNo ;
    global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
     
    $get = filter_input_array(INPUT_GET);
    // print_r ($get);
    if(array_key_exists('pageNo', $get)){
        $pageNo = ( int )$get['pageNo'] ;
    }
    $type='';
    if(array_key_exists('category', $get)){
        $type = ( int )$get['category'] ;
    }
    $input='';
    if(array_key_exists('query', $get)){ 
        $input = $get['query'] ;
    }
    $data = array();
    $query = $db->products()->where('product_isNew',1);

    if($type!=''){
        $type_id = $db->types()->where('type_name',$types)->fetch();
        $query = $query->where('type_id',$type_id);
    }
    if($input!='')
    {
        $query = $query->where('product_name LIKE ?' ,"%".$input."%");
    }
    findAllFilters();
    $query = setFinalFilterQuery($query) ;
    $totalResults = count($query);
    $start = (($pageNo -1)*( int )$resultPerPage);
    $last = $start + $resultPerPage;
    if($last> $totalResults){
        $last = $totalResults;
    }
    $query = $query->order('id ASC');
    $query = $query->limit(30,$start) ;
    foreach ($query as $p) {
         # code...
        $data[] = array_merge(
                fetchProductData($p) ,
                array('product_addedby' => $p['product_addedby'],
                'product_isEdited' => $p['product_isEdited'],
                'product_editedby' => $p['product_editedby'],                
                'product_isNew' => $p['product_isNew'])
            );
    } 
    $app->response()->header('content-type','application/json');
    echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));

});

// --------- Seller Info -------------
$app->get('/shiningfloor/admin/sellers/editedproducts', $authenticate_admin($app),function() use ($app, $db)
{
    global $resultPerPage , $pageNo ;
    global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
    $get = filter_input_array(INPUT_GET);
    // print_r ($get);
    if(array_key_exists('pageNo', $get)){
        $pageNo = ( int )$get['pageNo'] ;
    }
    $type='';
    if(array_key_exists('category', $get)){
        $type = $get['category'] ;
    }
    $input='';
    if(array_key_exists('query', $get)){ 
        $input = $get['query'] ;
    }
    $data = array();
    $query = $db->products()->where('product_isNew',0)->where('product_isEdited',1);

    if($type!=''){
        $type_id = $db->types()->where('type_name',$type)->fetch();
        $query = $query->where('type_id',$type_id);
    }
    if($input!='')
    {  
        $query = $query->where('product_name LIKE ?' ,"%".$input."%");
    }
    findAllFilters(); 
    $query = setFinalFilterQuery($query) ;
    
    $totalResults = count($query);
    $start = (($pageNo -1)*( int )$resultPerPage);
    $last = $start + $resultPerPage;
    if($last> $totalResults){
        $last = $totalResults;
    }
    $query = $query->order('id ASC');
    $query = $query->limit(30,$start) ;
    foreach ($query as $p) {
         # code...
        $data[] = array_merge(
                fetchProductData($p),
                fetchOtherProductData($p),
                array('product_addedby' => $p['product_addedby'],
                'product_isEdited' => $p['product_isEdited'],
                'product_editedby' => $p['product_editedby'],                
                'product_isNew' => $p['product_isNew'])
            );
    } 
    $app->response()->header('content-type','application/json');
    echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));

});

$app->get('/shiningfloor/admin/chooseproducts(/:id)', $authenticate_admin($app), function($id = null) use ($app, $db)
{
        $data  = array();
        $user = $_SESSION['admin'];
        global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
        global $resultPerPage , $pageNo ;
        findAllFilters();
        $query = $db->products()->where("NOT id", $db->sellers_products()->where('sellers_id',$id )->select('products_id'));
        if(isset($_GET['category']))
            $query =  categoryFilteredQuery($_GET['category'] , $query);
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
});


// --- GET METHOD TO FIND ALL PRODUCTS OF SELLER WITH ID
$app->get('/shiningfloor/admin/selectedproducts(/:id)', $authenticate_admin($app),function($id = null) use ($app, $db)
{
        $user = $_SESSION['admin'];
        $data  = array();
         //$query = $db->products();
        global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
        global $resultPerPage , $pageNo ;
        findAllFilters();
        $query ='';
        $p = $db->sellers_products()->where('sellers_id',$id)->select('products_id');
        $query = $db->products()->where('id',$p);
        if(isset($_GET['category'])){
            $type_id = $db->types()->where('type_name',$_GET['category'])->select('id');
            $query = $query->where('type_id',$type_id);
//            echo $query;
       }
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
              $seller_items_per_box = $q['items_per_box'] ;
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
                        'product_usages'=> $usages,
                        'product_colors'=> $colors,
                        'product_images' =>  $images,
                        'product_features'=> $p['product_desc'],
                        'product_price'=>$p['product_price'],
                        'product_rating' => $p['product_rating'],
                        'product_supplierID' => $p['supplierID'],
                        'product_isDiscountAvailable' => $p['isDiscountAvailable'],
                        'product_isProductAvailable' => $p['isProductAvailable'],
                        'seller_product_price' => $seller_product_price,
                        'seller_product_comments' => $seller_product_comments,
                        'seller_minimum_boxes' => $seller_minimum_boxes,
                        'seller_product_code' => $seller_product_code,
                        'seller_items_per_box' => $seller_items_per_box,
                        'seller_total_quantity' => $seller_total_quantity
                    );
      }
    $app->response()->header('content-type','application/json');
    echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));
});


// Admin Updating his information for products
$app->put('/shiningfloor/sellers_products/update_product', function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $data = $db->sellers_products()->where('products_id',$array['products_id'])->update($array);
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);
});


//   --------------------------
$app->post('/shiningfloor/sellers_products', function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $data = $db->sellers_products()->insert($array);
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);
});



// --------- Seller Info -------------
$app->get('/shiningfloor/sellers(/:id)', $authenticate_admin($app),function($id = null) use ($app, $db)
{
    if ($id == null) {
        $data  = array();
        $count = 0;
        foreach ($db->sellers() as $seller) {
             $allp = $db->sellers_products()->where('sellers_id',$seller['id']);
             $countall = count($allp);
             $data[] = array(
                'id' => $seller['id'],
                'address' => $seller['address'],
                'name' => $seller['name'],
                'email' => $seller['email'],
                'phone' => $seller['phone'],
                'storename' => $seller['storename'],
                'comments' => $seller['comments'],
                 'noofproducts' => $countall
            );
        }
    }
     else {
        $data = null;
        if ($seller = $db->sellers()->where('id', $id)->fetch()) {
             $allp = $db->sellers_products()->where('sellers_id',$id);
             $countall = count($allp);
            $data = array(
                'id' => $seller['id'],
                'address' => $seller['address'],
                'name' => $seller['name'],
                'email' => $seller['email'],
                'phone' => $seller['phone'],
                'storename' => $seller['storename'],
                'comments' => $seller['comments'],
                'noofproducts' => $countall
            );
        }
    }
    $seller = array(
        'seller_data' => $data
    );
    $app->response()->header('content-type', 'application/json');
    echo json_encode($seller);
});


$app->post('/shiningfloor/admin/addseller',$authenticate_admin($app) ,function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $array['password'] = md5(sha1($array['password']));
    $data = $db->sellers()->insert($array);
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);
});
$app->put('/shiningfloor/updatesellers/:id', function($id = null) use ($app, $db)
{
    $seller = $db->sellers()->where('id', $id);
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    if ($seller->fetch()) {
       $post = (array) json_decode($app->request()->getBody());
        $info = array(
                'address' => $post['address'],
                'name' => $post['name'],
                'phone' => $post['phone'],
                'storename' => $post['storename'],
                'email' => $post['email'],
                'comments' => $post['comments']
        );
        $data = $seller->update($info);
    }
    echo json_encode(array(
        "status" => (bool) $post,
        "message" => "data updated successfully"
    ));
});
// verified products search
$app->get('/shiningfloor/admin/products/(:input)', function($input=null ) use ($app, $db){
        global $resultPerPage , $pageNo ;
        $resultPerPage = 10;
        findAllFilters();
        $data = array();
         
        $query =''; 
        $query = $db->verified_products(); 
        if($input!=null)
        {
            $query = $query->where('product_name LIKE ?' ,"%".$input."%");
        }
 
        $totalResults = count($query);
        $start = (($pageNo -1)*( int )$resultPerPage);
        $last = $start + $resultPerPage;
        if($last> $totalResults){
        $last = $totalResults;
        }
        $query = $query->order('product_name ASC');
        $query = $query->limit($resultPerPage,$start) ;        
        $data = findAllProducts($query,'');
        $app->response()->header('content-type','application/json');
        echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));
});

$app->get('/shiningfloor/admin/product(/:id)', function($id=null ) use ($app, $db){         
      $data = array();
      if($id!=null){
        $query =$db->verified_products()->where('id',$id);  
        $data = findAllProducts($query,'');
        $app->response()->header('content-type','application/json');
        echo json_encode(array( 'product_data'=>$data ));
    }
});
?>