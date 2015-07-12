<?php

require_once 'NotORM.php';

$connection = new PDO('mysql:dbname=students;host=localhost', 'root', '');

$db = new NotORM($connection);

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
session_start();

$authenticate = function($app)
{
    return function() use ($app)
    {
        if (!isset($_SESSION['user'])) {
            
            
            $app->redirect('/login');
        }
    };
};
$app->post("/auth/process/admin", function() use ($app, $db)
{
    $array    = (array) json_decode($app->request()->getBody());
    $email    = $array['email'];
    $password = $array['password'];
    $person   = $db->admin()->where('email', $email)->where('password', $password);
    $count    = count($person);
    
    if ($count == 1) {
        
        $_SESSION['user'] = $email;
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
$app->get('/auth/process/admin', function() use ($app)
{
    
    if (isset($_SESSION['user'])) {
        $data = $_SESSION['user'];
    } else {
        $data = false;
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

$app->get("/auth/logout/admin", function() use ($app)
{
    unset($_SESSION['user']);
    
    
});

//Get Method to get the data from database
function days($givendate)
{
    $now       = time(); // or your date as well
    $your_date = strtotime($givendate);
    $datediff  = $your_date - $now;
    return floor($datediff / (60 * 60 * 24));
    
}
;

$app->get('/products(/:id)', function($id = null) use ($app, $db)
{
    $per_page =30;//define how many games for a page
    $page=$_GET['page'];

    if ($id == null) {
         $query = $db->products();
         if(isset($_GET['name']))
        {
            $query = $query->where("name LIKE ?", "%".$_GET['name']."%");
        }   
        if(isset($_GET['application']))
        {
            $query = $query->where("applicationarea", $_GET['application']);
        }   
        if(isset($_GET['finish']))
        {
            $query = $query->where("finish", $_GET['finish']);
        }     
        $data  = array();
       
        
        $count = count($query);
        $start    = ($page - 1) * $per_page;
        $query = $query->limit($per_page,$start) ;
        foreach ($query as $products) {
            
           
            
            $data[] = array(
                'product_id' => $products['id'],
                'product_name' => $products['name'],
                'product_category' => $products['category'],
                'product_brand' => $products['brand'],
                'product_applicationarea' => $products['applicationarea'],
                'product_image' => $products['image'],
                'product_finish' => $products['finish'],
                'product_size' => $products['size'],
                'product_url' => $products['productpageurl']
                // 'product_dthbill' => $products['dthbill'],
                // 'product_dthbilldate' => $products['dthbilldate'],
                // 'product_dthbilldays' => days($products['dthbilldate']),
                // 'product_powerbill' => $products['powerbill'],
                // 'product_powerbilldate' => $products['powerbilldate'],
                // 'product_powerbilldays' => days($products['powerbilldate']),
                // 'product_wifibill' => $products['wifibill'],
                // 'product_wifibilldate' => $products['wifibilldate'],
                // 'product_wifibilldays' => days($products['wifibilldate']),
                // 'product_owner' => array(
                //     'id' => $products->owners['id'],
                //     'name' => $products->owners['owner_name'],
                //     'address' => $products->owners['owner_address'],
                //     'phone' => $products->owners['owner_phone'],
                //     'email' => $products->owners['owner_email']
                    
                // ),
                // 'tenants' => $products_tenants,
                // 'deposits' => $products_deposits,
                
                
            );
        }
    } else {
        
        $data = null;
        
        if ($products = $db->products()->where('id', $id)->fetch()) {
          
            // $products_tenants = array();
            // $products_deposits = array();
            // foreach ($products->products_tenants() as $p) {
                
            //     $products_tenants[] = array(
            //         'id' => $p->tenants['id'],
            //         'name' => $p->tenants["name"],
            //         'phone' => $p->tenants["phone"]
            //     );
            // }
            // foreach ($products->products_deposits() as $p) {
                
            //     $products_deposits[] = array(
            //         'id' => $p->deposits['id'],
            //         'rent' => $p->deposits["rent"],
            //         'date' => $p->deposits["date"],
            //          'status' => $p->deposits["status"]
            //     );
            // }

            $data = array(
               'product_id' => $products['id'],
                'product_name' => $products['name'],
                'product_category' => $products['category'],
                'product_brand' => $products['brand'],
                'product_applicationarea' => $products['applicationarea'],
                'product_image' => $products['image'],
                'product_finish' => $products['finish'],
                'product_size' => $products['size'],
                'product_url' => $products['productpageurl']
               
            );
        }
    }
    $products = array(
        'aaData' => array('data'=>$data,'totalresults'=> $count)
    );
    $app->response()->header('content-type', 'application/json');
    
    echo json_encode($products);
});
$app->get('/selectedproducts(/:id)', function($id = null) use ($app, $db)
{
    $per_page =30;//define how many games for a page
    $page=$_GET['page'];

    
        $data  = array();
        $query = $db->sellers_products()->where('sellers_id',$id);
        
        $count = count($query);
        $start    = ($page - 1) * $per_page;
        $query = $query->limit($per_page,$start) ;
        foreach ($query as $products) {

             $data[] = array(

           'product_id' => $products->products['id'],
                'product_name' => $products->products['name'],
                'product_category' => $products->products['category'],
                'product_brand' => $products->products['brand'],
                'product_applicationarea' => $products->products['applicationarea'],
                'product_image' => $products->products['image'],
                'product_finish' => $products->products['finish'],
                'product_size' => $products->products['size'],
                'product_url' => $products->products['productpageurl'],
                'product_price' => $products['price'],
                'product_comments' => $products['comments']
                // 'product_dthbill' => $products['dthbill'],
                // 'product_dthbilldate' => $products['dthbilldate'],
                // 'product_dthbilldays' => days($products['dthbilldate']),
                // 'product_powerbill' => $products['powerbill'],
                // 'product_powerbilldate' => $products['powerbilldate'],
                // 'product_powerbilldays' => days($products['powerbilldate']),
                // 'product_wifibill' => $products['wifibill'],
                // 'product_wifibilldate' => $products['wifibilldate'],
                // 'product_wifibilldays' => days($products['wifibilldate']),
                // 'product_owner' => array(
                //     'id' => $products->owners['id'],
                //     'name' => $products->owners['owner_name'],
                //     'address' => $products->owners['owner_address'],
                //     'phone' => $products->owners['owner_phone'],
                //     'email' => $products->owners['owner_email']
                    
                // ),
                // 'tenants' => $products_tenants,
                // 'deposits' => $products_deposits,
                
                
            );
        }
    
    $products = array(
        'aaData' => array('data'=>$data,'totalresults'=> $count)
    );
    $app->response()->header('content-type', 'application/json');
    
    echo json_encode($products);
});
$app->get('/chooseproducts(/:id)', function($id = null) use ($app, $db)
{ global $connection;
    $per_page =30;//define how many games for a page
    $page=$_GET['page'];
 $start    = ($page - 1) * $per_page;

        $data  = array();
         //$query = $db->products();
        $query = $db->products()->where("NOT id", $db->sellers_products()->where('sellers_id',$id )->select('products_id'));
         if(isset($_GET['name']))
        {
            $query = $query->where("name LIKE ?", "%".$_GET['name']."%");
        }   
        if(isset($_GET['application']))
        {
            $query = $query->where("applicationarea", $_GET['application']);
        }   
        if(isset($_GET['finish']))
        {
            $query = $query->where("finish", $_GET['finish']);
        }     
       
        $count = count($query);
        
       
        $query = $query->limit($per_page,$start) ;
        foreach ($query as $products) {
            
            // $houses_tenants = array();
            // $houses_deposits = array();
         
            // foreach ($houses->houses_tenants() as $p) {
            //     $count++;
            //     $houses_tenants[] = array(
            //         'id' => $p->tenants['id'],
            //         'name' => $p->tenants["name"],
            //         'phone' => $p->tenants["phone"]
            //     );
            // }
            //  foreach ($houses->houses_deposits() as $p) {
                
            //     $houses_deposits[] = array(
            //         'id' => $p->deposits['id'],
            //         'rent' => $p->deposits["rent"],
            //         'date' => $p->deposits["date"],
            //          'status' => $p->deposits["status"]
            //     );
            // }
             $data[] = array(

                'product_id' => $products['id'],
                'product_name' => $products['name'],
                'product_category' => $products['category'],
                'product_brand' => $products['brand'],
                'product_applicationarea' => $products['applicationarea'],
                'product_image' => $products['image'],
                'product_finish' => $products['finish'],
                'product_size' => $products['size'],
                'product_url' => $products['productpageurl'],
                
                // 'product_dthbill' => $products['dthbill'],
                // 'product_dthbilldate' => $products['dthbilldate'],
                // 'product_dthbilldays' => days($products['dthbilldate']),
                // 'product_powerbill' => $products['powerbill'],
                // 'product_powerbilldate' => $products['powerbilldate'],
                // 'product_powerbilldays' => days($products['powerbilldate']),
                // 'product_wifibill' => $products['wifibill'],
                // 'product_wifibilldate' => $products['wifibilldate'],
                // 'product_wifibilldays' => days($products['wifibilldate']),
                // 'product_owner' => array(
                //     'id' => $products->owners['id'],
                //     'name' => $products->owners['owner_name'],
                //     'address' => $products->owners['owner_address'],
                //     'phone' => $products->owners['owner_phone'],
                //     'email' => $products->owners['owner_email']
                    
                // ),
                // 'tenants' => $products_tenants,
                // 'deposits' => $products_deposits,
                
                
            );
        }
    
    $products = array(
        'aaData' => array('data'=>$data,'totalresults'=> $count)
    );
    $app->response()->header('content-type', 'application/json');
    
    echo json_encode($products);
});



$app->get('/sellers(/:id)', function($id = null) use ($app, $db)
{
     $tenants_deposits = array();
    if ($id == null) {
        $data  = array();
        $count = 0;
       
         
        foreach ($db->sellers() as $tenants) {
           
             $allp = $db->sellers_products()->where('sellers_id',$tenants['id']);
             $countall = count($allp);
            
           // $days   = days($tenants['entry_date']);
            //  $dthdays = days($houses['house_rent_due_date']);
            //  foreach ($houses->sellers_tenants() as $p) {
            //      $count++;
            //         $houses_tenants[] = array('name'=>$p->tenants["name"],
            //          'phone'=>$p->tenants["phone"]);
            // }
            $data[] = array(
                'id' => $tenants['id'],
                'address' => $tenants['address'],
                'name' => $tenants['name'],
                'phone' => $tenants['phone'],
                'storename' => $tenants['storename'],
                'comments' => $tenants['comments'],
                 'noofproducts' => $countall
                // 'totaldeposit' => $tenants['totaldeposit'],
                // 'depositleft' => $tenants['depositleft'],
                // 'entry_date' => $tenants['entry_date'],
                // 'is_verified' => $tenants['isVerified'],
                // 'deposits' => $tenants_deposits
                
                // 'house_totaldeposit' => $houses['house_total_deposit'],
                // 'house_totaldepositleft' => $houses['house_deposit_left'],
                // 'house_dthbill' => $houses['house_dth_bill_amount'],
                // 'house_dthbilldays' => days($houses['house_dth_bill_date']),
                // 'house_owner' => array('name' =>   $houses->owners['owner_name'],
                //                             'address' => $houses->owners['owner_address']
                //                              ),
                // 'tenants' => $houses_tenants,
                // 'days' => $days
                
            );
        }
    } else {
        
        $data = null;
        $houses_tenants=array();
       
        if ($tenants = $db->sellers()->where('id', $id)->fetch()) {
             $allp = $db->sellers_products()->where('sellers_id',$id);
             $countall = count($allp);
            // $days = days($tenants['entry_date']);
            // foreach ($tenants->tenants_deposits() as $p) {
                
            //     $tenants_deposits[] = array(
            //         'id' => $p->deposits['id'],
            //         'rent' => $p->deposits["rent"],
            //         'date' => $p->deposits["date"],
            //         'status' => $p->deposits["status"]
            //     );
            // }
            // foreach ($tenants->houses_tenants() as $p) {
                
            //     $houses_tenants[] = array(
            //         'id' => $p->houses['id'],
            //          'name' => $p->houses['name'],

                    
            //     );
            // }
             
             
           
            $data = array(
                'id' => $tenants['id'],
                'address' => $tenants['address'],
                'name' => $tenants['name'],
                'phone' => $tenants['phone'],
                'storename' => $tenants['storename'],
                'comments' => $tenants['comments'],
                'noofproducts' => $countall
                
            );
        }
    }
    $tenants = array(
        'aaData' => $data
    );
    $app->response()->header('content-type', 'application/json');
    
    echo json_encode($tenants);
});
$app->get('/owners(/:id)', function($id = null) use ($app, $db)
{
     
    if ($id == null) {
        $data  = array();
        
       
         
        foreach ($db->owners() as $t) {
           
            
            
            
           
            $data[] = array(
                'id' => $t['id'],
                'address' => $t['owner_address'],
                'name' => $t['owner_name'],
                'phone' => $t['owner_phone'],
                'email' => $t['owner_email']
              
                
               
                
            );
        }
    } else {
        
        $data = null;
        
        if ($t = $db->owners()->where('id', $id)->fetch()) {
            
            
            $data[] = array(
                'id' => $t['id'],
                'address' => $t['owner_address'],
                'name' => $t['owner_name'],
                'phone' => $t['owner_phone'],
                'email' => $t['owner_email']
              
                
               
                
            );
        }
    }
    $owners = array(
        'aaData' => $data
    );
    $app->response()->header('content-type', 'application/json');
    
    echo json_encode($owners);
});
$app->get('/tenants/search/:id', function($id = null) use ($app, $db)
{
    
    $data  = array();
    $count = 0;
    foreach ($db->tenants()->where("name LIKE ?", "%" . $id . "%") as $tenants) {
        
        
        $days   = days($tenants['entry_date']);
        //  $dthdays = days($houses['house_rent_due_date']);
        //  foreach ($houses->houses_tenants() as $p) {
        //      $count++;
        //         $houses_tenants[] = array('name'=>$p->tenants["name"],
        //          'phone'=>$p->tenants["phone"]);
        // }
        $data[] = array(
            'id' => $tenants['id'],
            'address' => $tenants['address'],
            'name' => $tenants['name'],
            'phone' => $tenants['phone'],
            'company' => $tenants['company'],
            'rent' => $tenants['rent'],
            'totaldeposit' => $tenants['totaldeposit'],
            'depositleft' => $tenants['depositleft'],
            'entry_date' => $tenants['entry_date'],
            'rent_date' => $days
            
            
        );
    }
    
    $tenants = array(
        'aaData' => $data
    );
    $app->response()->header('content-type', 'application/json');
    
    echo json_encode($tenants);
});
$app->get('/owners/search/:id', function($id = null) use ($app, $db)
{
    
    $data = array();
    
    foreach ($db->owners()->where("owner_name LIKE ?", "%" . $id . "%") as $owners) {
        
        
        $data[] = array(
            'id' => $owners['id'],
            'address' => $owners['owner_address'],
            'name' => $owners['owner_name'],
            'phone' => $owners['owner_phone'],
            'email' => $owners['owner_email']
            
            
            
        );
    }
    
    $tenants = array(
        'aaData' => $data
    );
    $app->response()->header('content-type', 'application/json');
    
    echo json_encode($tenants);
});

//Post method to insert data into database

$app->post('/houses', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->houses()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data['id']);
    
});
$app->post('/sellers_products', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->sellers_products()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data['id']);
    // echo json_encode($array);
    
});
$app->post('/houses_tenants', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->houses_tenants()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data);
    
});
$app->post('/houses_deposits', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->houses_deposits()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data);
    
});
$app->post('/tenants_deposits', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->tenants_deposits()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data);
    
});
$app->post('/owners', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->owners()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data['id']);
    
});
$app->post('/deposits', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->deposits()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data['id']);
    
});
$app->post('/sellers', function() use ($app, $db)
{
    
    $array = (array) json_decode($app->request()->getBody());
    
    
    $data = $db->sellers()->insert($array);
    
    $app->response()->header('Content-Type', 'application/json');
    
    echo json_encode($data['id']);
    //echo json_encode($array);
    
});


