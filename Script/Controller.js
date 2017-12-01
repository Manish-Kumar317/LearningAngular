var app = angular.module("myApp",['ui.router'])
                 .config(function($stateProvider, $urlMatcherFactoryProvider, $locationProvider){

                     // $locationProvider.html5Mode(true);
                     // $urlRouterProvider.otherwise({
                     //     alert("The page requested does not exist. Redirecting to home page");
                     //     redirectTo : '/home'
                     // }'/home');
                     $urlMatcherFactoryProvider.caseInsensitive(true);

                   $stateProvider
                     .state('home',{

                     url : "/home" ,
                     templateUrl : "./home.html",
                     controller : "myController"
                     })
                       .state('survey',{
                           url : '/survey',
                           templateUrl : "./survey.html",
                           controller : "myController"
                       })
                       .state('admin',{
                           url : '/admin',
                           templateUrl : "./admin.html"


                       })
                       .state('adminDetails',{
                           url : '/admin/:username/:pass',
                           templateUrl : "./admin.html",
                           controller : "adminController"

                       })
                       .state('insert',{
                           url : "/insert",
                           templateUrl : "./insert.html",
                           controller : "myController"

                       })

                       .state("otherwise", {
                           url: "/*path",
                           templateUrl: "./home.html",
                           controller : "otherwiseController"
                       })

                       .state('default', {
                           url:'',
                         templateUrl: './home.html'

                       })


                     // $locationProvider.html5Mode({
                     //     enabled : true,
                     //     // requireBase : false
                     // });
                 })
    .controller("adminController",function($scope, $stateParams,$location){


             if($stateParams.username==="admin"&& $stateParams.pass==="admin")
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



                })
                .controller('otherwiseController',function($location) {
                    alert("The requested page does not exist. You are being redirected to homepage");
                    $location.path('/home');

                })

