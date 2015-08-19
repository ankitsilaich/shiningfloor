<?php
include 'functions.php';
require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=shiningfloor;host=localhost', 'root', '');
// $pdo = new PDO('mysql:dbname=shiningfloor;host=localhost', 'shiningfloor', 'Shiningfloor');

$db = new NotORM($pdo);
global $db;
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

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

$authenticate_seller = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['seller'])) {
            $app->redirect('/shiningfloor/admin-shiningfloor/#/access/signin');
        }
    };
};
$authenticate_admin = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['admin'])) {
            $app->redirect('/shiningfloor/admin-shiningfloor/#/access/signin');
        }
    };
};

session_start();
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

$app->get("/auth/logout/admin", function() use ($app)
{
    unset($_SESSION['admin']);
});

$app->get("/auth/logout/seller", function() use ($app)
{
    unset($_SESSION['seller']);

});


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
$app->get('/shiningfloor/seller/chooseproducts', $authenticate_seller($app), function() use ($app, $db)
{
        $data  = array();
        $email = $_SESSION['seller'];
        $user_id = $db->sellers->where('email',$email)->fetch('id');

    if($user_id){

        global $colorFilters, $priceFilters, $brandFilters , $finishTypeFilters , $applicationFilters;
        global $resultPerPage , $pageNo ;
        findAllFilters();

        $query ='';
        // $query = $db->products()->where("NOT id", $db->sellers_products()->where('sellers_id',$user_id )->select('products_id'));
        $query = $db->products();

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



$app->delete('/shiningfloor/seller/deletesproduct(/:product_id)', $authenticate_seller($app), function($product_id) use ($app, $db)
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

$app->get('/shiningfloor/admin/chooseproducts(/:id)', $authenticate_admin($app), function($id = null) use ($app, $db)
{
        $data  = array();
        $user = $_SESSION['admin'];
        global $colorFilters, $priceFilters, $brandFilters , $finishTypeFilters , $applicationFilters;
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

        global $colorFilters, $priceFilters, $brandFilters , $finishTypeFilters , $applicationFilters;
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

            // foreach ($p->product_colors() as $product_colors) {
            //     $colors[] = $product_colors['color_name'];
            // }

            // foreach ($p->product_usages() as $product_usages) {

            //     $usages[] = $product_usages['usage_name'];
            // }

            // foreach ($p->product_applications() as $product_applications) {

            //     $applications[] = $product_applications['application_name'];
            // }
             
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
                        'product_look' =>  $p['product_look'],
                        'product_finish_type'=> $p['product_finish_type'],
                        // 'product_application' =>  $applications,                
                        // 'product_usages'=> $usages,
                        // 'product_colors'=> $colors,
                        'product_colors' => $p['product_colors'],
                        'product_applications' => $p['product_applications'],
                        'product_usages' => $p['product_usages'],
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

$app->get('/shiningfloor/seller/selectedproducts', $authenticate_seller($app),function() use ($app, $db)
{

        $user = $_SESSION['seller'];
        $user_id = $db->sellers->where('email',$user)->fetch();
        global $colorFilters, $priceFilters, $brandFilters , $finishTypeFilters , $applicationFilters;
        global $resultPerPage , $pageNo ;
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

            // foreach ($p->product_colors() as $product_colors) {
            //     $colors[] = $product_colors['color_name'];
            // }

            // foreach ($p->product_usages() as $product_usages) {

            //     $usages[] = $product_usages['usage_name'];
            // }

            // foreach ($p->product_applications() as $product_applications) {

            //     $applications[] = $product_applications['application_name'];
            // }
             
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
                        // 'product_application' =>  $applications,
                        'product_look' =>  $p['product_look'],
                        'product_finish_type'=> $p['product_finish_type'],
                        // 'product_usages'=> $usages,
                        // 'product_colors'=> $colors,
                        'product_colors' => $p['product_colors'],
                        'product_applications' => $p['product_applications'],
                        'product_usages' => $p['product_usages'],
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

// Admin Updating his information for products

$app->put('/shiningfloor/sellers_products/update_product', function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $data = $db->sellers_products()->where('products_id',$array['products_id'])->update($array);

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);

});

// Seller Updating his information for products

$app->put('/shiningfloor/sellers/products/update_product', function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $data = $db->sellers_products()->where('products_id',$array['products_id'])->update($array);

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);

});
// 
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

//   --------------------------

$app->post('/shiningfloor/sellers_products', function() use ($app, $db)
{

    $array = (array) json_decode($app->request()->getBody());
    $data = $db->sellers_products()->insert($array);

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);

});

function resize($origin,$width,$height,$saveTo){
   
        // some settings
    $max_upload_width = 2592;
    $max_upload_height = 1944;
    $remote_file = $saveTo;  
    
    // if uploaded image was JPG/JPEG
    if($_FILES["file"]["type"] == "image/jpeg" || $_FILES["image_upload_box"]["type"] == "image/pjpeg"){  
      $image_source = imagecreatefromjpeg($origin);
    }   
    // if uploaded image was GIF
    if($_FILES["file"]["type"] == "image/gif"){ 
      $image_source = imagecreatefromgif($_FILES[ 'file' ][ 'tmp_name' ]);
    } 
    // BMP doesn't seem to be supported so remove it form above image type test (reject bmps) 
    // if uploaded image was BMP
    if($_FILES["file"]["type"] == "image/bmp"){ 
      $image_source = imagecreatefromwbmp($_FILES[ 'file' ][ 'tmp_name' ]);
    }     
    // if uploaded image was PNG
    if($_FILES["file"]["type"] == "image/x-png"){
      $image_source = imagecreatefrompng($_FILES[ 'file' ][ 'tmp_name' ]);
    }    
     
    imagejpeg($image_source,$remote_file,100);
    chmod($remote_file,0644);
  
  

    // get width and height of original image
    list($image_width, $image_height) = getimagesize($remote_file);
  
     
      $proportions = $image_width/$image_height;
      
      if($image_width>$image_height){
        $new_width = $width;
        $new_height = $height;
      }   
      else{
        $new_height = $height;
        $new_width = $width;
      }   
      
      
      $new_image = imagecreatetruecolor($new_width , $new_height);
      $image_source = imagecreatefromjpeg($remote_file);
      
      imagecopyresampled($new_image, $image_source, 0, 0, 0, 0, $new_width, $new_height, $image_width, $image_height);
      imagejpeg($new_image,$remote_file,100);
      
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

     move_uploaded_file( $tempPath, $uploadPath );
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
   
    
    // $image_source = imagecreatefromjpeg(     $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/products' . DIRECTORY_SEPARATOR .$newfilename);
    
    // $remote_file = "../uploads/".$_FILES["file"]["name"];
    // imagejpeg($image_source,$remote_file,100);
    // chmod($remote_file,0644);  

    // // get width and height of original image
    // list($image_width, $image_height) = getimagesize($remote_file);

    // if(1){
    //   $proportions = $image_width/$image_height;
      
    //   if($image_width>$image_height){
    //     $new_width = 500;
    //     $new_height = 500;
    //   }   
    //   else{
    //     $new_height = 500;
    //     $new_width = 500;      }         
      
    //   $new_image = imagecreatetruecolor($new_width , $new_height);
    //   $image_source = imagecreatefromjpeg($remote_file);
      
    //   imagecopyresampled($new_image, $image_source, 0, 0, 0, 0, $new_width, $new_height, $image_width, $image_height);
    //   imagejpeg($new_image,$remote_file,100);
      
    //   imagedestroy($new_image);
    // }
    
    // imagedestroy($image_source);    
    


    } else {
     echo 'No files';
    }

      
});

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

     $last_id = $last_product['id'] ;
     if ( !empty( $_FILES ) ) {
     $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
     $temp = explode(".",$_FILES["file"]["name"]);
     print_r ($temp);
     $i=1;
     while(file_exists(dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/concepts' . DIRECTORY_SEPARATOR .$last_id. '_'.$i.'.' .'jpg'))
     {
            $i++;
     }
     $newfilename = $last_id. '_'.$i.'.' .'jpg';
     $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads/concepts' . DIRECTORY_SEPARATOR .$newfilename;

     move_uploaded_file( $tempPath, $uploadPath );
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

$app->post('/seller/updateImages(/:product_id)',$authenticate_seller($app), function($product_id) use ($app,$db)
{

    //  $last_id = $last_product['id'] ;
    //  if ( !empty( $_FILES ) ) {
// print_r($tempPath);
     $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
     print_r($tempPath);
     // $temp = explode(".",$_FILES["file"]["name"]);
     // print_r ($temp);
    //  $i=1;
    //  while(file_exists(dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads' . DIRECTORY_SEPARATOR .$last_id. '_'.$i.'.' .'jpg'))
    //  {
    //         $i++;
    //  }
     $newfilename = $product_id. '_'.'1'.'.' .'jpg';
     $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . '../uploads' . DIRECTORY_SEPARATOR .$newfilename;

     move_uploaded_file( $tempPath, $uploadPath );
    //  $answer = array( 'lastid' => $last_id,
    //  'filename' => $newfilename);
    //  $db->product_images->insert(array('image_name'=>  '../uploads' . DIRECTORY_SEPARATOR .$newfilename , 'products_id'=>$last_id));
    //  $json = json_encode( $answer );
    //  echo $json;
    // } else {
    //  echo 'No files';
    // }
});
$app->post('/seller/updateConceptImages(/:product_id)', $authenticate_seller($app), function($product_id) use ($app,$db)
{
});

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
     $product = array(
        'supplierID' =>  $seller_id['id'] ,
        'product_name' =>  $array['name'] , 
        'product_brand' => $array['brand'],
        'product_finish_type' => $array['finish_type'],
        'product_desc'=> $array['features'],
        'product_shape' =>  $array['shape'],
        'product_origin_country' => $array['origin_country'],
        'product_degree_of_variation' => $array['variation'],
        'type_id' => $array['type'],
         'product_items_per_box' => $array['items_per_box'],
        'product_material' => $array['material'],                   
        'product_look' => $array['look'],
        'product_colors' => $array['colors'],
        'product_applications' => $array['applications'],
        'product_usages' => $array['usages'],
        'product_width' => $array['width'],
        'product_height' => $array['height'],
        'product_thickness' => $array['thickness'],
        'product_width_unit' => $array['w_unit'],
        'product_height_unit' => $array['w_unit'],
        'product_isValid' => 1,        
        'product_thickness_unit' => $array['t_unit']
         
        ); 
    $data = $db->products()->insert($product);
    
    $finish_count =  $db->finishes()->where('finish_name ', $array["finish_type"]);   
    // print_r($finish_count->fetch()); 
    if(!$finish_count->fetch() and $array['finish_type']!=''){
        $db->finishes()->insert(array('finish_name' => $array['finish_type']));
    }

    $shape_count =  $db->shapes()->where('shape_name == ',$array["shape"]);
     
    if(!$shape_count->fetch() and $array['shape']!=''){
        $db->shapes()->insert(array('shape_name'=> $array['shape']));
    }

    $material_count =  $db->materials()->where('material_name',$array["material"]);
    if(!$material_count->fetch() and $array['material']!=''){
        $db->materials()->insert(array('material_name'=>$array['material']));
    }

    $look_count =  $db->looks()->where('look_name', $array["look"]);
    if(!$look_count->fetch() and $array['look']!=''){
        $db->looks()->insert(array('look_name' => $array['look']));
    }

    $seller_products = array(
         'sellers_id' =>  $seller_id['id'] ,
         'products_id' =>  $data['id'] ,
         'price' => $array['price'],        
         'seller_product_code' => $array['seller_product_code'],
         'comments'=> $array['comments'],
         'minimum_boxes' => $array['minimum_boxes'],
         'total_quantity' => $array['total_boxes']
       );
   $seller = $db->sellers_products()->insert($seller_products);

   // $colors = explode(",", $array['colors']);
   // for($i=0;$i<sizeof($colors);$i++)
   // {
   //      if($colors[$i]!="")
   //          $db->product_colors->insert(array('color_name'=> $colors[$i] , 'products_id'=>$data['id']));
   // }
   // $usages = explode(",", $array['usages']);
   // for($i=0;$i<sizeof($usages);$i++)
   // {
   //      if($usages[$i]!="")
   //          $db->product_usages->insert(array('usage_name'=> $usages[$i] , 'products_id'=>$data['id']));
   // }
   // $applications = explode(",", $array['applications']);
   // for($i=0;$i<sizeof($applications);$i++)
   // {
   //      if($applications[$i]!="")
   //          $db->product_applications->insert(array('application_name'=> $applications[$i] , 'products_id'=>$data['id']));
   // }
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);

});

//------------------------------------------
$app->put('/shiningfloor/seller/editproduct/:product_id', $authenticate_seller($app),function($product_id) use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
    $email = $_SESSION['seller'] ;
    $seller_id = $db->sellers()->where('email', $email)->fetch();
    //$lastProduct = $db->products()->select('id')->order('id desc')->limit(1,0)->fetch();
    // $image_name = (string)($lastProduct['id'] + 1) ;
    // $image_name .=  '_1.' .'jpg';  
    $product = array(
        'supplierID' =>  $seller_id['id'] ,
        'product_name' =>  $array['name'] , 
        'product_brand' => $array['brand'],
        'product_finish_type' => $array['finish_type'],
        'product_desc'=> $array['features'],
        'product_shape' =>  $array['shape'],
        'product_origin_country' => $array['origin_country'],
        'product_degree_of_variation' => $array['variation'],
        'type_id' => $array['type'],
        'product_items_per_box' => $array['items_per_box'],
        'product_material' => $array['material'],                   
        'product_look' => $array['look'],
        'product_colors' => $array['colors'],
        'product_applications' => $array['applications'],
        'product_usages' => $array['usages'],
        'product_width' => $array['width'],
        'product_height' => $array['height'],
        'product_thickness' => $array['thickness'],
        'product_width_unit' => $array['w_unit'],
        'product_height_unit' => $array['w_unit'],
        'product_isValid' => 1,        
        'product_thickness_unit' => $array['t_unit']
         
        ); 
    // echo $product_id;
    $data = $db->products()->where('id', $product_id)->update($product);
     // $query = $db->product_colors()->where('products_id', $product_id);
    // foreach ( $query as $color ) {
    //   //if($color->fetch())
    //       $color->delete();
    // }
    // $colors = explode(",", $array['colors']);

    // for($i=0;$i<sizeof($colors);$i++)
    // {
    //     if($colors[$i]!="")
    //         $db->product_colors->insert(array('color_name'=> $colors[$i] , 'products_id'=>$product_id));
    // }
    
    // $query = $db->product_usages()->where('products_id', $product_id);
    // foreach ( $query as $usage ) {
    //     if($usage->fetch())
    //       $usage->delete();
    // }
    // $usages = explode(",", $array['usages']);
    // for($i=0;$i<sizeof($usages);$i++)
    // {
    //     if($usages[$i]!="")
    //         $db->product_usages->insert(array('usage_name'=> $usages[$i] , 'products_id'=>$product_id));
    // }

    // $query = $db->product_applications()->where('products_id', $product_id);
    // foreach ($query as  $application ) {
    //     if($application->fetch())
    //       $application->delete();
    // }
    // $applications = explode(",", $array['applications']);
    // for($i=0;$i<sizeof($applications);$i++)
    // {
    //     if($applications[$i]!="")
    //         $db->product_applications->insert(array('application_name'=> $applications[$i] , 'products_id'=>$product_id));
    // }

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($product_id);

});