//Put method to update the data into database

$app->put('/houses/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->houses()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = $app->request()->put();
        $info = array(
            "house_rent_amount" => $post['house_rent_amount']
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $post,
        "message" => "data updated successfully"
    ));
});
$app->put('/updatehouses/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->houses()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
       $post = (array) json_decode($app->request()->getBody());
        $info = array(
             
                'name' => $post['name'],
                'address' => $post['address'],
               
                'entry_date' => $post['entrydate'],
                'rent' => $post['rent'],
                'totalrooms' => $post['totalrooms'],
                'totaldeposit' => $post['totaldeposit'],
                'depositleft' => $post['depositleft'],
                'dthbill' => $post['dthbill'],
                'dthbilldate' => $post['dthdate'],
               
                'powerbill' => $post['powerbill'],
                'powerbilldate' => $post['powerdate'],
                
               
                'wifibill' => $post['wifibill'],
                'wifibilldate' => $post['wifidate']
                
                
                
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $post,
        "message" => "data updated successfully"
    ));
  
});
$app->put('/updateowners/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->owners()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
       $post = (array) json_decode($app->request()->getBody());
        $info = array(
             
                'owner_name' => $post['name'],
                'owner_address' => $post['address'],
               
                'owner_phone' => $post['phone'],
                'owner_email' => $post['email']
               
                
                
                
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $post,
        "message" => "data updated successfully"
    ));
  
});
$app->put('/updatetenants/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->sellers()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
       $post = (array) json_decode($app->request()->getBody());
        $info = array(
             
                 
                'address' => $post['address'],
                'name' => $post['name'],
                'phone' => $post['phone'],
                'storename' => $post['storename'],
                'comments' => $post['comments']
                // 'rentfirst' => $post['rentfirst'],
                // 'totaldeposit' => $post['totaldeposit'],
                // 'depositleft' => $post['depositleft'],
                // 'entry_date' => $post['entry_date']
                
                
                
                
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $post,
        "message" => "data updated successfully"
    ));
  
});
$app->put('/tenants/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->tenants()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "entry_date" => $post['entry_date']
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($body)
    ;
});
$app->put('/tenantverify/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->tenants()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "isVerified" => 1
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($body)
    ;
});
$app->put('/houses/rent/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->houses()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "entry_date" => $post['entry_date']
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($post);
    ;
});
$app->put('/houses/deposits/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->deposits()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "status" => '1'
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($post);
    ;
});
$app->put('/tenants/deposits/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->deposits()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "status" => '1'
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($post);
    ;
});
$app->put('/houses/electricity/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->houses()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "powerbilldate" => $post['entry_date']
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($post);
    ;
});
$app->put('/houses/wifi/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->houses()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "wifibilldate" => $post['entry_date']
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($post);
    ;
});
$app->put('/houses/owner/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->houses()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "owners_id" => $post['owners_id']
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($post);
    ;
});
$app->put('/houses/dth/:id', function($id = null) use ($app, $db)
{
    
    $houses = $db->houses()->where('id', $id);
    
    $app->response()->header('Content-Type', 'application/json');
    $data = null;
    
    
    
    
    if ($houses->fetch()) {
        
        
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
        $info = array(
            "dthbilldate" => $post['entry_date']
        );
        
        /*
         * Updating Person
         */
        $data = $houses->update($info);
    }
    
    echo json_encode(array(
        "status" => (bool) $data,
        "message" => "data updated successfully"
    ));
    // echo json_encode($post);
    ;
});

