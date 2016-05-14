(function () {
    angular
        .module('MovieFanApp')
        .controller('AdminController', AdminController);

    function AdminController($q, UserService) {
        console.log("AdminController");
        vm = this;

        function init() {
            vm.newUser = {"username": "", "password": "", "rules": "", "email": "", "photo": ""};
            vm.loadAllUsers = loadAllUsers;
            vm.createUser = createUser;
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.loadAllUsers();
        }

        init();

        function loadAllUsers() {
            var deferred = $q.defer();

            UserService
                .getProfile()
                .then(function (response) {
                    var curUser = response.data;
                    if (curUser) {
                        UserService.setCurrentUser(curUser);
                        UserService.adminFindAllUsers()
                            .then(function (response) {
                                if (response.data) {
                                    vm.users = response.data;
                                    deferred.resolve();
                                } else {
                                    alert("Load Users Failed");
                                    deferred.reject();
                                }
                            });
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });
            return deferred.promise;
        }

        function createUser() {
            var deferred = $q.defer();
            var createUser = {};
            createUser.username = vm.newUser.username;
            createUser.password = vm.newUser.password;
            createUser.rules = vm.newUser.rules;
            createUser.email = vm.newUser.email;
            createUser.photo = vm.newUser.photo;
            UserService.adminCreateUser(createUser)
                .then(function (response) {
                    if (response.data) {
                        vm.users = response.data;
                        vm.newUser = {"username": "", "password": "", "rules": "", "email": "", "photo": ""};
                        deferred.resolve();
                    } else {
                        alert("Load Users Failed");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function updateUser() {
            var deferred = $q.defer();
            var updateUser = {};
            updateUser.username = vm.newUser.username;
            updateUser.password = vm.newUser.password;
            updateUser.rules = vm.newUser.rules;
            updateUser.email = vm.newUser.email;
            updateUser.photo = vm.newUser.photo;
            UserService.adminUpdateUser(vm.newUser._id, updateUser)
                .then(function (response) {
                    if (response.data) {
                        vm.users = response.data;
                        vm.newUser = {"username": "", "password": "", "rules": "", "email": "", "photo": ""};
                        deferred.resolve();
                    } else {
                        alert("Update User Failed");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function deleteUser(index) {
            var deferred = $q.defer();
            UserService.adminDeleteUserById(vm.users[index]._id)
                .then(function (response) {
                    if (response.data) {
                        vm.users = response.data;
                        vm.newUser = {"username": "", "password": "", "rules": "", "email": "", "photo": ""};
                        deferred.resolve();
                    } else {
                        alert("Delete User Failed");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function selectUser(index) {
            vm.newUser = vm.users[index];
        }
    }
})();

