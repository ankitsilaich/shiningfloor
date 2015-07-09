<?php

require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=student;host=localhost', 'eagle_eye', 'eaglesword');

$db = new NotORM($pdo);

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();
session_start();

$app = new \Slim\Slim();

$authenticate = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['user'])) {
           
           
            $app->redirect('/login');
        }
    };
};

//Get Method to get the data from database

$app->get('/student(/:id)', $authenticate($app), function($id=null) use ($app, $db){
    
    if($id == null){
        $data = array();
         foreach($db->student() as $p){
            $data[] = array(
                           'student_id' =>   $p['student_id'],
                            'name' => $p['name'],
                             'birthday' => $p['birthday'],
                              'sex' => $p['sex'],
                             'religion' => $p['religion'],
                             'blood_group' => $p['blood_group'],
                             'address' => $p['address'],
                              'phone' => $p['phone'],
                             'email' => $p['email'],
                               'father_name' => $p['father_name'],
                             'mother_name' => $p['mother_name'],
                              'rollno' => $p['roll'],
                             'transport_id' => $p['transport_id']
                        );
        }
        
    } else {
        
        $data = null;
        
        if($p = $db->student()->where('student_id', $id)->fetch()){
            $data = array(
                         'student_id' =>   $p['student_id'],
                            'name' => $p['name'],
                             'birthday' => $p['birthday'],
                              'sex' => $p['sex'],
                             'religion' => $p['religion'],
                             'blood_group' => $p['blood_group'],
                             'address' => $p['address'],
                              'phone' => $p['phone'],
                             'email' => $p['email'],
                               'father_name' => $p['father_name'],
                             'mother_name' => $p['mother_name'],
                              'rollno' => $p['roll'],
                             'transport_id' => $p['transport_id']
                        );
        }
    }
    
    $app->response()->header('content-type','application/json');
    
    echo json_encode($data);
    
});

$app->get('/search(/:name)', function($name=null) use ($app, $db){
    
    if($name == null){
     $data = array();   
        
    } else {
        
        $data = array();
        foreach($db->student()->where('name LIKE?','%'.$name.'%') as $p){
         
            $data[] = array(
                            'student_id' =>   $p['student_id'],
                            'name' => $p['name'],
                             'birthday' => $p['birthday'],
                              'sex' => $p['sex'],
                             'religion' => $p['religion'],
                             'blood_group' => $p['blood_group'],
                             'address' => $p['address'],
                              'phone' => $p['phone'],
                             'email' => $p['email'],
                               'father_name' => $p['father_name'],
                             'mother_name' => $p['mother_name'],
                              'rollno' => $p['roll'],
                             'transport_id' => $p['transport_id']
                        );
        }
    }
    
    $app->response()->header('content-type','application/json');
    
    echo json_encode($data);
    
});
$app->get('/sortstudents/:sortby', function($sortby=null) use ($app, $db){
    
    
        
        $data = array();
        foreach($db->student()->order($sortby." desc") as $p){
         
            $data[] = array(
                            'student_id' =>   $p['student_id'],
                            'name' => $p['name'],
                             'birthday' => $p['birthday'],
                              'sex' => $p['sex'],
                             'religion' => $p['religion'],
                             'blood_group' => $p['blood_group'],
                             'address' => $p['address'],
                              'phone' => $p['phone'],
                             'email' => $p['email'],
                               'father_name' => $p['father_name'],
                             'mother_name' => $p['mother_name'],
                              'rollno' => $p['roll'],
                             'transport_id' => $p['transport_id']
                        );
        
    }
    
    $app->response()->header('content-type','application/json');
    
    echo json_encode($data);
    
});
$app->get('/language(/:name)', function($name=null) use ($app, $db){
    
    if($name == null){
     $data = array();   
        
    } else {
        
        $data = array();
        foreach($db->language() as $p){
         
            
                          $data[$p['phrase']] =   $p[$name];
                           
                        
        }
    }
    
    $app->response()->header('content-type','application/json');
    
    echo json_encode($data);
    
});


//Post method to insert data into database

$app->post('/student', function() use ($app, $db){
    
    $array = (array) json_decode($app->request()->getBody());

     $data = $db->student()->insert($array);
     
     $app->response()->header('Content-Type', 'application/json');
 
     echo json_encode($data['id']);
     
});



//Put method to update the data into database

$app->put('/student/:id', function ($id) use ($app, $db) {
    
    $person = $db->student()->where('student_id', $id);
    $data = null;
 
    if ($person->fetch()) {
        /*
         * We are reading JSON object received in HTTP request body and converting it to array
         */
        $post = (array) json_decode($app->request()->getBody());
 
        /*
         * Updating Person
         */
        $data = $person->update($post);
    }
 
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

//Delete method to delete the data into database
$app->delete('/student/:id', function ($id) use ($app, $db) {
    /*
     * Fetching Person for deleting
     */
    $person = $db->student()->where('student_id', $id);
 
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

$app->post("/auth/process", function () use ($app, $db) {
    $email = $app->request()->post('email');
    $password = $app->request()->post('password');
    $person = $db->admin()->where('email', $email)->where('password',$password);
    $count = count($person);
         
    if($count == 1){
     
     $_SESSION['user'] = $email;
     $data = $email;

    }else{
    $data = "login failure";
      
    
    }
   
   $app->response()->header('Content-Type', 'application/json');
   echo json_encode($data);
   
   
    
});
$app->get('/auth/process', function () use ($app) {
	if ( isset($_SESSION['user']) ) {
		$data = $_SESSION['user'];
	} else {
		$data = false;
	}
	
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($data);
});

$app->get("/auth/logout", function () use ($app) {
   unset($_SESSION['user']);
   
   
});

$app->run();