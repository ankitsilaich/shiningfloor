<?php
//  global $db;
function findAllFilters(){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
  $get = filter_input_array(INPUT_GET);
  if(array_key_exists('pageNo', $get)){
      $pageNo = ( int )$get['pageNo'] ;
    }
  if(array_key_exists('color', $get)){
      $colorFilters =  explode(',', $get['color']);
  }
  if(array_key_exists('price_range', $get)){
      $priceFilters = explode(',', $get['price_range']);
  }
  if(array_key_exists('brand_name', $get)){
      $brandFilters = explode(',', $get['brand_name']);
  }
  if(array_key_exists('finish_types', $get)){
      $finishTypeFilters =  explode(',', $get['finish_types']);
  }

  if(array_key_exists('materials', $get)){
      $materialFilters =  explode(',', $get['materials']);
  }
  if(array_key_exists('looks', $get)){
      $lookFilters =  explode(',', $get['looks']);
  }
  if(array_key_exists('applications', $get)){
      $applicationFilters =  explode(',', $get['applications']);

  }
}
/*  Functions starts here   */
function categoryFilteredQuery($category, $query){
  global $db;
    $type_id = $db->types()->where('type_name', $category)->select('id');
    return $query->where('type_id',$type_id);
}
function priceFilteredQuery($priceFilters , $query){

      $priceQuery = '';
    for($i = 0 ; $i < sizeof($priceFilters); $i++){
      if($i>0)
          $priceQuery .= ' OR ' ;
      if($priceFilters[$i] == 'below-100'){
          $priceQuery .= ' product_price < 100 ';
      }
       else if($priceFilters[$i] == '100-200'){
          $priceQuery .= ' product_price >= 100 AND product_price <= 200 ';
       }
       else if($priceFilters[$i] == '200-above'){
          $priceQuery .= ' product_price > 200 ';
       }
    }
    return $query->where($priceQuery);
 }
function brandFilteredQuery($brandFilters , $query){

    $brandQuery = '';
    for($i = 0 ; $i < sizeof($brandFilters); $i++){
        if($i>0)
            $brandQuery .= ' OR ' ;
        $brandQuery .= ' product_brand = "'. $brandFilters[$i]. '" ' ;
    }
  return $query->where($brandQuery);
}
function finishTypeFilteredQuery($finishTypeFilters , $query){

    $finishQuery = '';
    for($i = 0 ; $i < sizeof($finishTypeFilters); $i++){
         if($i>0)
            $finishQuery .= ' OR ' ;
          $finishQuery .= ' product_finish_type = "'. $finishTypeFilters[$i]. '" ' ;
    }
    return $query->where($finishQuery);
}
function lookFilteredQuery($lookFilters , $query){

    $lookQuery = '';
    for($i = 0 ; $i < sizeof($lookFilters); $i++){
         if($i>0)
            $lookQuery .= ' OR ' ;
          $lookQuery .= ' product_look = "'. $lookFilters[$i]. '" ' ;
    }
    return $query->where($lookQuery);
}
function materialFilteredQuery($materialFilters , $query){

    $materialQuery = '';
    for($i = 0 ; $i < sizeof($materialFilters); $i++){
         if($i>0)
            $materialQuery .= ' OR ' ;
          $materialQuery .= ' product_material = "'. $materialFilters[$i]. '" ' ;
    }
    return $query->where($materialQuery);
}
  function colorFilteredQuery($colorFilters , $query){

    $colorQuery = '';
    for($i = 0 ; $i < sizeof($colorFilters); $i++){
        if($i>0)
            $colorQuery .= ' OR ' ;
        $colorQuery .= $db->product_colors->where(' color_name = "' . $colorFilters[$i].'" ')->select('products_id');
        // ->select('products_id')->fetch()['products_id']
        //$p .= ' colors_id = '. $c_id->fetch() . ' ' ;
    }
//     print_r($p->fetch());
//    $q = $db->product_colors()->where($p)->select('products_id');
    return $query->where('id', $colorQuery);
  }
  function applicationFilteredQuery($applicationFilters , $query){
  
    $applicationQuery = '';
    for($i = 0 ; $i < sizeof($applicationFilters); $i++){
          echo $applicationFilters[$i];
         if($i>0)
            $applicationQuery .= ' OR ' ;
          // $q .= ' product_applications = "'. $applicationFilters[$i]. '" ' ;
          $applicationQuery .= $db->product_applications->where('application_name', $applicationFilters[$i])->select('products_id');

    }
    return $query->where('id', $applicationQuery);
}
function setFinalFilterQuery($query){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters;
  $get = filter_input_array(INPUT_GET);
  if(array_key_exists('price_range', $get))
      $query = priceFilteredQuery($priceFilters,$query);
  if(array_key_exists('brand_name', $get))
      $query = brandFilteredQuery($brandFilters,$query);
  if(array_key_exists('finish_types', $get))
      $query = finishTypeFilteredQuery($finishTypeFilters,$query);
  if(array_key_exists('materials', $get))
      $query = materialFilteredQuery($materialFilters,$query);
  if(array_key_exists('looks', $get))
      $query = lookFilteredQuery($lookFilters,$query);
  if(array_key_exists('applications', $get))
      $query = applicationFilteredQuery($applicationFilters,$query);
  if(array_key_exists('color', $get))
      $query = colorFilteredQuery($colorFilters,$query);
  return $query;
}
function fetchProductData($p){
  $data = array();
  global $db;
  $product_category = '';
  foreach ($db->types() as $product_type) {
      if($product_type['id'] == $p['type_id'])
        $product_category = $product_type['type_name'];
  }

  $mainTableData =  array(
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
                'product_look' =>  $p['product_look'],
                'product_finish_type'=> $p['product_finish_type'],
                'product_features'=> $p['product_desc'],
                'product_rating' => $p['product_rating'],
                'product_isDiscountAvailable' => $p['isDiscountAvailable'],
                'product_isProductAvailable' => $p['isProductAvailable']
    );
  if(filter_input(INPUT_GET, 'details') == 'true')
    return array_merge($mainTableData ,fetchOtherProductData($p));
  else
    return $mainTableData;
}
          // if(filter_input(INPUT_GET, 'details') == 'false')
function fetchOtherProductData($p){
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

    return  array(
                'product_applications' =>  $applications,
                'product_usages'=> $usages,
                'product_colors'=> $colors,
                'product_img' =>  $images,
                'product_concepts' =>  $concepts,
            );
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
      if(filter_input(INPUT_GET, 'details')){
          if(filter_input(INPUT_GET, 'details') == 'false')
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
                              'product_items_per_box' =>$p['product_items_per_box'],
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
