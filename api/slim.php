<?php
include 'functions.php';
require_once 'NotORM.php';
$pdo = new PDO('mysql:dbname=buildcorner;host=localhost', 'root', '');
// $pdo = new PDO('mysql:dbname=shiningfloor;host=localhost', 'shiningfloor', 'Shiningfloor');
$db = new NotORM($pdo);
global $db;
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
require_once 'seller.php';
require_once 'admin.php';

/*************************************  EMAIL VERIFICATION ***********************************/
include 'email_content.php';
$app->post("/shiningfloor/email_verification/:email", function ($email=null) use ($app, $db) {
     global $email_html_code1,$email_html_code2;
     $email_fromr = "sahilsolanki07@gmail.com";
     $email_subjectr = "Follow link to change password";
     $email_tor = $email;
     $user = $db->users()->where('email', $email);
     $data ;
     $count  = count($user);
     if($count==1){
         $pwd_update_time = $user->fetch()['pwd_update_time'];
         $send_url='http://ankitsilaich.in/shiningfloor-master/main_site/change_pwd.php?';
         $send_url .= 'email='.$email.'&token='.md5($email.md5($pwd_update_time));
         //echo $send_url;
     $headers3 = 'From:' .'Shining Floor'. " ".'<'.'support@shiningfloor.com'.'>'."\r\n";
     $headers3 .= 'Reply-To: '. $email_fromr. "\r\n";
    $headers3 .= "MIME-Version: 1.0\r\n";
     $headers3 .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $body  = $email_html_code1. $send_url. $email_html_code2;
    //     // echo $body;
    $headersr = 'From: '.$email_fromr."\r\n".
     'Reply-To: '.$email_fromr."\r\n" .
     'X-Mailer: PHP/' . phpversion();
     mail($email_tor, $email_subjectr, $body , $headers3);
    //     // echo "sent";
        $data = array("status"=> "email sent success");
     }
     else{
         $data =  array("status"=>"not registered",
                         "email" => $email
           );
     }
        $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
/**********************************  USER LOGIN SIGNUP CHECKING ******************************/
$authenticate = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['user'])) {
            $app->redirect('/login.html');
        }
    };
};


session_start();



