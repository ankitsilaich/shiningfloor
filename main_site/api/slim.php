<?php

require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=shiningfloor;host=localhost', 'root', 'sahil');

$db = new NotORM($pdo);

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

/*************************************  EMAIL VERIFICATION ***********************************/

$email_html_code1 = '
            <html lang="en"><head>
<meta charset="utf-8">
<title>Make email template</title>
<link rel="shortcut icon" href="images/favicon.png" type="image/png">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="cache">
<meta http-equiv="Pragma" content="cache">
<meta http-equiv="Expires" content="1000">
<style type="text/css">
  @import url(http://fonts.googleapis.com/css?family=Open+Sans);
  body{overflow: hidden}
  img{max-width:600px;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
  a{text-decoration:none;border:0;outline:none;color:#bbb}
  a img{border:none}
  p{margin-top: 0;margin-bottom: 0;text-align:left;}
  td,h1,h2,h3{font-family:Helvetica,Arial,sans-serif;font-weight:400}
  td{text-align:center}
  body{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width:100%;height:100%;color:#37302d;background:#fff;font-size:16px}
  table{border-collapse:collapse!important}
  .headline{color:#fff;font-size:36px}
  .force-full-width{width:100%!important}
  .force-width-80{width:80%!important}
  .force-width-40{width:50%!important}
  @media screen {
    td,h1,h2,h3{font-family:"Open Sans","Helvetica Neue",Arial",sans-serif"!important}
  }
   @media only screen and (max-width: 600px) {
    table[class="w290"]{width:290px!important}
    table[class="w300"]{width:300px!important}
    table[class="w320"]{width:480px!important}
    table[class*="w100p"]{width:100%!important}
    td[class="w320"]{width:4800px!important}
    td[class="mobile-center"]{text-align:center!important}
    td[class*="mobile-padding"]{padding-left:20px!important;padding-right:20px!important;padding-bottom:20px!important}
    td[class*="mobile-block"]{display:block!important;width:100%!important;text-align:left!important;padding-bottom:20px!important}
    td[class*="mobile-border"]{border:0!important}
    td[class*="reveal"]{display:block!important}
    td[class*="mobile-spacing"]{padding-top:10px!important;padding-bottom:10px!important}
    *[class*="mobile-hide"]{display:none!important}
    *[class*="mobile-br"]{font-size:12px!important}
    td[class*="mobile-w20"]{width:20px!important}
    img[class*="mobile-w20"]{width:20px!important}
    img[class*="w320"]{width:250px!important;height:67px!important}
    .mobile-padding {padding:10px 30px !important;;}
  }
  @media only screen and (max-width: 480px) {
    table[class="w290"]{width:290px!important}
    table[class="w300"]{width:300px!important}
    table[class="w320"]{width:300px!important}
    table[class*="w100p"]{width:100%!important}
    td[class="w320"]{width:300px!important}
    td[class="mobile-center"]{text-align:center!important}
    td[class*="mobile-padding"]{padding-left:20px!important;padding-right:20px!important;padding-bottom:20px!important}
    td[class*="mobile-block"]{display:block!important;width:100%!important;text-align:left!important;padding-bottom:20px!important}
    td[class*="mobile-border"]{border:0!important}
    td[class*="reveal"]{display:block!important}
    td[class*="mobile-spacing"]{padding-top:10px!important;padding-bottom:10px!important}
    *[class*="mobile-hide"]{display:none!important}
    *[class*="mobile-br"]{font-size:12px!important}
    td[class*="mobile-w20"]{width:20px!important}
    img[class*="mobile-w20"]{width:20px!important}
    img[class*="w320"]{width:250px!important;height:67px!important}
    td[class*="activate-now"]{padding-right:0!important;padding-top:20px!important}
    td[class*="mobile-align"]{text-align:left!important}
    td[class*="mobile-center"]{text-align:center!important}
    .mobile-padding {padding:10px 10px !important;}
  }
</style>
<style type="text/css"></style></head>
<body offset="0" class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none" bgcolor="#eeebeb">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
    <tbody><tr>
      <td align="center" valign="top" style="background-image: url(images/background/13.jpg);background-size: auto 100%;background-position: top center;background-repeat:no-repeat" width="100%">
        <center>
          <table style="margin:0 auto;" cellspacing="0" height="60" cellpadding="0" width="100%">
            <tbody><tr>
              <td style="text-align: center;">
                <a href="#"><img width="91" height="28" src="../../images/logo-white.png" alt="company logo"></a>
              </td>
            </tr>
          </tbody></table>
          <table cellspacing="0" cellpadding="0" width="600" class="w320" style="border-radius: 4px;overflow: hidden;">
            <tbody><tr>
              <td align="center" valign="top">
                <table cellspacing="0" cellpadding="0" class="force-full-width">
                  <tbody><tr>
                    <td class="bg bg1" style="background-color:#F1F2F5;">
                      <table cellspacing="0" cellpadding="0" class="force-full-width">
                        <tbody><tr>
                          <td style="font-size:24px; font-weight: 600; color: #121212; text-align:center;" class="mobile-spacing">
                            <div class="mobile-br">&nbsp;</div>
                            <span319db5>Welcome to Themes Lab
                            <br>
                          </span319db5></td>
                        </tr>
                        <tr>
                          <td style="font-size:17px; text-align:center; padding: 10px 75px 0; color:#6E6E6E;" class="w320 mobile-spacing mobile-padding">
                            <span319db5>We are happy to meet you and hope you have an amazing time with us.<br><br>
                          </span319db5></td>
                        </tr>
                      </tbody></table>
                      <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#F1F2F5">
                        <tbody><tr>
                          <td>
                            <img src="../../images/phone-mockup2.png" style="max-width:100%; display:block;">
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
                <table cellspacing="0" cellpadding="0" class="force-full-width">
                  <tbody><tr>
                    <td class="bg bg1" style="background-color:#F1F2F5;">
                      <center>
                        <br><br><table style="margin: 0 auto" cellpadding="0" cellspacing="0" class="force-width-80">
                          <tbody><tr>
                            
                            <td class="mobile-resize" style="color:#172838; font-size: 20px; font-weight: 600; text-align: left; vertical-align: top;">
                              <span319db5>Activate your account now
                            </span319db5></td>
                          </tr>
                        </tbody></table>
                        <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
                          <tbody><tr>
                            <td style="text-align:left; color: #6f6f6f;">
                              <br>
                              <p319db5>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br>Sed do eiusmod tempor ullamco laboris.
                                Quis nostrud exercitation nisi ut aliquip ex ea commodo!
                              <p></p>
                          </p319db5></td></tr>
                        </tbody></table>
                      </center>
                      <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                        <tbody><tr>
                          <td style="text-align:center; margin:0 auto;">
                            <br>
                            <div>
                              
                                  <a class="btn" href="' ;
$email_html_code2 =  '" style="background-color:#172838;color:#ffffff;display:inline-block;font-family:"Source Sans Pro", Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:240px;-webkit-text-size-adjust:none;
                                    -webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;">Confirm Email Address</a>
                                 
                            </div>
                            <br>
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
          </tbody></table>
          <table cellspacing="0" cellpadding="0" width="600" class="w320" style="border-radius: 4px;overflow: hidden;">
            <tbody><tr>
              <td align="center" valign="top">
                <table cellspacing="0" cellpadding="0" class="force-full-80" style="width:80%;margin:auto">
                  <tbody><tr>
                    <td style="text-align:center;">
                      &nbsp;
                  </td></tr>
                  <tr>
                    <td style="color:#D2D2D2;;color:rgba(255,255,255,0.7); font-size: 14px;padding-bottom:4px;">
                      <table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="force-width-50 w100p">
                        <tbody><tr>
                          <td style="text-decoration:underline;height:30px;text-align:left" class="mobile-center">
                            <span319db5>Update subscription preferences
                          </span319db5></td>
                        </tr>
                      </tbody></table>
                      <table border="0" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="force-width-50 w100p">
                        <tbody><tr>
                          <td style="text-decoration:underline;height:30px;text-align:right" class="mobile-center">
                            <span319db5>Unsubscribe from this list
                          </span319db5></td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
                <table cellspacing="0" cellpadding="0" class="force-full-80" style="width:80%;margin:auto">
                  <tbody><tr>
                    <td style="text-align:center;">
                      &nbsp;
                  </td></tr>
                  <tr>
                    <td style="color:#D2D2D2;color:rgba(255,255,255,0.5); font-size: 14px;padding-bottom:4px;">
                      <table border="0" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="force-width-50">
                        <tbody><tr>
                          <td style="height:21px;text-align:center;font-size:12px;" class="mobile-center">
                            <span319db5>Copyright © 2015 Your Company, All Right Reserved.
                          </span319db5></td>
                        </tr>
                        <tr>
                          <td style="height:21px;text-align:center;font-size:12px;" class="mobile-center">
                            <span319db5>795 Folsom Avenue, Suite 600. San Francisco, CA 94107, United State
                          </span319db5></td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:12px;">
                      &nbsp;
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
          </tbody></table>
          <table cellspacing="0" cellpadding="0" class="force-full-width">
          <tbody><tr>
            <td style="font-size:12px;">
              &nbsp;
              <br>
            </td>
          </tr>
        </tbody></table>
        </center>
      </td>
    </tr>
  </tbody></table>

</body></html>
            ';
    // $postdata = file_get_contents("php://input");
    // $request = json_decode($postdata);
    // @$email = $request->email;
    // echo $email;

$app->post("/shiningfloor/email_verification/:email", function ($email=null) use ($app, $db) {
     // $request = $app->request();
      

      // var_dump($body);
    // $email_id = $app->request()->post('email'); 
     //echo $email;   
    
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


$app->get('/products(/:id)', function($id=null) use ($app, $db){
    
    if($id == null){
        $data = array();
        
        foreach($db->products() as $p){
            $usages_area =array();
            $designs = array();
            $subtypes = array();
            $surface_types = array();
            $colors = array();
            $features = array();
            
            foreach ($p->products_usages() as $product_usages) {

                $usages_area[] = $product_usages->usages['usage_name']; 
            }

            foreach ($p->product_designs() as $product_designs) {

                $designs[] = $product_designs->designs['design_name']; 
            }
            foreach ($p->product_subtypes() as $product_subtypes) {

                $subtypes[] = $product_subtypes->subtypes['subtype_name']; 
            }
            
            foreach ($p->product_surface_types() as $product_surface_types) {

                $surface_types[] = $product_surface_types->surface_types['surface_type_name']; 
            }
            foreach ($p->product_colors() as $product_colors) {

                $colors[] = $product_colors->colors['color_name']; 
            }
            foreach ($p->product_features() as $product_features) {

                $features[] = $product_features->features['feature_name']; 
            }

            // array_push($data,$usages_area);            
        //
            $data[] = array(
                            'product_brand' =>   $p['product_brand'],
                            'product_name' => $p['product_name'],
                            'product_desc' =>  $p['product_desc'],
                            'product_img' =>  $p['product_img'],
                            'product_usages'=> $usages_area,
                            'product_designs'=> $designs,
                            'product_subtypes'=> $subtypes,
                            'product_surface_types'=> $surface_types,
                            'product_colors'=> $colors,
                            'product_features'=> $features
                            
                              
                        );
            
        
        }

    } else {
        

        $data = null;
        

        // if($p = $db->products()->where('product_id', $id)->fetch()){
        //     $data = array(
        //                     'product_brand' =>   $p['product_brand'],
        //                     'product_name' => $p['product_name'],
        //                     'product_desc' =>  $p['product_desc'],
        //                     'product_img' =>  $p['product_img']
        //                 );
        // }

        foreach($db->products()->where('id', $id) as $p){
            $usages_area =array();
            $designs = array();
            $subtypes = array();
            $surface_types = array();
            $colors = array();
            $features = array();
            
            foreach ($p->products_usages() as $product_usages) {

                $usages_area[] = $product_usages->usages['usage_name']; 
            }

            foreach ($p->product_designs() as $product_designs) {

                $designs[] = $product_designs->designs['design_name']; 
            }
            foreach ($p->product_subtypes() as $product_subtypes) {

                $subtypes[] = $product_subtypes->subtypes['subtype_name']; 
            }
            
            foreach ($p->product_surface_types() as $product_surface_types) {

                $surface_types[] = $product_surface_types->surface_types['surface_type_name']; 
            }
            foreach ($p->product_colors() as $product_colors) {

                $colors[] = $product_colors->colors['color_name']; 
            }
            foreach ($p->product_features() as $product_features) {

                $features[] = $product_features->features['feature_name']; 
            }

            // array_push($data,$usages_area);            
        //
            $data[] = array(
                            'product_brand' =>   $p['product_brand'],
                            'product_name' => $p['product_name'],
                            'product_desc' =>  $p['product_desc'],
                            'product_img' =>  $p['product_img'],
                            'product_usages'=> $usages_area,
                            'product_designs'=> $designs,
                            'product_subtypes'=> $subtypes,
                            'product_surface_types'=> $surface_types,
                            'product_colors'=> $colors,
                            'product_features'=> $features
                            
                              
                        );
            
        }
    }
    
    $app->response()->header('content-type','application/json');
    
    echo json_encode(array('product_data'=>$data));    
});

/****** AutoSuggest Get call for products *******/

$app->get('/shiningfloor/autosuggest/products(/:input)', function($input=null) use ($app, $db){

  // if($input==null){
  //   $query= '';
  // }
  // else
  {
    // echo "'%'$input'%'";
    $query = $db->products->where('product_name LIKE ?' ,"%".$input."%")->order('product_rating');
    $data = findAllProducts($query,'');
  }

  $app->response()->header('content-type','application/json');
  echo json_encode(array('result_data'=>$data));  
});



// For finding all products of a given supplier

$app->get('/shiningfloor/products/suppliers(/:supplierId)', function($supplierId=null) use ($app, $db){
    
        $supplierData = array();
        $productData = array();
        $query='';
        if($supplierId!=null){
            if(isset($_GET['products_details']) and $_GET['products_details']=='true'){
                $query = $db->products->where('supplierID',$supplierId);
                $productData = findAllProducts($query,'');
            }
            $query2 = $db->suppliers->where('supplierID',$supplierId);
            $supplierData = findSupplierDetails($query2);

            
            $data =  array_merge($supplierData,$productData);
            $app->response()->header('content-type','application/json');
            echo json_encode(array('supplier_details'=>$supplierData ,'supplier_products'=>$productData )); 
            // echo json_encode(array('supplier_details'=>$supplierData)); 
           // echo json_encode($data);  
        }   
        else{

            if(isset($_GET['products_details']) and $_GET['products_details']=='true'){
                $query = $db->products();
                $productData = findAllProducts($query,'');
            }
            $supplierData = array();
            $query2 = $db->suppliers();
            foreach($query2 as $p){
                $supplierData[] = findSupplierDetails($query2);
            }

            
            $data =  array_merge($supplierData,$productData);
            $app->response()->header('content-type','application/json');
            echo json_encode(array('supplier_details'=>$supplierData ,'supplier_products'=>$productData )); 
        }

         
        
});

// For finding usages of given type say tiles or marbles
$app->get('/shiningfloor/products(/:type)/usages', function($type) use ($app, $db){

      $usages_area;
      $type_id = $db->types()->where('type_name',$type)->select('id')->fetch();

      // $query = $db->products->where('type_id',$type_id);
      $query = $db->products_usages()->where('type_id',$type_id);
            
      foreach ($query as $p) 
          $usages_area[] = $p->usages['usage_name'];
                                  
        $app->response()->header('content-type','application/json');
        echo json_encode(array('products_name' => $type,
                                  'locations'=>$usages_area));    
        // echo json_encode($_GET['sortkey']);

});

$app->get('/shiningfloor/products(/:type)/search(/:input)', function($type=null,$input=null ) use ($app, $db){

        $data = array();
        $type_id = $db->types()->where('type_name',$type)->select('id');
        if($type==null)
        {
            $query = $db->products();
        }
        else{
            $query = $db->products->where('type_id',$type_id);
        }        
        if($input!=null)
        {
          $query = $query->where('product_name LIKE ?' ,"%".$input."%");
        }

        $data = findAllProducts($query,'');

        $app->response()->header('content-type','application/json');
         echo json_encode(array('product_data'=>$data));    
       
});



// For finding all products of type say tiles or marbles
$app->get('/shiningfloor/products(/:type)(/:usage_location)', function($type=null,$usage_location=null ) use ($app, $db){

        $data = array();
        $type_id = $db->types()->where('type_name',$type)->select('id');
        if($type==null)
        {
            $query = $db->products();
        }
        else{
            $query = $db->products->where('type_id',$type_id);
        }        
        if(isset($_GET['sortkey']) and isset($_GET['sortorder'])){
            $query = $query->order($_GET['sortkey'].' '.$_GET['sortorder']);
        }
        // if(isset($_GET['q']) ){
        //   if($_GET['q']!='')
        //     $query = $query->where('product_name LIKE ?' ,"%".$_GET['q']."%") ;
        //   // echo $query;
        // }
        // if(isset($_GET['totalResults']) and isset($_GET['pageNo'])){
        //     //echo json_encode(((( int )$_GET['pageNo'] -1)*( int )$_GET['totalResults']));
        //     //$_GET['totalResults']
        //     $query = $query->limit($_GET['totalResults'],((( int )$_GET['pageNo'] -1)*( int )$_GET['totalResults']))  ;  
        //    // echo json_encode($query);
        // }
        
        if($type==null)            
            $data = findAllProducts($query,'');
        else          
            $data = findAllProducts($query,$usage_location);

        $app->response()->header('content-type','application/json');
         echo json_encode(array('product_data'=>$data));    
        // echo json_encode($_GET['sortkey']);

    });


function findAllProducts($query,$usage_location){
    $data = array();
    foreach($query as $p)
    {
    
        $usages_area =array();
        $designs = array();
        $subtypes = array();
        $surface_types = array();
        $colors = array();
        $features = array();
        
        $flag = 0;
        foreach ($p->products_usages() as $product_usages) {
            if($usage_location==null){   
                $usages_area[] = $product_usages->usages['usage_name']; 
            }
            else{
               
                if($product_usages->usages['usage_name'] == $usage_location){
                    $flag = 1;
                }
                $usages_area[] = $product_usages->usages['usage_name'];
            }
        }
        if($usage_location!=null)
            if(!$flag) continue; 

        foreach ($p->product_designs() as $product_designs) {

            $designs[] = $product_designs->designs['design_name']; 
        }
        foreach ($p->product_subtypes() as $product_subtypes) {

            $subtypes[] = $product_subtypes->subtypes['subtype_name']; 
        }
        
        foreach ($p->product_surface_types() as $product_surface_types) {

            $surface_types[] = $product_surface_types->surface_types['surface_type_name']; 
        }
        foreach ($p->product_colors() as $product_colors) {

            $colors[] = $product_colors->colors['color_name']; 
        }
        foreach ($p->product_features() as $product_features) {

            $features[] = $product_features->features['feature_name']; 
        }

        // array_push($data,$usages_area);            
    //
        $data[] =  array(
                         'product_id' => $p['id'],
                        'product_brand' =>   $p['product_brand'],
                        'product_name' => $p['product_name'],
                        'product_type_id' => $p['type_id'],
                        'product_desc' =>  $p['product_desc'],
                        'product_img' =>  $p['product_img'],
                        'product_usages'=> $usages_area,
                        'product_designs'=> $designs,
                        'product_subtypes'=> $subtypes,
                        'product_surface_types'=> $surface_types,
                        'product_colors'=> $colors,
                        'product_features'=> $features,
                        'product_price'=>$p['product_price'],
                        'product_rating' => $p['product_rating'],
                        'product_supplierID' => $p['supplierID'],
                        'product_isDiscountAvailable' => $p['isDiscountAvailable'],
                        'product_isProductAvailable' => $p['isProductAvailable']                              
                    );
    }

        // return $data;
    if(isset($_GET['totalResults']) and isset($_GET['pageNo'])){                   
        // echo ((( int )$_GET['pageNo'] -1)*( int )$_GET['totalResults']) . $_GET['pageNo'];
        return array_slice($data,((( int )$_GET['pageNo'] -1)*( int )$_GET['totalResults']),( int )$_GET['totalResults']);

    }
    else{
        return $data;
    }
}

function findSupplierDetails($query){
        $supplierData = array();
        $p =  $query->fetch();
        
        $supplierData[] =  array(
                            'supplier_firstname' =>   $p['contactFirstName'],
                            'supplier_lastname' => $p['contactLastName'],
                            'supplier_titlename' => $p['contactTitle'],
                            'supplier_address' =>  $p['address'],
                            'supplier_city' =>  $p['city'],
                            'supplier_postal_code' =>$p['postalcode'],
                            'supplier_state'=> $p['state'],
                            'supplier_country'=> $p['country'],
                            'supplier_contact_no'=> $p['contactNo'],
                            'supplier_email'=> $p['email'],
                            'supplier_company_name'=> $p['companyName'],
                            'supplier_payment_method' => $p['paymentMethods']                            
                        );
        return $supplierData;
}


$app->run();