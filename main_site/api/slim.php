<?php

require_once 'NotORM.php';

$pdo = new PDO('mysql:dbname=shiningfloor;host=localhost', 'root', 'sahil');

$db = new NotORM($pdo);

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

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

                $usages_area[] = array('usage_name' =>  $product_usages->usages['usage_name']); 
            }

            foreach ($p->product_designs() as $product_designs) {

                $designs[] = array('design_name' => $product_designs->designs['design_name']); 
            }
            foreach ($p->product_subtypes() as $product_subtypes) {

                $subtypes[] = array('subtype_name' => $product_subtypes->subtypes['subtype_name']); 
            }
            
            foreach ($p->product_surface_types() as $product_surface_types) {

                $surface_types[] =array('surface_type_name' => $product_surface_types->surface_types['surface_type_name']); 
            }
            foreach ($p->product_colors() as $product_colors) {

                $colors[] =array('color_name' => $product_colors->colors['color_name']); 
            }
            foreach ($p->product_features() as $product_features) {

                $features[] = array('feature_name' => $product_features->features['feature_name']); 
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
        
        if($p = $db->products()->where('product_id', $id)->fetch()){
            $data = array(
                            'product_brand' =>   $p['product_brand'],
                            'product_name' => $p['product_name'],
                            'product_desc' =>  $p['product_desc'],
                            'product_img' =>  $p['product_img']
                        );
        }
    }
    
    $app->response()->header('content-type','application/json');
    
    echo json_encode(array('products'=>$data));    
});


//Post method to insert data into database

$app->post('/person', function() use ($app, $db){
    
    $array = (array) json_decode($app->request()->getBody());

     $data = $db->person()->insert($array);
     
     $app->response()->header('Content-Type', 'application/json');
 
     echo json_encode($data['id']);
     
});



//Put method to update the data into database

$app->put('/person/:id', function ($id) use ($app, $db) {
    
    $person = $db->person()->where('id', $id);
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
$app->delete('/person/:id', function ($id) use ($app, $db) {
    /*
     * Fetching Person for deleting
     */
    $person = $db->person()->where('id', $id);
 
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