'use strict';

/* Controllers */

// Form controller
app.controller('FormDemoCtrl', ['$scope', '$http', 'toaster', 'FileUploader', '$sce', '$q', '$state', '$timeout', function($scope, $http, toaster, FileUploader, $sce, $q, $state, $timeout) {

        $scope.dirty = {};
        $scope.activeTab = 1;
        $scope.generalDataChecked = false;
        $scope.sellerDataChecked = false;
        $scope.submitImg = function(){
        uploaders[0].uploadAll();
        };

        $(document).click(function(){
          console.log('s');$scope.isOpen=0;
           if($("#suggestions").hasClass('open'))
            $("#suggestions").removeClass('open');
        });

        $("#product-name").click(function(e){
          console.log('r'); $scope.isOpen=1;
         if(!$("#suggestions").hasClass('open'))
            $("#suggestions").addClass('open');

          e.stopPropagation();
        });

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
        }
        $scope.updateSuggestProducts = function() {
            if ($scope.product.name != '' && typeof $scope.product.name != 'undefined') {
                $scope.queryUrl = $scope.product.name;
                $http.get('../api/slim.php/shiningfloor/products/' + $scope.queryUrl + '?details=false').then(function(resp) {
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
            $scope.selectedColors = [];
            for (i = 0; i < $scope.colorsLength; i++)
                $scope.selectedColors[i] = false;
        });

        function suggest_brand(term) {
            var q = term.toLowerCase().trim();

            var results = [];

            for (var i = 0; i < $scope.brands.length && results.length < 10; i++) {
                var state = $scope.brands[i];

                if (state.toLowerCase().indexOf(q) === 0)
                    results.push({
                        label: state,
                        value: state
                    });
            }

            return results;
        }
        $scope.brand_options = {
            suggest: suggest_brand
        };

        $scope.selectedTypeValue = "1";
        $scope.selectedType = 'tiles';
        $scope.selectType();

        $scope.product_types = [{
            'value': '1',
            'name': 'Tile'
        }];

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
            "total_boxes": "",
            "colors": "",
            "origin_country": "",
            "variation": "",
            "shape": "",
            "price": "",
            "items_per_box": "",
            "material": "",
            "minimum_boxes": "",
            "seller_product_code": "",
            "image": "",
            "comments": "",
            "features": "",
            "usages": "",
            "applications": ""
        };

        $http.get('../api/slim.php/shiningfloor/' + $scope.selectedType + '/brands').then(function(resp) {
            $scope.brands = resp.data.brands;
            $scope.totalBrands = $scope.brands.length;
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
            }
            $scope.material_options = {
                suggest: suggest_material
            };
        });
        var i, j;
        $http.get('../api/slim.php/shiningfloor/usages').then(function(resp) {
            $scope.usages = resp.data.usages;
            // $scope.usages = ["Floor","Wall","Commericial","Residential","Outdoor"];
            $scope.usagesLength = $scope.usages.length;
            $scope.selectedUsages = [];
            for (i = 0; i < $scope.usagesLength; i++) {
                $scope.selectedUsages[i] = false;                
            }
        });
        
        $http.get('../api/slim.php/shiningfloor/applications').then(function(resp) {
            $scope.applications = resp.data.applications;
            $scope.applicationsLength = $scope.applications.length;
            $scope.selectedApplications = [];
            for (i = 0; i < $scope.applicationsLength; i++) {
                $scope.selectedApplications[i] = false;               
            }
        });

        // $http.get('../api/slim.php/shiningfloor/finish_types').then(function(resp) {
        // $scope.finish_types = resp.data.finish_types;
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
            }
            $scope.finish_type_options = {
                suggest: suggest_finish_type
            };
        });
        // });
        //$scope.countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

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
        }
        $scope.country_options = {
            suggest: suggest_country
        };

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
            }

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
            }
            $scope.look_options = {
                suggest: suggest_look
            };
        });

        var urls = ['../api/slim.php/seller/uploadfile', '../api/slim.php/seller/uploadConcept', '../api/slim.php/seller/uploadfile'];

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

        // var uploader = $scope.uploader = new FileUploader({
        //     url: '../api/slim.php/seller/uploadfile' 
        // });

        // uploader.filters.push({
        //           name: 'customFilter',
        //           fn: function(item /*{File|FileLikeObject}*/, options) {
        //               var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        //               return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        //           }
        //       });


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
        }
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
        }
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
        }

        $scope.isGeneralFormOk = function() {

            if ($scope.isApplicationsOk() && $scope.isUsagesOk() && $scope.isColorsOk() && $scope.newProductForm.name.$valid && $scope.newProductForm.brand.$valid &&
                 $scope.newProductForm.width.$valid && $scope.newProductForm.height.$valid && $scope.newProductForm.thickness.$valid &&
                $scope.newProductForm.items_per_box.$valid && $scope.newProductForm.material.$valid && $scope.newProductForm.features.$valid)
                return true;
            else
                return false;
        }
        $scope.isSellerFormOk = function() {
            if ($scope.newProductForm.price.$valid && $scope.newProductForm.total_boxes.$valid && $scope.newProductForm.minimum_boxes.$valid)
                return true;
            else
                return false;
        }
        $scope.checkProductData = function() {
            $scope.generalDataChecked = true;
            if ($scope.isGeneralFormOk()){
                // var arr = {
                //          product_name : $scope.product.name,
                //          product_type : $scope.product.type,
                //          product_brand : $scope.product.brand
                //         }
                // $http.post('../api/slim.php/shiningfloor/seller/checkproduct', arr).success(function(data, status) {
                //     console.log(data);
                //     if(!data)
                        $scope.activeTab = 2;
                //     else{
                //         toaster.pop('error', 'Product Already Listed', 'Redirecting ...');
                //         $timeout(reloadState, 3000);   
                //     }
                // });

            }    
            else {

                var tmp = $scope.isUsagesOk() || $scope.isApplicationsOk() || $scope.isColorsOk();
                //    console.log($scope.newProductForm.brand.$valid+ 's');
            }
            // console.log($scope.activeTab);
        }

        $scope.checkSellerData = function() {
            $scope.sellerDataChecked = true;
            if ($scope.isSellerFormOk())
                $scope.activeTab = 3;
        }

        $scope.submitForm = function(product) {
            // console.log(uploaders[0].queue[0]);

            // uploader.uploadAll();
            console.log($scope.selectedUsages);
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
            $http.post('../api/slim.php/shiningfloor/seller/addproduct', product).
            success(function(data, status) {
                console.log(data);
                if(data.status=='new'){
                    uploaders[0].queue[0].upload();
                }
                else{
                    toaster.pop('success', 'Same Product Existed', 'Seller Data addedd Successfully');
                    $timeout(reloadState, 3000);
                }
                               
            });
        };
 
         uploaders[0].onAfterAddingFile = function(fileItem) {
            if(fileItem.file.size > 2000000){
              toaster.pop('info', 'Image size exceeded', 'maximum allowed size is 2MB'); 
              fileItem.remove();
              }  
        };
        uploaders[1].onAfterAddingFile = function(fileItem) {
           if(fileItem.file.size > 2000000){
              toaster.pop('info', 'Image size exceeded', 'maximum allowed size is 2MB');
              fileItem.remove();
            } 
        };
        uploaders[2].onAfterAddingFile = function(fileItem) {
            if(fileItem.file.size > 2000000){
              toaster.pop('info', 'Image size exceeded', 'maximum allowed size is 2MB'); 
              fileItem.remove();
          }
        };
        
        uploaders[0].onCompleteItem = function(fileItem, response, status, headers) {
            console.info('file uploaded', fileItem, response, status, headers);
            if(uploaders[1].queue.length!=0)
                uploaders[1].uploadAll();
            else if(uploaders[2].queue.length!=0)
                uploaders[2].uploadAll();
            else{
                toaster.pop('success', 'New Product', 'Product Added Successfully');
                $timeout(reloadState, 3000); 
            }

        };
         
        uploaders[1].onCompleteAll = function() {
            console.log('concepts uploads');
            if(uploaders[2].queue.length!=0)
                uploaders[2].uploadAll();
            };    

        uploaders[2].onCompleteAll = function() {
        console.log('other images uploaded');
        toaster.pop('success', 'New Product', 'Product Added Successfully');
                $timeout(reloadState, 3000); 
        };

        function reloadState() {
            $state.go('app.all.newproduct', {}, {
                reload: true
            });
        }

    }

]);