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

// FOr finding all products of type say tiles or marbles

$app->get('/shiningfloor/products(/:type)', function($type=null) use ($app, $db){

        $data = array();

        $type_id = $db->types()->where('type_name',$type)->select('id');
        $query = $db->products->where('type_id',$type_id);
        if(isset($_GET['sortkey']) and isset($_GET['sortorder'])){
            $query = $query->order($_GET['sortkey'].' '.$_GET['sortorder']);
        }
        if(isset($_GET['totalResults']) and isset($_GET['pageNo'])){
              // echo json_encode( ((( int )$_GET['pageNo'] -1)*( int )$_GET['totalResults']));
            $query = $query->limit($_GET['totalResults'],((( int )$_GET['pageNo'] -1)*( int )$_GET['totalResults']))  ;  
        }
        foreach($query as $p)
        {
            
             $data[] = findAllProducts($p);

        }

        $app->response()->header('content-type','application/json');
        echo json_encode(array('product_data'=>$data));    
        // echo json_encode($_GET['sortkey']);

    });

// For finding all products of a given supplier

$app->get('/shiningfloor/products/suppliers(/:supplierId)', function($supplierId=null) use ($app, $db){

        $data = array();
        if($supplierId!=null){
        foreach($db->products->where('supplierID',$supplierId) as $p)
        {
            $data[] = findAllProducts($p);
        }

        $app->response()->header('content-type','application/json');
        echo json_encode(array('supplier_products'=>$data));    
    }
});

function findAllProducts($p){
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
            return array(
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
                            'product_supllierID' => $p['supplierID'],
                            'product_isDiscountAvailable' => $p['isDiscountAvailable'],
                            'product_isProductAvailable' => $p['isProductAvailable']                              
                        );
            
        
}
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