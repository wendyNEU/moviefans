(function() {
    angular.module("MovieFanApp")
        .factory("TvService", TvService);

    function TvService($http, $q) {
        var base = 'http://api.themoviedb.org/3';
        var apiKey = 'a2ba7e66f0a9510643003d8fb4fae3f0';

        var api = {
            getAllTvs : getAllTvs,
            getTvById : getTvById,
            getTvVideoById : getTvVideoById,
            getTvSeason:getTvSeason,
            searchTVByTitle: searchTVByTitle,
            findPopularTV:findPopularTV,
            findTopRateTV:findTopRateTV,
            findTvOnAir:findTvOnAir,
            findTvOnAirToday:findTvOnAirToday

        };
        return api;

        function searchTVByTitle(title,page){
            var deferred = $q.defer();
            var service = '/search/tv';
            var url = base + service + '?query='+title+'&api_key=' + apiKey+'&page='+page;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findPopularTV(page){
            var deferred = $q.defer();
            var service = '/tv/popular';
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

        function findTopRateTV(page){
            var deferred = $q.defer();
            var service = '/tv/top_rated';
            var url = base + service + '?&api_key=' + apiKey+'&page='+page;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findTvOnAir(page){
            var deferred = $q.defer();
            var service = '/tv/on_the_air';
            var url = base + service + '?&api_key=' + apiKey+'&page='+page;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findTvOnAirToday(page){
            var deferred = $q.defer();
            var service = '/tv/airing_today';
            var url = base + service + '?&api_key=' + apiKey+'&page='+page;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getAllTvs(page){
            return searchTVByTitle('*',page);
        }

        function getTvById(id){
            var deferred = $q.defer();
            var service = '/tv/';
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

        function getTvVideoById(id){
            var deferred = $q.defer();
            var service = '/tv/';
            var url = base + service + id + '/videos?api_key=' + apiKey;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getTvSeason(id,season_number){
            var deferred = $q.defer();
            var service = '/tv/';
            var url = base + service + id + '/season/'+season_number+'?api_key=' + apiKey;
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
