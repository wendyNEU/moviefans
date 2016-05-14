(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieController', MovieController);

    function MovieController(MovieService,$route,$location,$routeParams){
        console.log("MovieController");

        var vm = this;

        function init() {
            vm.$route = $route;
            vm.$location = $location;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
            vm.keyword = "";
            vm.page = 1;
            vm.filtervalue = 'popular';
            vm.veriPosterImg = veriPosterImg;
            vm.getPopular = getPopular;
            vm.getTopRate = getTopRate;
            vm.getNowPlaying = getNowPlaying;
            vm.getUpcoming = getUpcoming;
            vm.searchMovie = searchMovie;
            vm.changefilter = changefilter;
            vm.changePage = changePage;
            vm.Filters = [
                {"value":"popular","label":"Popular"},
                {"value":"toprate","label":"Top Rate"},
                {"value":"nowplaying","label":"Now Playing"},
                {"value":"upcoming","label":"Upcoming"},
                {"value":"search","label":"Search"}
            ];
            vm.selectedfilter = vm.Filters[0];
            vm.movielist = [];
            vm.getPopular();
        }
        init();

        function getPopular(){
            MovieService.findPopularMovie(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function getTopRate(){
            MovieService.findTopRateMovie(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function getNowPlaying(){
            MovieService.findMovieNowPlaying(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function getUpcoming() {
            MovieService.findMovieUpcoming(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }


        function searchMovie(){
            MovieService.searchMoviesByTitle(vm.keyword,vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.selectedfilter = vm.Filters[4];
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return '/static/images/noposter.png';
            }else{
                return imageurl;
            }
        }

        function changefilter(filtervalue){
            vm.page = 1;
            vm.filtervalue = filtervalue.value;
            if(filtervalue.value=='popular'){
                vm.getPopular();
            }else if(filtervalue.value=='toprate'){
                vm.getTopRate();
            }else if(filtervalue.value=='nowplaying'){
                vm.getNowPlaying();
            }else if(filtervalue.value=='upcoming'){
                vm.getUpcoming();
            }else{
                vm.searchMovie();
            }
        }

        function changePage(page){
            vm.page = page;
            if(vm.filtervalue=='popular'){
                vm.getPopular();
            }else if(vm.filtervalue=='toprate'){
                vm.getTopRate();
            }else if(vm.filtervaluee=='nowplaying'){
                vm.getNowPlaying();
            }else if(vm.filtervalue=='upcoming'){
                vm.getUpcoming();
            }else{
                vm.searchMovie();
            }
        }

    }
})();