//Delete method to delete the data into database
$app->delete('/tenants/:id', function($id) use ($app, $db)
{
    /*
     * Fetching Person for deleting
     */
    $person = $db->tenants()->where('id', $id);
     foreach ($db->tenants_deposits()->where('tenants_id', $id) as $p) {
      $deposit = $db->deposits()->where('id', $p['deposits_id']);
       if ($deposit->fetch()) {
        
        $datab = $deposit->delete();
    }
     $datas = $p->delete();
     }
    $data = null;
    if ($person->fetch()) {
        /*
         * Deleting Person
         */
        $data = $person->delete();
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
$app->delete('/securitytenant/:id', function($id) use ($app, $db)
{
    /*
     * Fetching Person for deleting
     */
    $person = $db->deposits()->where('id', $id);
     foreach ($db->tenants_deposits()->where('deposits_id', $id) as $p) {
     
     $datas = $p->delete();
     }
    $data = null;
    if ($person->fetch()) {
        /*
         * Deleting Person
         */
        $data = $person->delete();
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
$app->delete('/securityhouse/:id', function($id) use ($app, $db)
{
    /*
     * Fetching Person for deleting
     */
    $person = $db->deposits()->where('id', $id);
     foreach ($db->houses_deposits()->where('deposits_id', $id) as $p) {
     
     $datas = $p->delete();
     }
    $data = null;
    if ($person->fetch()) {
        /*
         * Deleting Person
         */
        $data = $person->delete();
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});
$app->delete('/deletehousetenant/:id', function($id) use ($app, $db)
{
    
    //$person = $db->deposits()->where('id', $id);
     foreach ($db->houses_tenants()->where('tenants_id', $id) as $p) {
     
     $datas = $p->delete();
     }
    //$data = null;
    //if ($person->fetch()) {
        /*
         * Deleting Person
         */
      //  $data = $person->delete();
    //}
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($datas);
});
$app->delete('/houses/:id', function($id) use ($app, $db)
{
    /*
     * Fetching Person for deleting
     */
    $person = $db->houses()->where('id', $id);
     foreach ($db->houses_deposits()->where('houses_id', $id) as $p) {
      $deposit = $db->deposits()->where('id', $p['deposits_id']);
       if ($deposit->fetch()) {
        
        $datab = $deposit->delete();
    }
     $datas = $p->delete();
     }
    $data = null;
    if ($person->fetch()) {
        /*
         * Deleting Person
         */
        $data = $person->delete();
    }
    
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});




$app->run();