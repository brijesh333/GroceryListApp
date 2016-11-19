/**
 * Created by brijesh on 12/11/16.
 */
var app=angular.module('groceryListApp',['ngRoute']);


app.config(function($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl:"views/view1.html",
            controller:"GroceryListItemController"
        })
        .when("/addItem",{
            templateUrl:"views/view2.html",
            controller:"GroceryListItemController"
        })
        .when("/addItem/:id",{
            templateUrl:"views/view2.html",
            controller:"GroceryListItemController"
        })
        .when("/addItem/:id/:newParam",{
            templateUrl:"views/view2.html",
            controller:"GroceryListItemController"
        })
        .otherwise({
            redirectTo:"/"
        })

});
app.controller('HomeController',['$scope',function ($scope) {
    $scope.appTitle="Grocery list app";
}]);

app.controller('GroceryListItemController',["$scope","$routeParams",function ($scope ,$routeParams) {
    $scope.groceryItem=[
        {completed: true, itemName: 'milk', date: '2014-10-01'},
        {completed: true, itemName: 'coookies', date: '2014-10-02'},
        {completed: true, itemName: 'ice cream', date: '2014-10-03'},
        {completed: true, itemName: 'eggs', date: '2014-10-05'},
        {completed: true, itemName: 'bread', date: '2014-10-10'},
        {completed: true, itemName: 'potatoes', date: '2014-10-21'},
        {completed: true, itemName: 'rice', date: '2014-10-25'},
    ];

    $scope.rp="Route parameter value is "+ $routeParams.id +$routeParams.newParam;
}]);