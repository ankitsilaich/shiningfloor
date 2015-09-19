<?php
//  global $db;
$sortFilters = [];
function findAllFilters(){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters,$usageFilters,$shapeFilters,$sortFilters,$sizeFilters;
  $get = filter_input_array(INPUT_GET);
  if(array_key_exists('pageNo', $get)){
      $pageNo = ( int )$get['pageNo'] ;
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

  if(array_key_exists('sizes', $get)){
      $sizeFilters =  explode(',', $get['sizes']);
      // print_r($sizeFilters);
  }

  if(array_key_exists('shapes', $get)){
      $shapeFilters =  explode(',', $get['shapes']);
  }

  if(array_key_exists('applications', $get)){
      $applicationFilters =  explode(',', $get['applications']);
  }

  if(array_key_exists('colors', $get)){
      $colorFilters =  explode(',', $get['colors']);
  }

  if(array_key_exists('usages', $get)){
      $usageFilters =  explode(',', $get['usages']);
  }
}
/*  Functions starts here   */
function categoryFilteredQuery($category, $query){
  global $db;
    $type_id = $db->types()->where('type_name', $category)->select('id');
    return $query->where('type_id',$type_id);
}
// function priceFilteredQuery($priceFilters , $query){

//       $priceQuery = '';
//     for($i = 0 ; $i < sizeof($priceFilters); $i++){
//       if($i>0)
//           $priceQuery .= ' OR ' ;
//       if($priceFilters[$i] == 'below-100'){
//           $priceQuery .= ' product_price < 100 ';
//       }
//        else if($priceFilters[$i] == '100-200'){
//           $priceQuery .= ' product_price >= 100 AND product_price <= 200 ';
//        }
//        else if($priceFilters[$i] == '200-above'){
//           $priceQuery .= ' product_price > 200 ';
//        }
//     }
//     return $query->where($priceQuery);
//  }
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
function shapeFilteredQuery($shapeFilters , $query){
    $shapeQuery = '';
    for($i = 0 ; $i < sizeof($shapeFilters); $i++){
         if($i>0)
            $shapeQuery .= ' OR ' ;
          $shapeQuery .= ' product_shape = "'. $shapeFilters[$i]. '" ' ;
    }
    return $query->where($shapeQuery);
}
function materialFilteredQuery($materialFilters , $query){
    global $db;
    $materialQuery = '';
    for($i = 0 ; $i < sizeof($materialFilters); $i++){
         if($i>0)
            $materialQuery .= ' OR ' ;
          $materialQuery .= ' product_material = "'. $materialFilters[$i]. '" ' ;
    }
    return $query->where($materialQuery);
}

function sizeFilteredQuery($sizeFilters , $query){
    global $db;
    $sizeQuery = '';
    // echo $sizeFilters;
    for($i = 0 ; $i < sizeof($sizeFilters); $i++){
      // echo $sizeFilters[$i];
      $size =  explode('*', $sizeFilters[$i]);
      // print_r($size);
      // $size[0] =12 ;$size[1] = 12;
      $width = intval($size[0]);
      $height = intval($size[1]);
      
     if($i>0)
        $sizeQuery .= ' OR ' ;
      // $sizeQuery .= ' (product_width_unit = "in" and ((product_width = '. $width. ' AND product_height = '.$height .') OR (product_width = '. $height. ' AND product_height = '.$width .')))';
      $sizeQuery .= ' (((product_width > '. (intval($width*25.4)-15). ' AND product_width < '.(intval($width*25.4)+15).')';
      $sizeQuery .=  ' AND (product_height > '. (intval($height*25.4)-15). ' AND product_height <'. (intval($height*25.4)+15).'))';

      
      if($width!=$height){
        $sizeQuery .= ' OR ';
        $sizeQuery .= ' ((product_width > '. (intval($height*25.4)-10). ' AND product_width < '.(intval($height*25.4)+10).')';
        $sizeQuery .=  ' AND (product_height > '. (intval($width*25.4)-10). ' AND product_height <'. (intval($width*25.4)+10).')))';
      }
      else{
         $sizeQuery .= ')';
      }
    }
    // echo $sizeQuery;
    return $query->where($sizeQuery);
}


//   function colorFilteredQuery($colorFilters , $query){
//     global $db;
//     $colorQuery = '';
//     for($i = 0 ; $i < sizeof($colorFilters); $i++){
//         if($i>0)
//             $colorQuery .= ' OR ' ;
//         $colorQuery .= $db->product_colors->where(' color_name = "' . $colorFilters[$i].'" ')->select('products_id');
//         // ->select('products_id')->fetch()['products_id']
//         //$p .= ' colors_id = '. $c_id->fetch() . ' ' ;
//     }        echo ($colorQuery);

// //     print_r($p->fetch());
// //    $q = $db->product_colors()->where($p)->select('products_id');
//     return $query->where('id', $colorQuery);
//   }

  function applicationFilteredQuery($applicationFilters , $query){
    global $db;
   //  echo  ($query);
//    print_r($applicationFilters);
    // for($i = 0 ; $i < count($applicationFilters); $i++){
    //   $applicationQuery[$i] ='';
    // }
    $matchedIds= array();
    $applicationQuery='';
    for($i = 0 ; $i < count($applicationFilters); $i++){
     
         if($i>0)
          // SELECT * FROM product_applications WHERE (products_id IN ('11709', '11710', '11711', '11712', '11713', '11714', '11715', '11716', '11717', '11718', '11719', '11720', '11721')) AND (application_name = 'Bathroom' OR application_name = 'Bedroom') ORDER BY `application_name` ASC
            $applicationQuery .= ' OR ' ;
          // $applications = $query->where('id' , $db->product_applications()->where('application_name', $applicationFilters[$i]));
          $applicationQuery .=    "application_name = '".$applicationFilters[$i] ."'";
 // echo $applications;
          // foreach ($applications as $q) {              
          //   if(!in_array($q['id'], $matchedIds, true)){
          //      array_push($matchedIds, $q['id']);
          //   }
          // echo $q.' ';
          // } print_r("\n");
    } //$db->product_applications()->where('products_id' , $query)->where 
     // echo $applications;
    $Ids =   ($db->product_applications()->where('products_id' , $query)->where($applicationQuery)->select('products_id'));
       
     // echo   ($applicationQuery);
    return $query->where('id',$Ids);
}


function usageFilteredQuery($usageFilters , $query){
    global $db;         
    $usageQuery='';
    for($i = 0 ; $i < count($usageFilters); $i++){     
      if($i>0)
         $usageQuery .= ' OR ' ;
      $usageQuery .=    "usage_name = '".$usageFilters[$i] ."'"; 
    }    
    $Ids =   ($db->product_usages()->where('products_id' , $query)->where($usageQuery)->select('products_id'));    
    return $query->where('id',$Ids);
}
function colorFilteredQuery($colorFilters , $query){
    global $db;         
    $colorQuery='';
    for($i = 0 ; $i < count($colorFilters); $i++){     
      if($i>0)
         $colorQuery .= ' OR ' ;
      $colorQuery .=    "color_name = '".$colorFilters[$i] ."'"; 
    }    
    $Ids =   ($db->product_colors()->where('products_id' , $query)->where($colorQuery)->select('products_id'));    
    return $query->where('id',$Ids);
}
function priceFilteredQuery($priceRange , $query){
  global $db;
   $priceFilters =  explode('-', $priceRange);
   $lowPrice=0;$highPrice=100000;
   if(intval($priceFilters[0]))
      $lowPrice = intval($priceFilters[0]); 
   if(intval($priceFilters[1]))
    $highPrice = intval($priceFilters[1]);
// min price from sellers table
   $query = $query->where('product_price >= '.$lowPrice . ' AND product_price < '. $highPrice);
   // print_r($query);
   return $query ;
}


function sortFilteredQuery($sortFilters , $query){

  $sortTypeFilters = ['new','priceAsc','priceDesc'];
  // for($i=0 ;$i< count($sortTypeFilters) ; $i++)
  // { 
      if($sortFilters=='new')
          return $query->order(' product_addedOn DESC ');   
      if($sortFilters == 'priceAsc')
        return $query->order(' product_box_price ASC ');           
      if($sortFilters == 'priceDesc')      
        return $query->order(' product_box_price DESC ');   
      
      // }   

}

function setFinalFilterQuery($query){
  global $colorFilters, $priceFilters, $brandFilters,$finishTypeFilters,$lookFilters,$materialFilters,$applicationFilters,$usageFilters,$shapeFilters,$sortFilters,$sizeFilters;
  $get = filter_input_array(INPUT_GET);
  // if(array_key_exists('price_range', $get))
  //     $query = priceFilteredQuery($priceFilters,$query);
  if(array_key_exists('priceRange', $get))
      $query = priceFilteredQuery($get['priceRange'],$query);
  if(array_key_exists('brand_name', $get))
      $query = brandFilteredQuery($brandFilters,$query);
  if(array_key_exists('finish_types', $get))
      $query = finishTypeFilteredQuery($finishTypeFilters,$query);
  if(array_key_exists('materials', $get))
      $query = materialFilteredQuery($materialFilters,$query);
  if(array_key_exists('looks', $get))
      $query = lookFilteredQuery($lookFilters,$query);
  if(array_key_exists('shapes', $get))
      $query = shapeFilteredQuery($shapeFilters,$query);
  if(array_key_exists('sizes', $get))
      $query = sizeFilteredQuery($sizeFilters,$query);
  if(array_key_exists('applications', $get))
      $query = applicationFilteredQuery($applicationFilters,$query);
  if(array_key_exists('usages', $get))
      $query = usageFilteredQuery($usageFilters,$query);  
  if(array_key_exists('colors', $get))
      $query = colorFilteredQuery($colorFilters,$query);      
  // if(array_key_exists('colors', $get))
  //     $query = colorFilteredQuery($colorFilters,$query);

        
  if(array_key_exists('sortBy', $get))
      $query = sortFilteredQuery($get['sortBy'],$query);

  return $query;
}

function sizeInFeet($amount , $unit){
  if($unit=='mm'){ return round($amount * 0.00328084) ; }
  if($unit=='cm'){return round($amount * 0.0328084) ;}
  if($unit=='inch'){return round($amount/12);}
  if($unit=='ft') { return $amount;} 
}

function pricePerBox($width, $height, $unit , $totalItems){

}

function priceInfeet($basePrice, $unit){
  // $pricePerSqFt = 
}

function setOurMargin($price){
  $percentMargin = 8;
  return round(($price*$percentMargin)/100);
}
function updateMinPrice($product_id , $price){
    global $db;
    $price = $price + setOurMargin($price);
    $productMinPrice = $db->products()->where('id',$product_id)->fetch()['product_price'];
    if($productMinPrice == 0)
        $db->products()->where('id',$product_id)->update(array('product_price'=>$price));
    else{
      // if($productMinPrice > $price) 
      //   $db->products()->where('id',$product_id)->update(array('product_price'=>$price));
      // after updation of products price find min price from sellers_products table
      $minPriceSeller =  $db->sellers_products()->where('products_id',$product_id)->order(' price ASC ');
      $minPrice = $minPriceSeller->fetch()['price'];
      $minPrice = $minPrice + setOurMargin($minPrice);
      $db->products()->where('id',$product_id)->update(array('product_price'=>$minPrice));
 
    }          
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
                'product_price' => $p['product_price'],
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
  global $db;
    $data = array();
    global $resultPerPage;
    global $priceFilters,$colorFilters,$brandFilters;
    $count1 = 0;    // for counting color filter products
    $count2= 0;     //  for counting price filter products
    $count3= 0;    // for counting brand filter products
    foreach($query as $p)
    {
      // $minPrice = 0;
      // $minBoxPrice = 0;
      // $seller= ($db->sellers_products()->where('products_id',$p['id'])->order(' price ASC ')->fetch());
      // // print_r($seller);
      // if($seller){
      //   $minPrice = round(($seller['price'] + ($seller['price']*$seller['margin'])/100),2); //find minimum price form sellers_products table data
      //   $minBoxPrice = round($seller['box_price']+ ($seller['box_price']*$seller['margin'])/100);
      // }
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
                              'product_price' => $p['product_price'],
                              'product_box_price' => $p['product_box_price'],
                              'product_category' => $product_category ,
                              'product_type_id' => $p['type_id'],
                              'product_width' =>  $p['product_width'],
                              'product_height' =>  $p['product_height'],
                              'product_thickness' =>  $p['product_thickness'],
                              'product_w_unit' =>  $p['product_width_unit'],
                              'product_h_unit' =>  $p['product_height_unit'],
                              'product_t_unit' =>  $p['product_thickness_unit'],
                              'product_items_per_box' =>$p['product_items_per_box'],
                              'product_area' =>$p['product_area'],                               
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
                        'product_price' => $p['product_price'],
                        'product_box_price' => $p['product_box_price'],
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
                        'product_area'=> round($p['product_area'],2),
                        'product_rating' => $p['product_rating'],
                        'product_isDiscountAvailable' => $p['isDiscountAvailable'],
                        'product_isProductAvailable' => $p['isProductAvailable']
                    );
      }
    }
  return $data;
}
