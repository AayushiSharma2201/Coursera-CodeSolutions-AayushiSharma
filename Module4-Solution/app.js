var app = angular.module('restaurantApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .when('/categories', {
            templateUrl: 'categories.html',
            controller: 'CategoriesController'
        })
        .when('/items/:categoryId', {
            templateUrl: 'items.html',
            controller: 'ItemsController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('HomeController', function($scope) {
    $scope.message = "Welcome to our Restaurant!";
});

app.controller('CategoriesController', function($scope, $http) {
    $http.get('https://api.example.com/categories')
        .then(function(response) {
            $scope.categories = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching categories:', error);
        });
});

app.controller('ItemsController', function($scope, $http, $routeParams) {
    var categoryId = $routeParams.categoryId;
    $http.get('https://api.example.com/items?category=' + categoryId)
        .then(function(response) {
            $scope.items = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching items:', error);
        });
});
