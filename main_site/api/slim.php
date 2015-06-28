<?php

require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=shiningfloor;host=localhost', 'root', '');


$db = new NotORM($pdo);
global $db;
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
    $password = $array['password'];
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
    $password = $array['password'];
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
    // $name    = $array['name'];
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

// --------------------------------------
$app->get('/shiningfloor/seller/chooseproducts', $authenticate_seller($app), function() use ($app, $db)
{
        $data  = array();
        $email = $_SESSION['seller'];
        $user_id = $db->sellers->where('email',$email)->fetch('id');

    if($user_id){

        global $colorFilters, $priceFilters, $brandFilters;
        global $resultPerPage , $pageNo ;

        if(isset($_GET['pageNo'])){
            $pageNo = ( int )$_GET['pageNo'] ;
        }

        if(isset($_GET['color'])){
            $colorFilters =  explode(',', $_GET['color']);
        }

        if(isset($_GET['price_range'])){
            $priceFilters = explode(',', $_GET['price_range']);
        }

        if(isset($_GET['brand_name'])){
            $brandFilters = explode(',', $_GET['brand_name']);
        }
        if(isset($_GET['finish_types'])){
            $finishTypeFilters =  explode(',', $_GET['finish_types']);
        }
        if(isset($_GET['applications'])){
            $applicationFilters =  explode(',', $_GET['applications']);
        }

        $query ='';

        $query = $db->products()->where("NOT id", $db->sellers_products()->where('sellers_id',$user_id )->select('products_id'));

        if(isset($_GET['category']))
            $query =  categoryFilteredQuery($_GET['category'],$query);

        if(isset($_GET['query']))
            $query = $query->where('product_name LIKE ?' ,"%".$_GET['query']."%");

        if(isset($_GET['price_range']))
            $query = priceFilteredQuery($applicationFilters,$query);

        if(isset($_GET['brand_name']))
            $query = brandFilteredQuery($priceFilters,$query);

        if(isset($_GET['finish_types']))
            $query = finishTypeFilteredQuery($finishTypeFilters,$query);

        if(isset($_GET['applications']))
            $query = applicationFilteredQuery($applicationFilters,$query);

        if(isset($_GET['color']))
            $query = colorFilteredQuery($colorFilters,$query);

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
        global $colorFilters, $priceFilters, $brandFilters;
        global $resultPerPage , $pageNo ;

        if(isset($_GET['pageNo'])){
            $pageNo = ( int )$_GET['pageNo'] ;
        }

        if(isset($_GET['color'])){
            $colorFilters =  explode(',', $_GET['color']);
        }

        if(isset($_GET['price_range'])){
            $priceFilters = explode(',', $_GET['price_range']);
        }

        if(isset($_GET['brand_name'])){
            $brandFilters = explode(',', $_GET['brand_name']);
        }
        if(isset($_GET['finish_types'])){
            $finishTypeFilters =  explode(',', $_GET['finish_types']);
        }
        if(isset($_GET['applications'])){
            $applicationFilters =  explode(',', $_GET['applications']);
        }

        $query = $db->products()->where("NOT id", $db->sellers_products()->where('sellers_id',$id )->select('products_id'));

        if(isset($_GET['category']))
            $query =  categoryFilteredQuery($_GET['category'] , $query);

        if(isset($_GET['query']))
            $query = $query->where('product_name LIKE ?' ,"%".$_GET['query']."%");

        if(isset($_GET['price_range']))
            $query = priceFilteredQuery($priceFilters,$query);

        if(isset($_GET['brand_name']))
            $query = brandFilteredQuery($brandFilters,$query);

        if(isset($_GET['finish_types']))
            $query = finishTypeFilteredQuery($finishTypeFilters,$query);

        if(isset($_GET['applications']))
            $query = applicationFilteredQuery($applicationFilters,$query);

        if(isset($_GET['color']))
            $query = colorFilteredQuery($colorFilters,$query);

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

        global $colorFilters, $priceFilters, $brandFilters;
        global $resultPerPage , $pageNo ;


        if(isset($_GET['pageNo'])){
            $pageNo = ( int )$_GET['pageNo'] ;
        }

        if(isset($_GET['color'])){
            $colorFilters =  explode(',', $_GET['color']);
        }

        if(isset($_GET['price_range'])){
            $priceFilters = explode(',', $_GET['price_range']);
        }

        if(isset($_GET['brand_name'])){
            $brandFilters = explode(',', $_GET['brand_name']);
        }
        if(isset($_GET['finish_types'])){
            $finishTypeFilters =  explode(',', $_GET['finish_types']);
        }
        if(isset($_GET['applications'])){
            $applicationFilters =  explode(',', $_GET['applications']);
        }

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

        if(isset($_GET['price_range']))
          $query = priceFilteredQuery($priceFilters,$query);

        if(isset($_GET['brand_name']))
            $query = brandFilteredQuery($brandFilters,$query);

        if(isset($_GET['finish_types']))
            $query = finishTypeFilteredQuery($finishTypeFilters,$query);

        if(isset($_GET['applications']))
            $query = applicationFilteredQuery($applicationFilters,$query);

        if(isset($_GET['color']))
            $query = colorFilteredQuery($colorFilters,$query);

        $totalResults = count($query);
        $start = (($pageNo -1)*( int )$resultPerPage);
        $last = $start + $resultPerPage;

        if($last> $totalResults){
          $last = $totalResults;
        }

        $query = $query->order('product_price ASC');
        $query = $query->limit(30,$start) ;

        foreach ($query as $p) {

        $usages_area =array();
        $designs = array();
        $subtypes = array();
        $surface_types = array();
        $colors = array();
        $features = array();

        foreach ($p->product_colors() as $product_colors) {
            $colors[] = $product_colors->colors['color_name'];
        }

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

        foreach ($p->product_features() as $product_features) {
            $features[] = $product_features->features['feature_name'];
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

         }

          $data[] =  array(
                         'product_id' => $p['id'],
                        'product_brand' =>   $p['product_brand'],
                        'product_name' => $p['product_name'],
                        'product_category' => $product_category ,
                        'product_type_id' => $p['type_id'],
                        'product_desc' =>  $p['product_desc'],
                        'product_img' =>  $p['product_img'],
                        'product_url' =>  $p['product_url'],
                        'product_material' =>  $p['product_material'],
                        'product_size' =>  $p['product_size'],
                        'product_application' =>  $p['product_application'],
                        'product_look' =>  $p['product_look'],
                        'product_finish_type'=> $p['product_finish_type'],
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
                        'product_isProductAvailable' => $p['isProductAvailable']   ,
                        'seller_product_price' => $seller_product_price,
                        'seller_product_comments' => $seller_product_comments,
                        'seller_minimum_boxes' => $seller_minimum_boxes,
                        'seller_product_code' => $seller_product_code,
                        'seller_items_per_box' => $seller_items_per_box
                    );
      }
    $app->response()->header('content-type','application/json');
    echo json_encode(array( 'totalResults' => $totalResults , 'start' => $start,'last' => $last  , 'product_data'=>$data ));


});

$app->get('/shiningfloor/seller/selectedproducts', $authenticate_seller($app),function() use ($app, $db)
{

        $user = $_SESSION['seller'];
        $user_id = $db->sellers->where('email',$user)->fetch();

        if($user_id){

        $data  = array();
         //$query = $db->products();

        global $colorFilters, $priceFilters, $brandFilters;
        global $resultPerPage , $pageNo ;


        if(isset($_GET['pageNo'])){
            $pageNo = ( int )$_GET['pageNo'] ;
        }

        if(isset($_GET['color'])){
            $colorFilters =  explode(',', $_GET['color']);
        }

        if(isset($_GET['price_range'])){
            $priceFilters = explode(',', $_GET['price_range']);
        }

        if(isset($_GET['brand_name'])){
            $brandFilters = explode(',', $_GET['brand_name']);
        }
        if(isset($_GET['finish_types'])){
            $finishTypeFilters =  explode(',', $_GET['finish_types']);
        }
        if(isset($_GET['applications'])){
            $applicationFilters =  explode(',', $_GET['applications']);
        }

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

        if(isset($_GET['price_range']))
          $query = priceFilteredQuery($priceFilters,$query);

        if(isset($_GET['brand_name']))
            $query = brandFilteredQuery($brandFilters,$query);

        if(isset($_GET['finish_types']))
            $query = finishTypeFilteredQuery($finishTypeFilters,$query);

        if(isset($_GET['applications']))
            $query = applicationFilteredQuery($applicationFilters,$query);

        if(isset($_GET['color']))
            $query = colorFilteredQuery($colorFilters,$query);

        $totalResults = count($query);
        $start = (($pageNo -1)*( int )$resultPerPage);
        $last = $start + $resultPerPage;

        if($last> $totalResults){
          $last = $totalResults;
        }

        $query = $query->order('product_price ASC');
        $query = $query->limit(30,$start) ;

        foreach ($query as $p) {

        $usages_area =array();
        $designs = array();
        $subtypes = array();
        $surface_types = array();
        $colors = array();
        $features = array();

        foreach ($p->product_colors() as $product_colors) {
            $colors[] = $product_colors->colors['color_name'];
        }

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

        foreach ($p->product_features() as $product_features) {
            $features[] = $product_features->features['feature_name'];
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

         }

          $data[] =  array(
                         'product_id' => $p['id'],
                        'product_brand' =>   $p['product_brand'],
                        'product_name' => $p['product_name'],
                        'product_category' => $product_category ,
                        'product_type_id' => $p['type_id'],
                        'product_desc' =>  $p['product_desc'],
                        'product_img' =>  $p['product_img'],
                        'product_url' =>  $p['product_url'],
                        'product_material' =>  $p['product_material'],
                        'product_size' =>  $p['product_size'],
                        'product_application' =>  $p['product_application'],
                        'product_look' =>  $p['product_look'],
                        'product_finish_type'=> $p['product_finish_type'],
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
                        'product_isProductAvailable' => $p['isProductAvailable']   ,
                        'seller_product_price' => $seller_product_price,
                        'seller_product_comments' => $seller_product_comments,
                        'seller_minimum_boxes' => $seller_minimum_boxes,
                        'seller_product_code' => $seller_product_code,
                        'seller_items_per_box' => $seller_items_per_box
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

//   --------------------------

$app->post('/shiningfloor/sellers_products', function() use ($app, $db)
{

    $array = (array) json_decode($app->request()->getBody());
    $data = $db->sellers_products()->insert($array);

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data['id']);

});

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

$app->get('/shiningfloor/sellers(/:id)', function($id = null) use ($app, $db)
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
                'address' => $seller['address'],
                'name' => $seller['name'],
                'email' => $seller['email'],
                'phone' => $seller['phone'],
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

$app->post('/shiningfloor/sellers', function() use ($app, $db)
{
    $array = (array) json_decode($app->request()->getBody());
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


$app->put('/shiningfloor/sellers/update', $authenticate_seller($app),function() use ($app, $db)
{

    $email = $_SESSION['seller'] ;
    $seller = $db->sellers()->where('email', $email);
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

// - --------------------
$prev_id = 0;
$pageNo = 1;
$resultPerPage = 30;
$colorFilters=[];
$priceFilters = [];
$brandFilters = [];

// Search data results
$app->get('/shiningfloor/products/search(/:type)/(:input)', function($type=null,$input=null ) use ($app, $db){
        global $colorFilters, $priceFilters, $brandFilters;
        $data = array();
        global $resultPerPage , $pageNo ;

        $type_id = $db->types()->where('type_name',$type)->select('id');

        if(isset($_GET['pageNo'])){
            $pageNo = ( int )$_GET['pageNo'] ;
        }

        if(isset($_GET['color'])){
            $colorFilters =  explode(',', $_GET['color']);
        }

        if(isset($_GET['price_range'])){
            $priceFilters = explode(',', $_GET['price_range']);
        }

        if(isset($_GET['brand_name'])){
            $brandFilters = explode(',', $_GET['brand_name']);
        }
        if(isset($_GET['finish_types'])){
            $finishTypeFilters =  explode(',', $_GET['finish_types']);
        }
        if(isset($_GET['applications'])){
            $applicationFilters =  explode(',', $_GET['applications']);
        }

        $query ='';

        if($type==null or $type == 'all')
            $query = $db->products();
        else
            $query = $db->products->where('type_id',$type_id);

        if($input!=null)
        {
            $query = $query->where('product_name LIKE ?' ,"%".$input."%");
        }

        if(isset($_GET['price_range']))
            $query = priceFilteredQuery($priceFilters,$query);

        if(isset($_GET['brand_name']))
            $query = brandFilteredQuery($brandFilters,$query);

        if(isset($_GET['finish_types']))
            $query = finishTypeFilteredQuery($finishTypeFilters,$query);

        if(isset($_GET['applications']))
            $query = applicationFilteredQuery($applicationFilters,$query);

        if(isset($_GET['color']))
            $query = colorFilteredQuery($colorFilters,$query);


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

/* Get all colors */

$app->get('/shiningfloor/colors', function() use ($app, $db){

    $colors = array();
    foreach ($db->colors() as $color) {
        $colors[] = $color['color_name'];
    }
    $data[] = array( 'product_colors'=> $colors  );
    $app->response()->header('content-type','application/json');
    echo json_encode(array('colors'=>$data));
});


// For finding all products of a given supplier

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
            'seller_items_per_box' => $p['items_per_box'],
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

/*  Functions starts here   */

function categoryFilteredQuery($category, $query){
    global $db;
    $type_id = $db->types()->where('type_name', $category)->select('id');
    return $query->where('type_id',$type_id);
}
function priceFilteredQuery($priceFilters , $query){
    global $db;
      $q = '';
    for($i = 0 ; $i < sizeof($priceFilters); $i++){

      if($i>0)
          $q .= ' OR ' ;
      if($priceFilters[$i] == 'below-100'){
          $q .= ' product_price < 100 ';
      }
       else if($priceFilters[$i] == '100-200'){
          $q .= ' product_price >= 100 AND product_price <= 200 ';
       }
       else if($priceFilters[$i] == '200-above'){
          $q .= ' product_price > 200 ';
       }
    }
    return $query->where($q);
 }

function brandFilteredQuery($brandFilters , $query){
    global $db;
    $q = '';
    for($i = 0 ; $i < sizeof($brandFilters); $i++){

        if($i>0)
            $q .= ' OR ' ;
        $q .= ' product_brand = "'. $brandFilters[$i]. '" ' ;
    }
  return $query->where($q);
}
function finishTypeFilteredQuery($finishTypeFilters , $query){
    global $db;
    $q = '';
    for($i = 0 ; $i < sizeof($finishTypeFilters); $i++){
         if($i>0)
            $q .= ' OR ' ;

          $q .= ' product_finish_type = "'. $finishTypeFilters[$i]. '" ' ;
    }
    return $query->where($q);
}

  function colorFilteredQuery($colorFilters , $query){
    global $db;
    $p = '';
    for($i = 0 ; $i < sizeof($colorFilters); $i++){
        if($i>0)
            $p .= ' OR ' ;

        $c_id = $db->colors->where('color_name = "' . $colorFilters[$i].'" ' );
        $p .= ' colors_id = '. $c_id->fetch() . ' ' ;
    }
    $q = $db->product_colors()->where($p)->select('products_id');

    return $query->where('id', $q);
  }

  function applicationFilteredQuery($applicationFilters , $query){
    global $db;
    $q = '';
    for($i = 0 ; $i < sizeof($applicationFilters); $i++){
         if($i>0)
            $q .= ' OR ' ;

          $q .= ' product_application = "'. $applicationFilters[$i]. '" ' ;
    }
    return $query->where($q);
}

// For finding all products of type say tiles or marbles Removed on 14 june 2015.
function findAllProducts($query,$usage_location){
    $data = array();
    global $resultPerPage;
    global $priceFilters,$colorFilters,$brandFilters;
    $count1 = 0;    // for counting color filter products
    $count2= 0;     //  for counting price filter products
    $count3= 0;    // for counting brand filter products
    foreach($query as $p)
    {

        $usages_area =array();
        $designs = array();
        $subtypes = array();
        $surface_types = array();
        $colors = array();
        $features = array();

        foreach ($p->product_colors() as $product_colors) {
            $colors[] = $product_colors->colors['color_name'];
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

        foreach ($p->product_features() as $product_features) {

            $features[] = $product_features->features['feature_name'];
        }
        global $db;
        $product_category = '';
        foreach ($db->types() as $product_type) {
            if($product_type['id'] == $p['type_id'])
              $product_category = $product_type['type_name'];
        }

        $data[] =  array(
                         'product_id' => $p['id'],
                        'product_brand' =>   $p['product_brand'],
                        'product_name' => $p['product_name'],
                        'product_category' => $product_category ,
                        'product_type_id' => $p['type_id'],
                        'product_desc' =>  $p['product_desc'],
                        'product_img' =>  $p['product_img'],
                        'product_url' =>  $p['product_url'],
                        'product_material' =>  $p['product_material'],
                        'product_size' =>  $p['product_size'],
                        'product_application' =>  $p['product_application'],
                        'product_look' =>  $p['product_look'],

                        'product_finish_type'=> $p['product_finish_type'],

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

  return $data;
}

$app->run();
