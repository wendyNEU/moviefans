(function() {
    angular
        .module('MovieFanApp')
        .controller('LoginController', LoginController);

    function LoginController($location, UserService) {
        console.log("LoginController");
        var vm = this;

        function init() {
            vm.login = login;
            vm.user = {"username": "", "password": ""};
        }

        init();

        function login() {
            if (vm.user.username&&vm.user.password){
                UserService.login(vm.user)
                    .then(function (response) {
                        if (response.data == null) {
                            alert("login fail");
                        } else {
                            vm.user = response.data;
                            $location.path('/profile');
                        }
                    })
            }else {
                alert("Input ");
            }
        }
    }
})();
