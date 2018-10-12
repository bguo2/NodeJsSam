var app = angular.module('myapp', ['ngRoute'])
.config([
    '$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
       /*         $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');*/

        $routeProvider
        .when('/', { // For Home Page
            templateUrl: '/html/home.html',
            controller: 'homeController'
        })
        .when('/enpointprotection/:id', { // For EP Page
            templateUrl: '/html/endpotintProtection.html',
            controller: 'epController'
        })
        .when('/about', { // For about Page
            templateUrl: '/html/about.html',
            controller: 'aboutController'
        })
        .otherwise({   // This is when any route not matched => error
            controller: 'errorController'
        })
    } 
]);