$app->post("/auth/process", function () use ($app, $db) {
    $email = $app->request()->post('email');
    $password = $app->request()->post('password');
    $user = $db->users()->where('email', $email)->where('pwd',md5(md5($password)));
    $count = count($user);
    if($count == 1){
     $_SESSION['user'] = $email;
     $data = array( "loginstatus" => "success",
                        'user' => $email
                    );
     unset($_SESSION['loginAttempt']);
    }else{
        if(isset($_SESSION['loginAttempt'])){
            $_SESSION['loginAttempt']++;
            $loginAttempt = (int)  $_SESSION['loginAttempt'];
            $data[] = array( "loginstatus" => "fail",
                        'loginAttempt' => $loginAttempt
                    );
            header('Refresh: 3; URL=http://localhost/shiningfloor/shiningfloor/main_site/login.html?loginstatus=fail&loginAttempt='.$loginAttempt);
        }
        else{
            $data[] = array( "loginstatus" => "login failure",
                        'loginAttempt' => "1"
                    );
            $_SESSION['loginAttempt'] = 1;
            header('Refresh: 3; URL=http://localhost/shiningfloor/shiningfloor/main_site/login.html?loginstatus=fail&loginAttempt=1');
        }
    }
   $app->response()->header('Content-Type', 'application/json');
   echo json_encode($data);
});
$app->get("/auth/logout", function () use ($app) {
   unset($_SESSION['user']);
});
/********************* pwd change info **********************************/
$app->put('/users/:email', function ($email = null) use ($app, $db) {
     $data = array();
     $app->response()->header("Content-Type", "application/json");
     $user = $db->users()->where("email", $email);
     if(count($user)==1){
          $time = (string) date("h:i:sa");
          // echo $time;
          $post = $app->request()->put();
          // echo $_GET['token'];
          $p = $user->fetch();
          // echo md5($email.md5($p['pwd_update_time']));
          if(md5($email.md5($p['pwd_update_time'])) == $_GET['token'])
           {
            $updated_data = array(
              "pwd" => md5(md5($post['pwd'])),
              "pwd_update_time" => $time
                );
            $result = $user->update($updated_data);
            $data = array(
             "status" => (bool)$result,
              "message" => "user updated successfully"
              );
          }
          else{
            $data = array(
                "status" => false,
                "message" => "Do not act smart bro!!"
            );
          }
    }
    else{
        $data = array(
            "status" => false,
            "message" => "user email does not exist"
        );
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
//Post method to insert data into database
$app->post('/users', function() use ($app, $db){
    $array = (array) json_decode($app->request()->getBody());
     $data = $db->users()->insert($array);
     $app->response()->header('Content-Type', 'application/json');
     echo json_encode($data['id']);
});
//Put method to update the data into database
$app->put('/users/:email', function ($email) use ($app, $db) {
    $user = $db->users()->where('email', $email);
    $data = null;
    if ($user->fetch()) {
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        /*
         * Updating Person
         */
        $data = $user->update($post);
    }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
/*************************************    Products data retrivel  **********************************/
//Get Method to get the data from database
// $app->get('/products(/:id)', function($id=null) use ($app, $db){
//     if($id == null){
//         $data = array();
//         foreach($db->products() as $p){
//             $usages_area =array();
//             $designs = array();
//             $subtypes = array();
//             $surface_types = array();
//             $colors = array();
//             $features = array();
//             foreach ($p->products_usages() as $product_usages) {
//                 $usages_area[] = $product_usages->usages['usage_name'];
//             }
//             foreach ($p->product_designs() as $product_designs) {
//                 $designs[] = $product_designs->designs['design_name'];
//             }
//             foreach ($p->product_subtypes() as $product_subtypes) {
//                 $subtypes[] = $product_subtypes->subtypes['subtype_name'];
//             }
//             foreach ($p->product_surface_types() as $product_surface_types) {
//                 $surface_types[] = $product_surface_types->surface_types['surface_type_name'];
//             }
//             foreach ($p->product_colors() as $product_colors) {
//                 $colors[] = $product_colors->colors['color_name'];
//             }
//             foreach ($p->product_features() as $product_features) {
//                 $features[] = $product_features->features['feature_name'];
//             }
//             // array_push($data,$usages_area);
//         //
//             $data[] = array(
//                             'product_brand' =>   $p['product_brand'],
//                             'product_name' => $p['product_name'],
//                             'product_desc' =>  $p['product_desc'], 
//                             'product_usages'=> $usages_area,
//                             'product_designs'=> $designs,
//                             'product_subtypes'=> $subtypes,
//                             'product_surface_types'=> $surface_types,
//                             'product_colors'=> $colors,
//                             'product_features'=> $features
//                         );
//         }
//     } else {
//         $data = null;
//         foreach($db->products()->where('id', $id) as $p){
//             $usages_area =array();
//             $designs = array();
//             $subtypes = array();
//             $surface_types = array();
//             $colors = array();
//             $features = array();
//             foreach ($p->products_usages() as $product_usages) {
//                 $usages_area[] = $product_usages->usages['usage_name'];
//             }
//             foreach ($p->product_designs() as $product_designs) {
//                 $designs[] = $product_designs->designs['design_name'];
//             }
//             foreach ($p->product_subtypes() as $product_subtypes) {
//                 $subtypes[] = $product_subtypes->subtypes['subtype_name'];
//             }
//             foreach ($p->product_surface_types() as $product_surface_types) {
//                 $surface_types[] = $product_surface_types->surface_types['surface_type_name'];
//             }
//             foreach ($p->product_colors() as $product_colors) {
//                 $colors[] = $product_colors->colors['color_name'];
//             }
//             foreach ($p->product_features() as $product_features) {
//                 $features[] = $product_features->features['feature_name'];
//             }
//             // array_push($data,$usages_area);
//         //
//             $data[] = array(
//                     'product_brand' =>   $p['product_brand'],
//                     'product_name' => $p['product_name'],
//                     'product_desc' =>  $p['product_desc'], 
//                     'product_usages'=> $usages_area,
//                     'product_designs'=> $designs,
//                     'product_subtypes'=> $subtypes,
//                     'product_surface_types'=> $surface_types,
//                     'product_colors'=> $colors,
//                     'product_features'=> $features
//                   );
//         }
//     }
//     $app->response()->header('content-type','application/json');
//     echo json_encode(array('product_data'=>$data));
// });
// --------------------------------------






// Image download from url still have to work on it later.
$app->get('/shiningfloor/downloadImage', function() use ($app,$db)
{
  foreach ($db->products as $p ) {
      if($p['id']<=5005){
      $filenameIn  =  $db->product_images()->where('products_id',$p['id'])->fetch()['image_name'];
            $filenameOut = '../uploads/products/'+$p['id']+'_1.jpg' ;
      $ch = curl_init($filenameIn);
      $fp = fopen( $filenameOut, 'wb');
      curl_setopt($ch, CURLOPT_FILE, $fp);
      curl_setopt($ch, CURLOPT_HEADER, 0);
      curl_exec($ch);
      curl_close($ch);
      fclose($fp);
      // // print_r($filenameIn);
      // // print_r($filenameOut);
      // $contentOrFalseOnFailure   = file_get_contents($filenameIn);
      
      // //Store in the filesystem.
      // $fp = fopen('../uploads/products/'+$p['id']+'_1.jpg', "w");
      // fwrite($fp, $contentOrFalseOnFailure);
      // fclose($fp);
      // $byteCountOrFalseOnFailure = file_put_contents($filenameOut, $contentOrFalseOnFailure);
    }
  }
});




// - --------------------
$prev_id = 0;
$pageNo = 1;
$resultPerPage = 30;
$colorFilters=[];
$priceFilters = [];
$brandFilters = [];
$finishTypeFilters = [];
$materialFilters = [];
$lookFilters = [];
$applicationFilters = [];
$app->get('/shiningfloor/product(/:id)', function($id=null ) use ($app, $db){         
      $data = array();
      if($id!=null){
        $query =$db->products()->where('id',$id);  
        $data = findAllProducts($query,'');
        $app->response()->header('content-type','application/json');
        echo json_encode(array( 'product_data'=>$data ));
    }
});
// Search product results
$app->get('/shiningfloor/products/search(/:type)/(:input)', function($type=null,$input=null ) use ($app, $db){
        
        global $resultPerPage , $pageNo ;
        if(isset($_GET['pageNo'])){
          $pageNo = $_GET['pageNo'];
        }
        findAllFilters();
        $data = array();
        $type_id = $db->types()->where('type_name',$type)->select('id');
        $query ='';
        if($type==null or $type == 'all')
            $query = $db->products();
        else
            $query = $db->products->where('type_id',$type_id);
        if($input!=null)
        {
            $query = $query->where('product_name LIKE ?' ,"%".$input."%");
        }
        $query = setFinalFilterQuery($query) ;
        $totalResults = count($query);
        $start = (($pageNo -1)*( int )$resultPerPage);
        $last = $start + $resultPerPage;
        if($last> $totalResults){
        $last = $totalResults;
        }
        $query = $query->order('product_price ASC');
        $query = $query->limit(30,$start) ;
        $data = findAllProducts($query,'');
        $app->response()->header('content-type','application/json');
        echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));
});

$app->get('/shiningfloor/products/(:input)', function($input=null ) use ($app, $db){
        global $resultPerPage , $pageNo ;
        $resultPerPage = 10;
        findAllFilters();
        $data = array();
         
        $query =''; 
        $query = $db->products(); 
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
// all brands from type name
$app->get('/shiningfloor(/:type)/brands', function($type) use ($app, $db){
    $type_id = $db->types()->where('type_name',$type)->select('id')->fetch();
    $brands = array();
    $query = $db->products()->where('type_id',$type_id)->group('product_brand');
//    echo count($query);
    foreach ($query as $product) {
      if($product['product_brand']!="")
        $brands[] = $product['product_brand'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('brands'=>$brands));
});
/* Get all colors */
$app->get('/shiningfloor/colors', function() use ($app, $db){
    $colors = array();
    foreach ($db->colors() as $color) {
        $colors[] = $color['color_name'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('colors'=>$colors));
});
$app->get('/shiningfloor/finish_types', function() use ($app, $db){    
    $finish_types = array();     
      // $query = $db->products()->group('product_finish_type');
      $query = $db->finishes()->order('finish_name ASC');
    foreach ($query as $finish) {
      if($finish['finish_name']!="")
        $finish_types[] = $finish['finish_name'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('finish_types'=>$finish_types));
});
$app->get('/shiningfloor/applications', function() use ($app, $db){
    $applications = array();
//    $query = $db->products()->group('product_application');
    $query = $db->applications()->order('application_name ASC');
    foreach ($query as $application) {
      if($application['application_name']!="")
        $applications[] = $application['application_name'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('applications'=>$applications));
});
$app->get('/shiningfloor/looks', function() use ($app, $db){
    $looks = array();
    //$query = $db->products()->group('product_look');
    $query = $db->looks()->order('look_name ASC');
    foreach ($query as $look) {
        if($look['look_name']!="")
        $looks[] = $look['look_name'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('looks'=>$looks));
});
$app->get('/shiningfloor/materials', function() use ($app, $db){
    $product_materials = array();
    // $query = $db->products()->group('product_material');
    $query = $db->materials()->order('material_name ASC');
    foreach ($query as $material) {
        if($material['material_name']!="")
        $product_materials[] = $material['material_name'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('materials'=>$product_materials));
});
$app->get('/shiningfloor/shapes', function() use ($app, $db){
    $product_shapes = array();
    // $query = $db->products()->group('product_material');
    $query = $db->shapes()->order('shape_name ASC');
    foreach ($query as $shape) {
        if($shape['shape_name']!="")
        $product_shapes[] = $shape['shape_name'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('shapes'=>$product_shapes));
});
$app->get('/shiningfloor/usages', function() use ($app, $db){
    $product_usages = array();
    // $query = $db->products()->group('product_material');
    $query = $db->usages()->order('usage_name ASC');
    foreach ($query as $usage) {
        if($usage['usage_name']!="")
        $product_usages[] = $usage['usage_name'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('usages'=>$product_usages));
});
$app->get('/shiningfloor/sizes', function() use ($app, $db){
    $product_sizes = array();
    $query = $db->products()->group('product_size');
    foreach ($query as $product) {
        if($product['product_size']!="")
        $product_sizes[] = $product['product_size'];
    }
    $app->response()->header('content-type','application/json');
    echo json_encode(array('sizes'=>$product_sizes));
});
$app->get('/shiningfloor/products/allsellers(/:product_id)', function($product_id=null) use ($app, $db){
    $data= array();
    $minimum_price_per_item = 1000000000;
    $minimum_price_seller = 0;
    $minimum_bill = 0;
    $sellers = array() ;
    foreach ($db->sellers_products()->where('products_id',$product_id) as $p) {
      # code...
      $sellers[] = array(
            'seller_id' => $p['sellers_id'],
            'seller_price' => $p['price'],
            'seller_minimum_boxes' => $p['minimum_boxes'],
            'seller_price_per_item' => $p['price']/$p['items_per_box'],
            'seller_minimum_accept_bill' => ($p['price'] * $p['minimum_boxes'])
       );
      if($p['price']/$p['items_per_box'] < $minimum_price_per_item){
          $minimum_price_seller = $p['sellers_id'];
          $minimum_price_per_item = ($p['price']/$p['items_per_box']);
          $seller_minimum_accept_bill = ($p['price'] * $p['minimum_boxes']);
      }
    }
    $app->response()->header('content-type','application/json');
    echo json_encode( array(
                        'minimum_price_seller_id' => $minimum_price_seller ,
                       'minimum_price_per_item' => $minimum_price_per_item ,
                        'seller_minimum_accept_bill'=> $seller_minimum_accept_bill ,
                        'product_sellers' =>$sellers
                       )
                    );
//    echo $minimum_price_seller .' '.$minimum_price_per_item;
});
$app->run();