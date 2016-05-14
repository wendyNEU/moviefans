(function () {
    angular
        .module("MovieFanApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        return {
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            adminFindAllUsers: adminFindAllUsers,
            adminCreateUser: adminCreateUser,
            adminUpdateUser:adminUpdateUser,
            adminDeleteUserById: adminDeleteUserById,
            updateUser: updateUser,
            getProfile:getProfile,
            islogin:islogin,
            isAdmin:isAdmin,
            like: like,
            unlike:unlike,
            register:register,
            login:login,
            //more functions
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        }

        //return userApi;

        function getProfile(){
            return $http.get("/api/project/loggedin");
        }

        function register(user){
            return $http.post('/api/project/register',user);
        }

        function login(credential){
            return $http.post("/api/assignment/login",credential);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/"+userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function adminFindAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function adminCreateUser(user) {
            return $http.post("/api/project/admin/user",user);
        }

        function adminDeleteUserById(userId){
            return $http.delete("/api/project/admin/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/"+userId,user);
        }

        function adminUpdateUser(userId, user) {
            return $http.put("/api/project/admin/user/"+userId,user);
        }

        function like(type,tviso_id){
            return $http.post("/api/project/user/like",{"tviso_id":tviso_id,"type":type});
        }

        function unlike(type,tviso_id){
            return $http.delete("/api/project/user/unlike/"+type+"/"+tviso_id);
        }

        function setCurrentUser(user) {
            $rootScope.curUser = user;
            $rootScope.$broadcast("setCurrentUser");
        }

        function getCurrentUser() {
            return $rootScope.curUser;
        }

        function logout() {
            var curuser = jQuery.extend(true, {}, $rootScope.curUser);
            $rootScope.curUser = null;
            return $http.post("/api/assignment/logout",curuser);
        }

        function islogin(){
            if($rootScope.curUser==undefined||$rootScope.curUser==null){
                return false;
            }else{
                return true;
            }
        }

        function isAdmin(){
            if(islogin()&&$rootScope.curUser.rules!=undefined&&$rootScope.curUser.rules=="admin"){
                return true;
            }else{
                return false;
            }
        }

    }
})();