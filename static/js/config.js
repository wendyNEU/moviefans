(function () {
    var MovieFanApp = angular.module('MovieFanApp');
    MovieFanApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: '/static/views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }*/
                })
                .when('/movie_list', {
                    templateUrl: '/static/views/movielist/movielist.view.html',
                    controller: 'MovieController',
                    controllerAs: 'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                    */
                })
                .when('/movie_detail/:id', {
                    templateUrl: '/static/views/moviedetail/moviedetail.view.html',
                    controller: 'MovieDetailController',
                    controllerAs: 'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                    */
                })
                .when('/tv_list', {
                    templateUrl: '/static/views/tvlist/tvlist.view.html',
                    controller: 'TvController',
                    controllerAs: 'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                    */
                })
                .when('/tv_detail/:id', {
                    templateUrl: '/static/views/tvdetail/tvdetail.view.html',
                    controller: 'TvDetailController',
                    controllerAs: 'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                    */
                })
                .when('/tv_season/:id/:tvname/season/:season_number',{
                    templateUrl: '/static/views/tvseason/tvseason.view.html',
                    controller: 'TvSeasonController',
                    controllerAs:'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                    */
                })
                .when('/actor_list',{
                    templateUrl:'/static/views/actorlist/actorlist.view.html',
                    controller: 'ActorController',
                    controllerAs: 'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                    */
                })
                .when('/actor_detail/:id',{
                    templateUrl:'/static/views/actordetail/actordetail.view.html',
                    controller: 'ActorDetailController',
                    controllerAs: 'model',
                    /*
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                    */
                })
                .when('/register', {
                    templateUrl: '/static/views/register/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'model'
                })
                .when('/login', {
                    templateUrl: '/static/views/login/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'model'
                })
                .when('/admin',{
                    templateUrl: '/static/views/admin/admin.view.html',
                    controller: 'AdminController',
                    controllerAs: 'model'
                })
                .when('/profile', {
                    templateUrl: '/static/views/profile/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model'
                })
                .when('/logout', {
                    templateUrl: '/static/views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        }
    ]);
    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getProfile()
            .then(function(response) {
                var curUser = response.data;
                if(curUser) {
                    UserService.setCurrentUser(curUser);
                    deferred.resolve();
                } else {
                    UserService.setCurrentUser(null);
                    deferred.resolve();
                }
            });
        return deferred.promise;
    }

    MovieFanApp.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**',
            'http://image.tmdb.org/t/p/**',
            'http://api.themoviedb.org/3'
        ]);
    });
})();



