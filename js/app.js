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

app.service("GroceryService",function ($http) {
    var groceryService={};
    groceryService.groceryItem=[];

    $http.get("data/server_data.json")
        .success(function (data) {
            groceryService.groceryItem=data;

            for(item in groceryService.groceryItem){
                groceryService.groceryItem[item].date=new Date(groceryService.groceryItem[item].date);
            }
        })
        .error(function (data,status) {
            alert("Something went wrong");
        })

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
            $http.post("data/updatedItem.json",entry)
                .success(function (data) {
                    if(data.status==1){
                        updatedItem.completed=false;
                        updatedItem.itemName=entry.itemName;
                        updatedItem.date=entry.date;
                    }
                })
                .error(function(data, status){
                    alert("went wrong with update");
                })
        }
        else{
            $http.post("data/addedItem.json",entry)
                .success(function (data) {
                    entry.id=data.newId;
                })
                .error(function (data,status) {
                    alert("wrong with post method");
                })
            //entry.id=groceryService.getNewId();
            groceryService.groceryItem.push(entry);
        }

    }

    groceryService.removeItem=function(item){
        var index=groceryService.groceryItem.indexOf(item);
        groceryService.groceryItem.splice(index,1);
    }

    groceryService.markCompleted=function(entry){
        entry.completed=!entry.completed;
    }


    return groceryService;
});

app.controller('HomeController',["$scope","GroceryService",function ($scope,GroceryService) {
    $scope.appTitle="Grocery list app";
    $scope.groceryItem=GroceryService.groceryItem;

    $scope.removeItem=function(entry){
        GroceryService.removeItem(entry);
    };

    $scope.markCompleted=function(entry){
        GroceryService.markCompleted(entry);
    }
    
    $scope.$watch(function () {return GroceryService.groceryItem;},function (groceryItem) {
            $scope.groceryItem=groceryItem;
        });
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

app.directive("tbItemList",function(){
    return{
        restrict:"E",
        templateUrl:"views/groceryItem.html"
    }
});