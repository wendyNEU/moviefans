(function() {
    angular.module("MovieFanApp")
        .factory("ActorService", ActorService);

    function ActorService($http, $q) {
        var base = 'http://api.themoviedb.org/3';
        var apiKey = 'a2ba7e66f0a9510643003d8fb4fae3f0';

        var api = {
            getAllActors : getAllActors,
            getActorById : getActorById,
            findPopularPerson: findPopularPerson,
            searchPersonByName: searchPersonByName
        };
        return api;

        function searchPersonByName(name,page){
            var deferred = $q.defer();
            var service = '/search/person';
            var url = base + service + '?api_key=' + apiKey+'&&query='+name+'&&page='+page;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findPopularPerson(page){
            var deferred = $q.defer();
            var service = '/person/popular';
            var url = base + service + '?api_key=' + apiKey+'&page='+page;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getAllActors(){
            var deferred = $q.defer();
            var service = '/person/popular';
            var url = base + service + '?api_key=' + apiKey;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getActorById(id){
            var deferred = $q.defer();
            var service = '/person/';
            var url = base + service + id + '?api_key=' + apiKey;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

    }
})();

