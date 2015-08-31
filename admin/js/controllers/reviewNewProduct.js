'use strict';

/* Controllers */

// Form controller
app.controller('ReviewProductCtrl', ['$scope', '$http', '$stateParams', 'toaster', 'FileUploader', '$sce', '$q', '$state', '$timeout', function($scope, $http, $stateParams, toaster, FileUploader, $sce, $q, $state, $timeout) {

        $(document).click(function(){
           $scope.isOpen=0;
           if($("#suggestions").hasClass('open'))
            $("#suggestions").removeClass('open');
        });

        $("#query").click(function(e){
           $scope.isOpen=1;
         if(!$("#suggestions").hasClass('open'))
            $("#suggestions").addClass('open');

          e.stopPropagation();
        });
        $scope.dirty = {};
        $scope.activeTab = 1;
        $scope.generalDataChecked = false;
        $scope.sellerDataChecked = false;
        $scope.product = {
            "name": "",
            "type": "1",
            "brand": "",
            "look": "",
            "width": "",
            "height": "",
            "thickness": "",
            "w_unit": "ft",
            "t_unit": "mm",
            "finish_type": "",
            "url": "",
            "material": "",
            "items_per_box": "",
            "origin_country": "",
            "variation": "",
            "shape": "",
            "features": "",
            "price": "",
            "minimum_boxes": "",
            "seller_product_code": "",
            "total_boxes": "",
            "images": "",
            "comments": "",
            "colors": "",
            "usages": "",
            "applications": ""
        };

        var urls = ['../api/slim.php/seller/uploadfile/' + $stateParams.productId, '../api/slim.php/seller/uploadConcept/' + $stateParams.productId, '../api/slim.php/seller/uploadfile/' + $stateParams.productId];

        var filterObj = {
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
        var uploaders = $scope.uploaders = urls.map(function(url) {
            return new FileUploader({
                url: url,
                data: {
                    myObj: ['']
                },
            });
        });

        $scope.updateSuggestProducts = function() {
            if ($scope.product.name != '' && typeof $scope.product.name != 'undefined') {
                $scope.queryUrl = $scope.product.name;
                $http.get('../api/slim.php/shiningfloor/admin/products/' + $scope.queryUrl + '?details=false').then(function(resp) {
                    $scope.searchResults = resp.data.product_data;
                    $scope.totalResults = resp.data.totalResults;
                    $scope.start = resp.data.start;
                    $scope.last = resp.data.last;
                });
            } else {
                $scope.searchResults = '';
            }
        };
        $scope.tmp_product = $scope.product;
        $scope.selectProduct  = function(id){
            $http.get('../api/slim.php/shiningfloor/admin/product/' + id).then(function(resp) {
            //       console.log(resp.data.product_data[0]);
            var productData = resp.data.product_data[0];
            console.log(productData);
//                console.log(productData.product_name);
                $scope.tmp_product.name = productData.product_name;
                $scope.tmp_product.type = productData.product_type_id;
                $scope.tmp_product.brand = productData.product_brand;
                $scope.tmp_product.look = productData.product_look;
                if (productData.product_width !== 0)
                    $scope.tmp_product.width = productData.product_width;
                if (productData.product_height !== 0)
                    $scope.tmp_product.height = productData.product_height;
                if (productData.product_thickness !== 0)
                    $scope.tmp_product.thickness = productData.product_thickness;
                if (productData.product_w_unit !== '')
                    $scope.tmp_product.w_unit = productData.product_w_unit;
                if (productData.product_t_unit !== '')
                    $scope.tmp_product.t_unit = productData.product_t_unit;
                $scope.tmp_product.finish_type = productData.product_finish_type;
                $scope.tmp_product.material = productData.product_material;
                if (productData.product_items_per_box !== 0)
                    $scope.tmp_product.items_per_box = productData.product_items_per_box;
                $scope.tmp_product.origin_country = productData.product_origin_country;
                $scope.tmp_product.variation = productData.product_degree_of_variation;
                $scope.tmp_product.shape = productData.product_shape;
                $scope.tmp_product.features = productData.product_features;
                $scope.tmp_product.colors = productData.product_colors;
                $scope.tmp_product.usages = productData.product_usages;
                $scope.tmp_product.applications = productData.product_applications;
                $scope.tmp_product.images = productData.product_img;
                $scope.tmp_product.concepts = productData.product_concepts;                 
            });
            console.log($scope.tmp_product);
        }

        var i, j;
        $http.get('../api/slim.php/shiningfloor/product/' + $stateParams.productId).then(function(resp) {
            //       console.log(resp.data.product_data[0]);
            var productData = resp.data.product_data[0];
            if(typeof productData === 'undefined'){
                $state.go('app.all.products'); 
            }
            else{
                console.log(productData.product_name);
                $scope.product.name = productData.product_name;
                $scope.product.type = productData.product_type_id;
                $scope.product.brand = productData.product_brand;
                $scope.product.look = productData.product_look;
                if (productData.product_width !== 0)
                    $scope.product.width = productData.product_width;
                if (productData.product_height !== 0)
                    $scope.product.height = productData.product_height;
                if (productData.product_thickness !== 0)
                    $scope.product.thickness = productData.product_thickness;
                if (productData.product_w_unit !== '')
                    $scope.product.w_unit = productData.product_w_unit;
                if (productData.product_t_unit !== '')
                    $scope.product.t_unit = productData.product_t_unit;
                $scope.product.finish_type = productData.product_finish_type;
                $scope.product.material = productData.product_material;
                if (productData.product_items_per_box !== 0)
                    $scope.product.items_per_box = productData.product_items_per_box;
                $scope.product.origin_country = productData.product_origin_country;
                $scope.product.variation = productData.product_degree_of_variation;
                $scope.product.shape = productData.product_shape;
                $scope.product.features = productData.product_features;
                $scope.product.colors = productData.product_colors;
                $scope.product.usages = productData.product_usages;
                $scope.product.applications = productData.product_applications;
                $scope.product.images = productData.product_img;
                $scope.product.concepts = productData.product_concepts;
                $http.get('../api/slim.php/shiningfloor/seller/products/' + $stateParams.productId).then(function(resp) {
                    $scope.seller_data =resp.data.seller_product_data
                    if($scope.seller_data!=""){
                        $scope.data = resp.data.seller_product_data;

                            $scope.product.price = $scope.seller_data.price;
                            $scope.product.minimum_boxes = $scope.seller_data.minimum_boxes ;
                            $scope.product.seller_product_code = $scope.seller_data.seller_product_code;
                            $scope.product.total_boxes = $scope.seller_data.total_quantity;                         
                            $scope.product.comments = $scope.seller_data.comments; 
                   
                    }
                });
            }

            $scope.selectType = function(val) {
                //  console.log('44');
                switch (val) {
                    case "1":
                        $scope.selectedType = 'tiles';
                        break;
                }
                $http.get('../api/slim.php/shiningfloor/' + $scope.selectedType + '/brands').then(function(resp) {
                    $scope.brands = resp.data.brands;
                    $scope.totalBrands = $scope.brands.length;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                });
            };
            $scope.query='';
            $scope.updateSuggestProducts = function() {
                if ($scope.product.name != '' && typeof $scope.product.name != 'undefined') {
                     $scope.queryUrl = $scope.query;
                     $http.get('../api/slim.php/shiningfloor/admin/products/' + $scope.queryUrl + '?details=false').then(function(resp) {
                    $scope.searchResults = resp.data.product_data;
                    $scope.totalResults = resp.data.totalResults;
                    $scope.start = resp.data.start;
                    $scope.last = resp.data.last;
                    });
                } else {
                    $scope.searchResults = '';
                }

        };
            $http.get('../api/slim.php/shiningfloor/colors').then(function(resp) {
                $scope.colors = resp.data.colors;                 
                $scope.colorsLength = $scope.colors.length;
                console.log($scope.product.colors);
                $scope.selectedColors = [];

                for (i = 0; i < $scope.colorsLength; i++) {
                    $scope.selectedColors[i] = false;
                    for (j = 0; j < $scope.product.colors.length; j++) {
                        if ($scope.product.colors[j] == $scope.colors[i]) {
                            $scope.selectedColors[i] = true;
                            break;
                        }
                    }
                }
            });

            function suggest_brand(term) {
                var q = term.toLowerCase().trim();

                var results = [];

                for (var i = 0; i < $scope.brands.length && results.length < 10; i++) {
                    var state = $scope.brands[i];

                    if (state.toLowerCase().indexOf(q) === 0){
                        results.push({
                            label: state,
                            value: state
                        });
                    }
                }

                return results;
            };
            $scope.brand_options = {
                suggest: suggest_brand
            };

            $scope.selectedTypeValue = "1";
            $scope.selectedType = 'tiles';
            $scope.selectType();
            // $scope.product_types = [{'value':'1','name':'Tile'},{'value':'2','name':'Wood'},{'value':'7','name':'Mosiac'},{'value':'8','name':'Vinyl & Linoleum'},{'value':'9','name':'Carpet & Rugs'},{'value': '10','name':'Accessories'}];
            //$scope.product_types = [{'value':'1','name':'Tile'},{'value':'2','name':'Wood'},{'value':'3','name':'Marble'},{'value':'4','name':'Stone'},{'value':'5','name':'Wallpaper'},{'value': '6','name':'Artificial'}];

            $scope.product_types = [{
                'value': '1',
                'name': 'Tile'
            }];


            $http.get('../api/slim.php/shiningfloor/' + $scope.selectedType + '/brands').then(function(resp) {
                $scope.brands = resp.data.brands;
                $scope.totalBrands = $scope.brands.length;
            });


            $http.get('../api/slim.php/shiningfloor/usages').then(function(resp) {
                $scope.usages = resp.data.usages;
                 
                // $scope.usages = ["Floor","Wall","Commericial","Residential","Outdoor"];
                $scope.usagesLength = $scope.usages.length;                
                $scope.selectedUsages = [];
                for (i = 0; i < $scope.usagesLength; i++) {
                    $scope.selectedUsages[i] = false;
                    for (j = 0; j < $scope.product.usages.length; j++) {
                        if ($scope.product.usages[j] == $scope.usages[i]) {
                            $scope.selectedUsages[i] = true;
                            break;
                        }
                    }
                }
            });
            // $scope.applications=["Bedroom","Bathroom","Kitchen","Living Room","Outdoor"];
            $http.get('../api/slim.php/shiningfloor/applications').then(function(resp) {
                $scope.applications = resp.data.applications;
                
                $scope.applicationsLength = $scope.applications.length;
                $scope.selectedApplications = [];
                for (i = 0; i < $scope.applicationsLength; i++) {
                    $scope.selectedApplications[i] = false;
                    for (j = 0; j < $scope.product.applications.length; j++) {
                        if ($scope.product.applications[j] == $scope.applications[i]) {
                            $scope.selectedApplications[i] = true;
                            break;
                        }
                    }
                }
            });
            $http.get('../api/slim.php/shiningfloor/materials').then(function(resp) {
                $scope.materials = resp.data.materials;
                $scope.materialsLength = $scope.materials.length;

                function suggest_material(term) {
                    var q = term.toLowerCase().trim();
                    var results = [];
                    for (var i = 0; i < $scope.materials.length && results.length < 10; i++) {
                        var state = $scope.materials[i];

                        if (state.toLowerCase().indexOf(q) === 0)
                            results.push({
                                label: state,
                                value: state
                            });
                    }
                    return results;
                };
                $scope.material_options = {
                    suggest: suggest_material
                };
            });


            $scope.countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

            function suggest_country(term) {
                var q = term.toLowerCase().trim();
                var results = [];
                for (var i = 0; i < $scope.countries.length && results.length < 10; i++) {
                    var state = $scope.countries[i];

                    if (state.toLowerCase().indexOf(q) === 0)
                        results.push({
                            label: state,
                            value: state
                        });
                }
                return results;
            };
            $scope.country_options = {
                suggest: suggest_country
            };

            $http.get('../api/slim.php/shiningfloor/finish_types').then(function(resp) {
                $scope.finish_types = resp.data.finish_types;
                $scope.finish_typesLength = $scope.finish_types.length;

                function suggest_finish_type(term) {
                    var q = term.toLowerCase().trim();
                    var results = [];
                    for (var i = 0; i < $scope.finish_types.length && results.length < 10; i++) {
                        var state = $scope.finish_types[i];

                        if (state.toLowerCase().indexOf(q) === 0)
                            results.push({
                                label: state,
                                value: state
                            });
                    }
                    return results;
                };
                $scope.finish_type_options = {
                    suggest: suggest_finish_type
                };
            });

            $http.get('../api/slim.php/shiningfloor/shapes').then(function(resp) {
                $scope.shapes = resp.data.shapes;
                // $scope.shapes = ["Hexagon","Octagon","Oval","Rectangle","Round","Square","Pebble"];
                function suggest_shape(term) {

                    var q = term.toLowerCase().trim();
                    var results = [];
                    for (var i = 0; i < $scope.shapes.length && results.length < 10; i++) {
                        var state = $scope.shapes[i];

                        if (state.toLowerCase().indexOf(q) === 0)
                            results.push({
                                label: state,
                                value: state
                            });
                    }
                    return results;
                };

                $scope.shape_options = {
                    suggest: suggest_shape
                };
            });
            $http.get('../api/slim.php/shiningfloor/looks').then(function(resp) {
                $scope.looks = resp.data.looks;

                function suggest_look(term) {
                    var q = term.toLowerCase().trim();
                    var results = [];
                    for (var i = 0; i < $scope.looks.length && results.length < 10; i++) {
                        var state = $scope.looks[i];

                        if (state.toLowerCase().indexOf(q) === 0)
                            results.push({
                                label: state,
                                value: state
                            });
                    }
                    return results;
                };
                $scope.look_options = {
                    suggest: suggest_look
                };
            });

        });


        $scope.usagesFieldOk = true;
        $scope.colorsFieldOk = true;
        $scope.applicationsFieldOk = true;

        $scope.isApplicationsOk = function() {
            $scope.applicationsFieldOk = false;
            for (i = 0; i < $scope.applicationsLength; i++) {
                if ($scope.selectedApplications[i] == true) {
                    $scope.applicationsFieldOk = true;
                    break;
                }
            }

            if ($scope.applicationsFieldOk)
                return true;
            else
                return false;
        };
        $scope.isUsagesOk = function() {
            $scope.usagesFieldOk = false;
            for (i = 0; i < $scope.usagesLength; i++) {
                if ($scope.selectedUsages[i] == true) {
                    $scope.usagesFieldOk = true;
                    break;
                }
            }
            if ($scope.usagesFieldOk)
                return true;
            else
                return false;
        };
        $scope.isColorsOk = function() {

            $scope.colorsFieldOk = false;
            for (i = 0; i < $scope.colorsLength; i++) {
                if ($scope.selectedColors[i] == true) {
                    $scope.colorsFieldOk = true;
                    break;
                }
            }
            if ($scope.colorsFieldOk)
                return true;
            else
                return false;
        };

        $scope.isGeneralFormOk = function() {
 
            if ($scope.isApplicationsOk() && $scope.isUsagesOk() && $scope.isColorsOk()  
                 && $scope.editProductForm.width.$valid && $scope.editProductForm.height.$valid && $scope.editProductForm.thickness.$valid &&
                $scope.editProductForm.items_per_box.$valid && $scope.editProductForm.material.$valid && $scope.editProductForm.features.$valid)
                return true;
            else
                return false;
        };
        $scope.isSellerFormOk = function() {
            if ($scope.editProductForm.price.$valid && $scope.editProductForm.total_boxes.$valid && $scope.editProductForm.minimum_boxes.$valid)
                return true;
            else
                return false;
        };
        $scope.checkProductData = function() {
            $scope.generalDataChecked = true;
            if ($scope.isGeneralFormOk())
                $scope.activeTab = 2;
            else {

                var tmp = $scope.isUsagesOk() || $scope.isApplicationsOk() || $scope.isColorsOk();
                //    console.log($scope.editProductForm.brand.$valid+ 's');
            }
            // console.log($scope.activeTab);
        };

        $scope.checkSellerData = function() {
            $scope.sellerDataChecked = true;
            if ($scope.isSellerFormOk())
                $scope.activeTab = 3;
        };

        $scope.submitForm = function(product) {

            console.log($scope.selectedUsages);
            product.usages = '';
            product.applications = '';
            product.colors = '';
            for (i = 0; i < $scope.usagesLength; i++) {
                if ($scope.selectedUsages[i] == true) {
                    if (product.usages != "")
                        product.usages += "," + $scope.usages[i];
                    else
                        product.usages = $scope.usages[i];
                }
            }

            for (i = 0; i < $scope.applicationsLength; i++) {
                if ($scope.selectedApplications[i] == true) {
                    if (product.applications != "")
                        product.applications += "," + $scope.applications[i];
                    else
                        product.applications = $scope.applications[i];
                }
            }
            for (i = 0; i < $scope.colorsLength; i++) {
                if ($scope.selectedColors[i] == true) {
                    if (product.colors != "")
                        product.colors += "," + $scope.colors[i];
                    else
                        product.colors = $scope.colors[i];
                }
            }
            console.log(product);
            console.log(JSON.stringify(product));
            $http.put('../api/slim.php/shiningfloor/seller/editproduct/' + $stateParams.productId, product).success(function(data, status) {
                console.log(data);
                if($scope.seller_data!=""){
                    $http.put('../api/slim.php/shiningfloor/seller/editSellerData/' + $stateParams.productId, product).
                    then(function(resp) {
                        console.log(resp);
                        
                    });
                }
                else{
                    
                    $http.post('../api/slim.php/shiningfloor/seller/addSellerData/' + $stateParams.productId, product).
                    then(function(resp) {
                        console.log(resp);                         
                    });
                }
                if(data.status=='success'){
                    if (uploaders[0].queue.length)
                        uploaders[0].queue[0].upload();
                    else if(uploaders[1].queue.length)
                        uploaders[1].uploadAll();
                    else if(uploaders[2].queue.length)
                        uploaders[2].uploadAll();
                    else{
                        toaster.pop('success', 'Edit Product', 'Product Changes Saved');
                        $timeout(redirectTo, 3000); 
                        }
                }
                else{

                        toaster.pop('success', 'Edit Product', 'Seller Data Updated');
                        $timeout(redirectTo, 3000); 
                         
                }    
                 
            });
        };

        uploaders[0].onCompleteItem = function(fileItem, response, status, headers) {
            console.info('file uploaded', fileItem, response, status, headers);
            if(uploaders[1].queue.length!=0)
                uploaders[1].uploadAll();
            else
                uploaders[2].uploadAll();
        };
         
        uploaders[1].onCompleteAll = function() {
            console.log('concepts uploads');
            if(uploaders[2].queue.length!=0)
                uploaders[2].uploadAll();
            else{
                toaster.pop('success', 'Edit Product', 'Product Changes Submited');
                $timeout(redirectTo, 3000); 
            }

            };    

        uploaders[2].onCompleteAll = function() {
        console.log('other images uploaded');
        toaster.pop('success', 'Edit Product', 'Product Changes Submited');
                $timeout(redirectTo, 3000); 
        };


        function redirectTo() {
            $state.go('app.all.products', {}, {
                reload: true
            });
        };

    }

]);