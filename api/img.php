<?php
include 'functions.php';
require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=shiningfloor1;host=localhost', 'root', '');
// $pdo = new PDO('mysql:dbname=shiningfloor;host=localhost', 'shiningfloor', 'Shiningfloor');

$db = new NotORM($pdo);
global $db;
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$app->get('/shiningfloor/info' ,function() use ($app, $db)
{
    foreach ($db->products()->where('id >10423') as $p ) {
        $a = array(
          'products_id' =>  $p['id'] ,
          'image_name' =>  $p['product_img']  
        );
print_r($a) ;
        $db->product_images->insert($a);
    }    
    $app->response()->header('content-type', 'application/json');
     
});

$app->run();