//------------------------------------------
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

//------------------------------------------
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
        'comments'=> $array['comments'],
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
          if($colors[$i]!="")
              $db->product_colors->insert(array('color_name'=> $colors[$i] , 'products_id'=>$product_id));
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
          if($usages[$i]!="")
              $db->product_usages->insert(array('usage_name'=> $usages[$i] , 'products_id'=>$product_id));
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
        if($applications[$i]!="")
            $db->product_applications->insert(array('application_name'=> $applications[$i] , 'products_id'=>$product_id));
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
         'items_per_box' => $array['items_per_box'],
         'seller_product_code' => $array['seller_product_code'],
         'comments'=> $array['comments'],
         'minimum_boxes' => $array['minimum_boxes']
        );

    $data = $db->sellers_products()->insert($seller_products);

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

$app->get('/shiningfloor/seller/info' ,function() use ($app, $db)
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

//------------------------------------------
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

// - --------------------
$prev_id = 0;
$pageNo = 1;
$resultPerPage = 30;
$colorFilters=[];
$priceFilters = [];
$brandFilters = [];
$finishTypeFilters = [];
$applicationFilters = [];

$app->get('/shiningfloor/product(/:id)', function($id=null ) use ($app, $db){         
      $data = array();
      if($id!=null){

        $query =$db->products()->where('id',$id);
        if(count($query))  
          $data = findAllProducts($query,'');
                 
        $app->response()->header('content-type','application/json');
        echo json_encode(array( 'product_data'=>$data ));
    }
});

// Search product results
$app->get('/shiningfloor/products/search(/:type)/(:input)', function($type=null,$input=null ) use ($app, $db){
        global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$applicationFilters;
        global $resultPerPage , $pageNo ;
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
        global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$applicationFilters;
        global $resultPerPage , $pageNo ;
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
        $query = $query->limit(5,$start) ;        
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