/**
 * Created by brijesh on 12/11/16.
 */
var app=angular.module('groceryListApp',['ngRoute']);


app.config(function($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl:"views/view1.html",
            controller:"HomeController"
        })
        .when("/addItem",{
            templateUrl:"views/view2.html",
            controller:"GroceryListItemController"
        })
        .when("/addItem/:id",{
            templateUrl:"views/view2.html",
            controller:"GroceryListItemController"
        })
        .when("/addItem/edit/:id",{
            templateUrl:"views/view2.html",
            controller:"GroceryListItemController"
        })
        .otherwise({
            redirectTo:"/"
        })

});

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

    groceryService.findById=function(id){
        for(var item in groceryService.groceryItem){
            if(groceryService.groceryItem[item].id==id){
                //console.log(groceryService.groceryItem.id);
                return groceryService.groceryItem[item];
            }
        }
    }

    groceryService.getNewId=function(){
        if(groceryService.newId){
            groceryService.newId++;
            return groceryService.newId;
        }
        else{
            var max=_.max(groceryService.groceryItem,function (entry) {
                return entry.id;
            });
            groceryService.newId=max.id+1;
            return groceryService.newId;
        }
    }

    groceryService.save=function(entry){
        var updatedItem=groceryService.findById(entry.id);
        if(updatedItem){
            updatedItem.completed=true;
            updatedItem.itemName=entry.itemName;
            updatedItem.date=entry.date;
        }
        else{
            entry.id=groceryService.getNewId();
            groceryService.groceryItem.push(entry);
        }

    }


    return groceryService;
});

app.controller('HomeController',["$scope","GroceryService",function ($scope,GroceryService) {
    $scope.appTitle="Grocery list app";
    $scope.groceryItem=GroceryService.groceryItem;
}]);


app.controller('GroceryListItemController',["$scope","$routeParams","$location","GroceryService",function ($scope ,$routeParams,$location,GroceryService) {

    //console.log($GroceryService.groceryItem[0].itemName);
    //$scope.groceryItem=GroceryService.groceryItem;

    if(!$routeParams.id){
        $scope.groceryItems={ id:0,completed: false, itemName:"", date:new Date() };
    }
    else{
        $scope.groceryItems=_.clone(GroceryService.findById($routeParams.id));
    }


    //$scope.rp="Route parameter value is "+ $routeParams.id +$routeParams.newParam;
    //$scope.groceryItems={ id:8,completed: true, itemName:"cheese", date:new Date() };
    
    $scope.save=function () {
        GroceryService.save($scope.groceryItems);
        $location.path("/");
    };

    //console.log($scope.groceryItem);
}]);