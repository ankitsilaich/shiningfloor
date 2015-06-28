<?php
function findAllFilters(){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$applicationFilters;
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

function setFinalFilterQuery($query){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$applicationFilters;
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
?>
