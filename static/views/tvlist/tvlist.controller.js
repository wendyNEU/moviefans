(function(){
    angular
        .module('MovieFanApp')
        .controller('TvController', TvController);

    function TvController(TvService,$route){
        console.log("TvController");
        var vm = this;

        function init() {
            vm.$route = $route;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w300';
            vm.keyword = "";
            vm.Filters = [
                {"value":"popular","label":"Popular"},
                {"value":"toprate","label":"Top Rate"},
                {"value":"onair","label":"On Air"},
                {"value":"airtoday","label":"Air Today"},
                {"value":"search","label":"Search"}
            ];
            vm.page = 1;
            vm.filtervalue = 'popular';
            vm.selectedfilter = vm.Filters[0];
            vm.tvlist = [];
            vm.getPopular = getPopular;
            vm.getTopRate = getTopRate;
            vm.getAirToday = getAirToday;
            vm.getOnAir = getOnAir;
            vm.veriPosterImg = veriPosterImg;
            vm.searchTV = searchTV;
            vm.changefilter = changefilter;
            vm.changePage = changePage;
            vm.getPopular();
        }
        init();

        function getPopular(){
            TvService.findPopularTV(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
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

        function getTopRate(){
            TvService.findTopRateTV(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
                        }
                    }
                });
        }

        function getOnAir(){
            TvService.findTvOnAir(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
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

        function getAirToday(){
            TvService.findTvOnAirToday(vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
                        }
                    }
                });
        }
        function searchTV(){
            TvService.searchTVByTitle(vm.keyword,vm.page)
                .then(function(resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.selectedfilter = vm.Filters[4];
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
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
            }else if(filtervalue.value=='onair'){
                vm.getOnAir();
            }else if(filtervalue.value=='airtoday'){
                vm.getAirToday();
            }else{
                vm.searchTV();
            }
        }

        function changePage(page){
            vm.page = page;
            if(vm.filtervalue=='popular'){
                vm.getPopular();
            }else if(vm.filtervalue=='toprate'){
                vm.getTopRate();
            }else if(vm.filtervalue=='onair'){
                vm.getOnAir();
            }else if(vm.filtervalue=='airtoday'){
                vm.getAirToday();
            }else{
                vm.searchTV();
            }
        }
    }
})();
