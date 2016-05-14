(function(){
    angular
        .module('MovieFanApp')
        .controller('HomeController', HomeController);
    function HomeController(MovieService,TvService,ActorService){
        console.log("HomeController");
        vm = this;
        function init(){
            vm.getPopularMovie = getPopularMovie;
            vm.getPopularTV = getPopularTV;
            vm.getPopularActor = getPopularActor;
            vm.getPopularMovie();
            vm.getPopularActor();
            vm.getPopularTV();
        }

        init();

        function getPopularMovie(){
            MovieService.findPopularMovie(1)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        alert("Not more item");
                    } else {
                        vm.movielist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function getPopularTV(){
            TvService.findPopularTV(1)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        alert("Not more item");
                    }  else {
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
                        }
                    }
                });
        }

        function getPopularActor(){
            ActorService.findPopularPerson(1)
                .then(function (resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        alert("Not more item");
                    } else {
                        vm.actorlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.actorlist[i].profile_path != null && vm.actorlist[i].profile_path !== '')
                                vm.actorlist[i].profile_path = vm.image_base_url + vm.poster_size + vm.actorlist[i].profile_path;
                        }
                    }
                });
        }
    }
})();

