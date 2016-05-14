(function () {
    angular
        .module('MovieFanApp')
        .controller('ActorController', ActorController);

    function ActorController(ActorService, $route) {
        console.log("ActorController");

        var vm = this;

        function init() {
            vm.$route = $route;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size = '/w185';
            vm.keyword = "";
            vm.Filters = [
                {"value":"popular","label":"Popular"},
                {"value":"search","label":"Search"}
            ];
            vm.page = 1;
            vm.filtervalue = 'popular';
            vm.selectedfilter = vm.Filters[0];
            vm.actorlist = [];
            vm.getPopular = getPopular;
            vm.veriPosterImg = veriPosterImg;
            vm.searchActor = searchActor;
            vm.changefilter = changefilter;
            vm.changePage = changePage;
            vm.getPopular();
        }
        init();

        function getPopular(){
            ActorService.findPopularPerson(vm.page)
                .then(function (resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
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

        function searchActor() {
            ActorService.searchPersonByName(vm.keyword, vm.page)
                .then(function (resp) {
                    if (resp === undefined || resp==null || resp.length === 0) {
                        vm.page = vm.page - 1;
                        alert("Not more item");
                    } else {
                        vm.selectedfilter = vm.Filters[1];
                        vm.actorlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.actorlist[i].profile_path != null && vm.actorlist[i].profile_path !== '')
                                vm.actorlist[i].profile_path = vm.image_base_url + vm.poster_size + vm.actorlist[i].profile_path;
                        }
                    }
                });
        }

        function veriPosterImg(imageurl) {
            if (imageurl == undefined || imageurl === null) {
                return './images/Nophoto.jpg';
            } else {
                return imageurl;
            }
        }

        function changefilter(filtervalue){
            vm.page = 1;
            vm.filtervalue = filtervalue.value;
            if(filtervalue.value=='popular'){
                vm.getPopular();
            }else{
                vm.searchActor();
            }
        }

        function changePage(page){
            vm.page = page;
            if(vm.filtervalue=='popular'){
                vm.getPopular();
            }else{
                vm.searchActor();
            }
        }
    }

})();

