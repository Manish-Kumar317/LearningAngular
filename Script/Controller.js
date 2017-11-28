var app = angular.module("myApp",['ngRoute'])
                 .config(function($routeProvider){
                   $routeProvider
                     .when('/home',{

                     templateUrl : "./home.html",
                     controller : "myController"
                     })
                       .when('/survey',{

                           templateUrl : "./survey.html",
                           controller : "myController"
                       })
                       .when('/admin',{

                           templateUrl : "./admin.html"

                       })
                       .when('/admin/:username/:pass',{

                           templateUrl : "./admin.html",
                           controller : "adminController"
                          /* resolve:{
                               "check":function($location,$routeParams){
                                   console.log("value"+$routeParams.username);
                                   if($routeParams.username==="admin"&& $routeParams.pass==="admin"){
                                      $location.path("/insert")
                                   }else{
                                       $location.path('/insert');    //redirect user to home.
                                       alert("You don't have access here");
                                   }
                               }
                       }*/})
                       .when('/insert',{
                           templateUrl : "./insert.html",
                           controller : "myController"

                       })

                       .otherwise({
                           redirectTo : "/home"
                       })
                 })
    .controller("adminController",function($scope, $routeParams,$location){

             if($routeParams.username==="admin"&& $routeParams.pass==="admin")
             {
                 $location.path("/insert")


             }
             else
             {
                 alert("Invalid Credentials");
                 $location.path("/admin");
             }





    })
                .controller("myController",function($scope, $location, $anchorScroll, $timeout){

                    var social = [
                    {name : "Facebook", likes : 0, dislikes : 0},
                    {name : "Twitter", likes : 0, dislikes : 0},
                    {name : "WhatsApp", likes : 0, dislikes : 0},
                    {name : "Instagram", likes : 0, dislikes : 0},

                  ];
                  $scope.social = social;
                  $scope.sortClass  = null;


                  $scope.incrementLike = function(fav){
                    console.log(fav.name);
                      //fav.likes++;
                      var index = $scope.social.findIndex(social=>social.name===fav.name);
                      console.log(index);
                    social[index].likes++;
                    console.log("Hello"+social[index].likes);
                  }

                  $scope.incrementDislike = function(fav){
                    console.log("Hello");
                    fav.dislikes++;
                    console.log("Hello");
                  }
                    $scope.social = social;
                    $scope.sortColumn = 'name';
                    $scope.reverseSort = false;

                    $scope.sortData = function(column){
                      $scope.reverseSort = ($scope.sortColumn == column) ? ! $scope.reverseSort : false;
                      $scope.sortColumn = column;
                    }

                    $scope.getSortClass = function (column){
                      if($scope.sortColumn == column){
                        $scope.sortClass =  $scope.reverseSort ? "fa fa-arrow-circle-up" : "fa fa-arrow-circle-down";
                        return $scope.sortClass;
                      }
                      return "";
                    }

                    $scope.scrollTo = function(scrollloc){
                        $anchorScroll.yOffset = 20;
                    $timeout(function() {
                      console.log(scrollloc + "hello");
                      $location.hash(scrollloc);

                      console.log("after hello");
                      $anchorScroll();
                    });
                    }

                    $scope.removeClass = function(){


                        angular.element(document.querySelector('#addItem')).removeClass('is-active');
                    }

                    $scope.addSocial = function(name){
                        var temp = {name : name,likes : 0, dislikes : 0};
                        $scope.social.push(temp);
                        angular.element(document.querySelector('#addItem')).removeClass('is-active');
                    }

                    $scope.logout = function(){
                        $location.path("/admin");
                    }



                });
