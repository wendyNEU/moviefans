(function(){
    angular
        .module('MovieFanApp')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService,$q){
        console.log("ProfileController");
        var vm = this;

        function init() {
            vm.uploadPhoto = '';
            var deferred = $q.defer();

            UserService
                .getProfile()
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        UserService.setCurrentUser(curUser);
                        vm.user = curUser;
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });
            vm.update = update;
        }
        init();

        function update(){
            var deferred = $q.defer();
            var updateUser = jQuery.extend({}, vm.user);
            if(updateUser.hasOwnProperty('_id')){
                delete updateUser._id;
            }
            UserService
                .updateUser(vm.user._id,updateUser)
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        UserService.setCurrentUser(curUser);
                        vm.user = curUser;
                        deferred.resolve();
                    } else {
                        alert("Update Profile Failed");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

    }
})();