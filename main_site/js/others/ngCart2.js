'use strict';


angular.module('ngCart', ['ngCart.directives'])

    .config([function () {

    }])

    .provider('$ngCart', function () {
        this.$get = function () {
        };
    })

    .run(['$rootScope', 'ngCart','ngCartItem', 'store', function ($rootScope, ngCart, ngCartItem, store) {

        $rootScope.$on('ngCart:change', function(){
            ngCart.$save();
        });

        if (angular.isObject(store.get('cart'))) {
            ngCart.$restore(store.get('cart'));

        } else {
            ngCart.init();
        }

    }])

    .service('ngCart', ['$rootScope', 'ngCartItem', 'store', function ($rootScope, ngCartItem, store) {

        this.init = function(){
            this.$cart = {
                shipping : null,
                sampleCharges : null,
                perSampleCharge : 50,
                taxRate : null,
                tax : null,
                items : [],
                samples: []
            };
        };

        this.addItem = function (id, name, price, quantity, data) {
 
            var inCart = this.getItemById(id);

            if (typeof inCart === 'object'){
                //Update quantity of an item if it's already in the cart
                inCart.setQuantity(quantity, false);
            } else {
                var newItem = new ngCartItem(id, name, price, quantity, data);                 
                this.$cart.items.push(newItem);
                $rootScope.$broadcast('ngCart:itemAdded', newItem);
            }  
            $rootScope.$broadcast('ngCart:change', {});
        };

        this.addSample = function (id, name, price, quantity, data) {
 
            var inCart = this.getSampleById(id);

            if (typeof inCart === 'object'){
                //Update quantity of an item if it's already in the cart
                inCart.setQuantity(quantity, false);
            } else {
                var newSample = new ngCartSample(id, name, price, quantity, data);                 
                this.$cart.samples.push(newSample);
                $rootScope.$broadcast('ngCart:itemAdded', newSample);
            }
 
            this.setSampleCharges(this.$cart.perSampleCharge);
            $rootScope.$broadcast('ngCart:change', {});
        };


        this.getItemById = function (itemId) {
            var items = this.getCart().items;
            var build = false;

            angular.forEach(items, function (item) {
                if  (item.getId() === itemId) {
                    build = item;
                }
            });
            return build;
        };

        this.getSampleById = function (sampleId) {
            var samples = this.getCart().samples;
            var build = false;

            angular.forEach(samples, function (sample) {
                if  (sample.getId() === sampleId) {
                    build = sample;
                }
            });
            return build;
        };

        this.setShipping = function(shipping){
            this.$cart.shipping = shipping;
            return this.getShipping();
        };

        this.getShipping = function(){
            if (this.getCart().items.length == 0) return 0;
            return  this.getCart().shipping;
        };
        this.setSampleCharges = function(sampleCharges){
            if(this.getCart().samples.length <= 5)
               this.$cart.sampleCharges = 0;
            else
                this.$cart.sampleCharges =   (this.getCart().samples.length-5)*sampleCharges;               
            return this.getSampleCharges();
        };

        this.getSampleCharges = function(){
            if (this.getCart().samples.length <= 5) return 0;
            return   this.getCart().sampleCharges; 
        };

        this.setTaxRate = function(taxRate){
            this.$cart.taxRate = +parseFloat(taxRate).toFixed(2);
            return this.getTaxRate();
        };

        this.getTaxRate = function(){
            return this.$cart.taxRate
        };

        this.getTax = function(){
            return +parseFloat(((this.getSubTotal()/100) * this.getCart().taxRate )).toFixed(2);
        };

        this.setCart = function (cart) {
            this.$cart = cart;
            return this.getCart();
        };

        this.getCart = function(){
            return this.$cart;
        };

        this.getItems = function(){
            return this.getCart().items;
        };

        this.getSamples = function(){
            return this.getCart().samples;
        };

         
        this.getTotalItems = function () {
            var count = 0;
            var items = this.getItems();
            angular.forEach(items, function (item) {
                count += item.getQuantity();
            });
            return count;
        };

        this.getTotalSamples = function () {
            var count = 0;
            var samples = this.getSamples();
            angular.forEach(samples, function (sample) {
                count += sample.getQuantity();
            });
            return count;
        };

        this.getTotalUniqueItems = function () {
            return this.getCart().items.length;
        };

        this.getTotalUniqueSamples = function () {
            return this.getCart().samples.length;
        };

        this.getSubTotal = function(){
            var total = 0;
            angular.forEach(this.getCart().items, function (item) {
                total += item.getTotal();
            });
            return +parseFloat(total).toFixed(2);
        };

        this.totalCost = function () { 
            return +parseFloat(this.getSubTotal() + this.getShipping() + this.getSampleCharges()+ this.getTax()).toFixed(2);
        };

        this.removeItem = function (index) {
            this.$cart.items.splice(index, 1);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});

        };

        this.removeSample = function (index) {
            this.$cart.samples.splice(index, 1);
            $rootScope.$broadcast('ngCart:sampleRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});

        };

        this.removeItemById = function (id) {
            var cart = this.getCart();
            angular.forEach(cart.items, function (item, index) {
                if  (item.getId() === id) {
                    cart.items.splice(index, 1);
                    console.log('updated cart items = '  + cart.items);
                    var count = 0, i = 0;
                    for(i=0;i<cart.items.length;i++)
                    {
                        // count = cart.items[i].quantity;
                        count+= (cart.items[i]['_quantity']);
                    }
                    $(".counter").html (count) ;
                }
            });
            this.setCart(cart);
             this.setSampleCharges(this.$cart.perSampleCharge);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});
        };

        this.removeSampleById = function (id) {
            var cart = this.getCart();
            angular.forEach(cart.samples, function (sample, index) {
                if  (sample.getId() === id) {
                    cart.samples.splice(index, 1);
                    console.log('updated cart samples = '  + cart.samples);
                    var count = 0, i = 0;
                    for(i=0;i<cart.samples.length;i++)
                    {
                        // count = cart.items[i].quantity;
                        count+= (cart.samples[i]['_quantity']);
                    }
                    $(".counter").html (count) ;
                }
            });
            this.setCart(cart);
            this.setSampleCharges(this.$cart.perSampleCharge);
            $rootScope.$broadcast('ngCart:sampleRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});
        };

        this.empty = function () {

            $rootScope.$broadcast('ngCart:change', {});
            this.$cart.items = [];
            this.$cart.samples = [];
            localStorage.removeItem('cart');
        };

        this.toObject = function() {

            if (this.getItems().length === 0 && this.getSamples().length === 0 ) return false;

            var items = [];
            var samples = [];
            angular.forEach(this.getItems(), function(item){
                items.push (item.toObject());
            });
            angular.forEach(this.getSamples(), function(sample){
                samples.push (sample.toObject());
            });
            return {
                shipping: this.getShipping(),
                sampleCharges : this.getSampleCharges(),
                tax: this.getTax(),
                taxRate: this.getTaxRate(),
                subTotal: this.getSubTotal(),
                totalCost: this.totalCost(),
                items:items,
                samples: samples
            }
        };


        this.$restore = function(storedCart){
            var _self = this;
            _self.init();
            _self.$cart.shipping = storedCart.shipping;
            _self.$cart.sampleCharges = storedCart.sampleCharges;            
            _self.$cart.tax = storedCart.tax;

            angular.forEach(storedCart.items, function (item) {
                _self.$cart.items.push(new ngCartItem(item._id,  item._name, item._price, item._quantity, item._data));
            });
            angular.forEach(storedCart.samples, function (sample) {
                _self.$cart.samples.push(new ngCartSample(sample._id,  sample._name, sample._price, sample._quantity, sample._data));
            });

            this.$save();
        };

        this.$save = function () {
            return store.set('cart', JSON.stringify(this.getCart()));
        }

    }])

    .factory('ngCartItem', ['$rootScope', '$log', function ($rootScope, $log) {

        var item = function (id, name, price, quantity, data) {
            this.setId(id);
            this.setName(name);
            this.setPrice(price);
            this.setQuantity(quantity);
            this.setData(data);
        };        
        item.prototype.setId = function(id){
            if (id)  this._id = id;
            else {
                $log.error('An ID must be provided');
            }
        };
 
        item.prototype.getId = function(){
            return this._id;
        };
   
        item.prototype.setName = function(name){
            if (name)  this._name = name;
            else {
                $log.error('A name must be provided');
            }
        };
 
        item.prototype.getName = function(){
            return this._name;
        };
 
        item.prototype.setPrice = function(price){

            var priceFloat = parseFloat(price);
            if (priceFloat) {
                if (priceFloat < 0) {
                    $log.error('A price must be over 0');
                } else {
                    this._price = (priceFloat);
                }
            } else {
                if(price==0)
                    this._price = 0;
                else
                 $log.error('A price must be provided');
            }
        };
 
        item.prototype.getPrice = function(){
            return this._price;
        };
 
        item.prototype.setQuantity = function(quantity, relative){


            var quantityInt = parseInt(quantity);
            if (quantityInt % 1 === 0){
                if (relative === true){
                    this._quantity  += quantityInt;
                      // console.log($("#counter").text()) ;
                     $(".counter").html(parseInt($("#counter").text())+quantity);

                } else {
                    this._quantity = quantityInt;

                }
                if (this._quantity < 1) this._quantity = 1;

            } else {
                this._quantity = 1;
                $log.info('Quantity must be an integer and was defaulted to 1');
            }
 
            $rootScope.$broadcast('ngCart:change', {});

        };
        
        item.prototype.getQuantity = function(){
            return this._quantity;
        };

         
        item.prototype.setData = function(data){
            if (data) this._data = data;
        };
 
        item.prototype.getData = function(){
            if (this._data){
                return this._data;}
            else $log.info('This item has no data');
        };
 

        item.prototype.getTotal = function(){
            return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
        };
 
        item.prototype.toObject = function() {
            return {
                id: this.getId(),
                name: this.getName(),
                price: this.getPrice(),
                quantity: this.getQuantity(),
                data: this.getData(),
                total: this.getTotal()
            }
        };

        return item;

    }])

    .factory('ngCartSample', ['$rootScope', '$log', function ($rootScope, $log) {
           
        var sample = function (id, name, price, quantity, data) {
            this.setId(id);
            this.setName(name);
            this.setPrice(price);
            this.setQuantity(quantity);
            this.setData(data);
        };

        sample.prototype.setId = function(id){
            if (id)  this._id = id;
            else {
                $log.error('An ID must be provided');
            }
        };
 
        sample.prototype.getId = function(){
            return this._id;
        };

         
        sample.prototype.setName = function(name){
            if (name)  this._name = name;
            else {
                $log.error('A name must be provided');
            }
        };
 
        sample.prototype.getName = function(){
            return this._name;
        };
 
        sample.prototype.setPrice = function(price){

            var priceFloat = parseFloat(price);
            if (priceFloat) {
                if (priceFloat < 0) {
                    $log.error('A price must be over 0');
                } else {
                    this._price = (priceFloat);
                }
            } else {
                if(price==0)
                    this._price = 0;
                else
                 $log.error('A price must be provided');
            }
        };
 

        sample.prototype.getPrice = function(){
            return this._price;
        };
 
        sample.prototype.setQuantity = function(quantity, relative){

            var quantityInt = parseInt(quantity);
            if (quantityInt % 1 === 0){
                if (relative === true){
                    this._quantity  += quantityInt;
                      // console.log($("#counter").text()) ;
                     $(".counter").html(parseInt($("#counter").text())+quantity);

                } else {
                    this._quantity = quantityInt;

                }
                if (this._quantity < 1) this._quantity = 1;

            } else {
                this._quantity = 1;
                $log.info('Quantity must be an integer and was defaulted to 1');
            } 
            $rootScope.$broadcast('ngCart:change', {});
        };
 
        sample.prototype.getQuantity = function(){
            return this._quantity;
        };
 
        sample.prototype.setData = function(data){
            if (data) this._data = data;
        };

         
        sample.prototype.getData = function(){
            if (this._data){
                return this._data;}
            else $log.info('This sample has no data');
        };
 
        sample.prototype.getTotal = function(){
            return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
        };
 
        sample.prototype.toObject = function() {
            return {
                id: this.getId(),
                name: this.getName(),
                price: this.getPrice(),
                quantity: this.getQuantity(),
                data: this.getData(),
                total: this.getTotal()
            }
        };

        return sample;  
    }])
    .service('store', ['$window', function ($window) {

        return {

            get: function (key) {
                if ($window.localStorage [key]) {
                    var cart = angular.fromJson($window.localStorage [key]);
                    return JSON.parse(cart);
                }
                return false;

            },


            set: function (key, val) {

                if (val === undefined) {
                    $window.localStorage .removeItem(key);
                } else {
                    $window.localStorage [key] = angular.toJson(val);
                }
                return $window.localStorage [key];
            }
        }
    }])

    .controller('CartController',['$scope', 'ngCart', function($scope, ngCart) {
        $scope.ngCart = ngCart;

    }])

    .value('version', '0.0.3-rc.1');
