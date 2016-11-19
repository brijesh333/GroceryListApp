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

app.service("GroceryService",function () {
    var groceryService={};
    groceryService.groceryItem=[
        {id:1,completed: true, itemName: 'milk', date: '2014-10-01'},
        {id:2,completed: true, itemName: 'coookies', date: '2014-10-02'},
        {id:3,completed: true, itemName: 'ice cream', date: '2014-10-03'},
        {id:4,completed: true, itemName: 'eggs', date: '2014-10-05'},
        {id:5,completed: true, itemName: 'bread', date: '2014-10-10'},
        {id:6,completed: true, itemName: 'potatoes', date: '2014-10-21'},
        {id:7,completed: true, itemName: 'rice', date: '2014-10-25'},
    ];

    groceryService.save=function(entry){
        groceryService.groceryItem.push(entry);
    }
    return groceryService;
});

app.controller('GroceryListItemController',["$scope","$routeParams","$location","GroceryService",function ($scope ,$routeParams,$location,GroceryService) {

    //console.log($GroceryService.groceryItem[0].itemName);
    $scope.groceryItem=GroceryService.groceryItem;
    //$scope.rp="Route parameter value is "+ $routeParams.id +$routeParams.newParam;
    $scope.groceryItems={ id:8,completed: true, itemName:"cheese", date:new Date() };
    
    $scope.save=function () {
        GroceryService.save($scope.groceryItems);
        $location.path("/");
    }
}]);