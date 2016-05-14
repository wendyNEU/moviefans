(function(){
    angular
        .module('MovieFanApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($location,UserService){
        console.log("RegisterController");
        var vm = this;

        function init(){
            vm.register = register;
            vm.user = { "username":"", "password":"","veripassword":"","email":""};
        }
        init();

        function register(){
            if(vm.user.password==vm.user.veripassword){
                var registerUser = {};
                registerUser.username = vm.user.username;
                registerUser.password = vm.user.password;
                registerUser.email = vm.user.email;
                UserService.register(registerUser)
                    .then(function (response) {
                        var currentUser = response.data;
                        if (currentUser != null) {
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }
                    });
            }else {
                alert("Password doesn't match");
            }
        }
    }
})();