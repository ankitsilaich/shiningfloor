<?php
function findAllFilters(){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
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
  if(isset($_GET['materials'])){
      $materialFilters =  explode(',', $_GET['materials']);
  }
  if(isset($_GET['looks'])){
      $lookFilters =  explode(',', $_GET['looks']);
  }
  if(isset($_GET['applications'])){
      $applicationFilters =  explode(',', $_GET['applications']);
  }
}
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
function lookFilteredQuery($lookFilters , $query){
    global $db;
    $q = '';
    for($i = 0 ; $i < sizeof($lookFilters); $i++){
         if($i>0)
            $q .= ' OR ' ;
          $q .= ' product_look = "'. $lookFilters[$i]. '" ' ;
    }
    return $query->where($q);
}
function materialFilteredQuery($materialFilters , $query){
    global $db;
    $q = '';
    for($i = 0 ; $i < sizeof($materialFilters); $i++){
         if($i>0)
            $q .= ' OR ' ;
          $q .= ' product_material = "'. $materialFilters[$i]. '" ' ;
    }
    return $query->where($q);
}
  function colorFilteredQuery($colorFilters , $query){
    global $db;
    $p = '';
    for($i = 0 ; $i < sizeof($colorFilters); $i++){
        if($i>0)
            $p .= ' OR ' ;
        $p .= $db->product_colors->where(' color_name = "' . $colorFilters[$i].'" ')->select('products_id');
        // ->select('products_id')->fetch()['products_id']
        //$p .= ' colors_id = '. $c_id->fetch() . ' ' ;
    }
//     print_r($p->fetch());
//    $q = $db->product_colors()->where($p)->select('products_id');
    return $query->where('id', $p);
  }
  function applicationFilteredQuery($applicationFilters , $query){
    global $db;
    $q = '';
    for($i = 0 ; $i < sizeof($applicationFilters); $i++){
          echo $applicationFilters[$i];
         if($i>0)
            $q .= ' OR ' ;
          // $q .= ' product_applications = "'. $applicationFilters[$i]. '" ' ;
          $q .= $db->product_applications->where('application_name', $applicationFilters[$i])->select('products_id');
        
    }
    return $query->where('id', $q);
}
function setFinalFilterQuery($query){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
  if(isset($_GET['price_range']))
      $query = priceFilteredQuery($priceFilters,$query);
  if(isset($_GET['brand_name']))
      $query = brandFilteredQuery($brandFilters,$query);
  if(isset($_GET['finish_types']))
      $query = finishTypeFilteredQuery($finishTypeFilters,$query);
  if(isset($_GET['materials']))
      $query = materialFilteredQuery($materialFilters,$query);  
  if(isset($_GET['looks']))
      $query = lookFilteredQuery($lookFilters,$query);  
  if(isset($_GET['applications']))
      $query = applicationFilteredQuery($applicationFilters,$query);
  if(isset($_GET['color']))
      $query = colorFilteredQuery($colorFilters,$query);
  return $query;
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
      if(isset($_GET['details'])){
          if($_GET['details'] == 'false')
          {
              $img = $p->product_images()->fetch()['image_name'];
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
                              'product_width' =>  $p['product_width'],
                              'product_height' =>  $p['product_height'],
                              'product_thickness' =>  $p['product_thickness'],
                              'product_w_unit' =>  $p['product_width_unit'],
                              'product_h_unit' =>  $p['product_height_unit'],
                              'product_t_unit' =>  $p['product_thickness_unit'],
                              'product_img' =>  $img                                                    
                    );
          }
       }
       else{   
            $usages =array();
            $applications = array();
            $images = array();         
            $colors = array(); 
            $concepts = array();
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
            foreach ($p->concept_images() as $product_images) {
                $concepts[] = $product_images['concept_name'];
            }
        // foreach ($p->product_features() as $product_features) {
        //     $features[] = $product_features->features['feature_name'];
        // }
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
                        'product_origin_country' => $p['product_origin_country'],
                        'product_degree_of_variation' => $p['product_degree_of_variation'],
                        'product_material' =>  $p['product_material'],
                        'product_width' =>  $p['product_width'],
                        'product_height' =>  $p['product_height'],
                        'product_thickness' =>  $p['product_thickness'],
                        'product_w_unit' =>  $p['product_width_unit'],
                        'product_h_unit' =>  $p['product_height_unit'],
                        'product_t_unit' =>  $p['product_thickness_unit'],
                        'product_items_per_box' => $p['product_items_per_box'],
                        'product_shape' =>  $p['product_shape'],
                        'product_applications' =>  $applications,
                        'product_look' =>  $p['product_look'],
                        'product_finish_type'=> $p['product_finish_type'],
                        'product_usages'=> $usages,
                        'product_colors'=> $colors, 
                        'product_img' =>  $images, 
                        'product_concepts' =>  $concepts,                        
                        'product_features'=> $p['product_desc'],
                        'product_rating' => $p['product_rating'],
                        'product_isDiscountAvailable' => $p['isDiscountAvailable'],
                        'product_isProductAvailable' => $p['isProductAvailable']
                    );
      }
    }
  return $data;
}

?>