;'use strict';


angular.module('ngCart.directives', ['ngCart.fulfilment'])

    .controller('CartController',['$scope', 'ngCart', function($scope, ngCart) {
        $scope.ngCart = ngCart;
    }])

    .directive('ngcartAddtocart', ['ngCart', function(ngCart){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {
                id:'@',
                name:'@',
                quantity:'@',
                quantityMax:'@',
                price:'@',
                data:'='
            },
            transclude: true,
            templateUrl: 'template/ngCart/addtocart.html',
            link:function(scope, element, attrs){
                scope.attrs = attrs;
                scope.inCart = function(){
                    return  ngCart.getItemById(attrs.id);
                };

                if (scope.inCart()){
                    scope.q = ngCart.getItemById(attrs.id).getQuantity();
                } else {
                    scope.q = parseInt(scope.quantity);
                }

                scope.qtyOpt =  [];
                for (var i = 1; i <= scope.quantityMax; i++) {
                    scope.qtyOpt.push(i);
                }

            }

        };
    }])

    .directive('ngcartCart', [function(){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            templateUrl: 'template/ngCart/cart.html',
            link:function(scope, element, attrs){

            }
        };
    }])

    .directive('ngcartSummary', [function(){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            transclude: true,
            templateUrl: 'template/ngCart/summary.html'
        };
    }])

    .directive('ngcartMycart', [function(){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            transclude: true,
            templateUrl: 'template/ngCart/mycart.html'
        };
    }])
    .directive('ngcartSummarycart', [function(){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            transclude: true,
            templateUrl: 'template/ngCart/summarycart.html'
        };
    }])
    .directive('ngcartCheckout', [function(){
        return {
            restrict : 'E',
            controller : ('CartController', ['$scope', 'ngCart', 'fulfilmentProvider', function($scope, ngCart, fulfilmentProvider) {
                $scope.ngCart = ngCart;

                $scope.checkout = function () {
                    fulfilmentProvider.setService($scope.service);
                    fulfilmentProvider.setSettings($scope.settings);
                    var promise = fulfilmentProvider.checkout();
                    console.log(promise);
                }
            }]),
            scope: {
                service:'@',
                settings:'='
            },
            transclude: true,
            templateUrl: 'template/ngCart/checkout.html'
        };
    }]);;
angular.module('ngCart.fulfilment', [])
    .service('fulfilmentProvider', ['$injector', function($injector){

        this._obj = {
            service : undefined,
            settings : undefined
        };

        this.setService = function(service){
            this._obj.service = service;
        };

        this.setSettings = function(settings){
            this._obj.settings = settings;
        };

        this.checkout = function(){
            var provider = $injector.get('ngCart.fulfilment.' + this._obj.service);
              return provider.checkout(this._obj.settings);

        }

    }])


.service('ngCart.fulfilment.log', ['$q', '$log', 'ngCart', function($q, $log, ngCart){

        this.checkout = function(){

            var deferred = $q.defer();

            $log.info(ngCart.toObject());
            deferred.resolve({
                cart:ngCart.toObject()
            });

            return deferred.promise;

        }

 }])

.service('ngCart.fulfilment.http', ['$http', 'ngCart', function($http, ngCart){

        this.checkout = function(settings){
            return $http.post(settings.url,
                {data:ngCart.toObject()})
        }
 }])


.service('ngCart.fulfilment.paypal', ['$http', 'ngCart', function($http, ngCart){


}]);
