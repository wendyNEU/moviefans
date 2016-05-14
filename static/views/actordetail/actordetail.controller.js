(function(){
    angular
        .module('MovieFanApp')
        .controller('ActorDetailController', ActorDetailController);

    function ActorDetailController($routeParams,ActorService,CommentService,UserService){
        console.log("ActorDetailController");

        var vm = this;

        function init(){
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w300';
            vm.currentActiveComment = -1;
            vm.commenttext = '';
            vm.subcommenttext ='';
            vm.getActorById = getActorById;
            vm.veriPosterImg = veriPosterImg;
            vm.getCommentSet = getCommentSet;
            vm.addComment = addComment;
            vm.addSubComment = addSubComment;
            vm.deleteComment = deleteComment;
            vm.deleteSubComment = deleteSubComment;
            vm.authPower = authPower;
            vm.activeCommentWell = activeCommentWell;
            vm.isCommentWellActive = isCommentWellActive;
            vm.islogin = islogin;
            vm.loadLike = loadLike;
            vm.like = like;
            vm.unlike = unlike;
            vm.arrayToString = arrayToString;
            vm.getActorById($routeParams.id);
        }

        init();

        function getActorById(id){
            ActorService.getActorById(id).then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else {
                    vm.actor = resp;
                    if(!(vm.actor.profile_path===undefined||vm.actor.profile_path===''))
                        vm.actor.profile_path = vm.image_base_url + vm.poster_size + vm.actor.profile_path;
                    vm.getCommentSet();
                    vm.loadLike();
                }
            });
        }
        function getCommentSet(){
            CommentService.getCommentSet('actor',vm.actor.id).then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else {
                    vm.commentSet = resp.data;
                }
            });
        }

        function addComment(){
            var user = UserService.getCurrentUser();
            var comment =
            {
                "text":vm.commenttext,
                "user_id" :user._id,
                "username":user.username,
                "date":(new Date).toString(),
                "subcomments":[]
            };
            CommentService.createComment('actor',vm.actor.id,comment).then(function(resp){
                if (resp === undefined) {
                    alert("Create Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Comment Fail");
                } else {
                    vm.commenttext ='';
                    vm.commentSet = resp.data;
                }
            });
        }

        function addSubComment(index){
            var user = UserService.getCurrentUser();
            var subcomment =
            {
                "text":vm.subcommenttext,
                "user_id" :user._id,
                "username":user.username,
                "date":(new Date).toString()
            };
            CommentService.createSubComment('actor',vm.actor.id,vm.commentSet.comments[index]._id, subcomment).then(function(resp){
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments[index].subcomments = resp.data;
                }
            });
        }

        function deleteComment(comment_id){
            CommentService.deleteComment('actor',vm.commentSet.tviso_id,comment_id).then(function(resp){
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments = resp.data;
                }
            });
        }

        function deleteSubComment(comment_id, subcomment_id){
            CommentService.deleteSubComment('actor',vm.actor.id,comment_id,subcomment_id).then(function(resp) {
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments=resp.data;
                }
            });
        }

        function authPower(user_id){
            var user = UserService.getCurrentUser();
            return user!=undefined&&user!=null&&(user._id==user_id||user.rules=='admin');
        }

        function activeCommentWell(index){
            if(vm.currentActiveComment==index){
                vm.currentActiveComment = -1;
            }else {
                vm.currentActiveComment = index;
            }
        }

        function isCommentWellActive(index){
            return index == vm.currentActiveComment;
        }

        function islogin(){
            return UserService.islogin();
        }

        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return '/static/images/Nophoto.jpg';
            }else{
                return imageurl;
            }
        }

        function loadLike(){
            UserService.getProfile().then(function(resp){
                if (resp === undefined) {
                    alert("Get Current User Fail");
                } else if (resp.length === 0) {
                    alert("Get Current User Fail");
                } else {
                    var user = resp.data;
                    vm.likeitem = false;
                    for(var i in user.like){
                        if(user.like[i].tviso_id==vm.actor.id&&user.like[i].type=='actor'){
                            vm.likeitem = true;
                            break;
                        }
                    }
                }
            });
        }

        function like(){
            UserService.getProfile().then(function(resp){
                if (resp === undefined) {
                    alert("Get Current User Fail");
                } else if (resp.length === 0) {
                    alert("Get Current User Fail");
                } else {
                    UserService.like('actor',vm.actor.id).then(function(resp){
                        if (resp === undefined) {
                            alert("Like Movie Fail");
                        } else if (resp.length === 0) {
                            alert("Like Movie Fail");
                        } else {
                            vm.likeitem=false;
                            for(var i in resp.data){
                                if(resp.data[i].tviso_id==vm.actor.id&&resp.data[i].type=="actor"){
                                    vm.likeitem = true;
                                }
                            }
                        }
                    });
                }
            });

        }

        function unlike(){
            UserService.getProfile().then(function(resp){
                if (resp === undefined) {
                    alert("Get Current User Fail");
                } else if (resp.length === 0) {
                    alert("Get Current User Fail");
                } else {
                    UserService.unlike('actor',vm.actor.id).then(function(resp){
                        if (resp === undefined) {
                            alert("UnLike Movie Fail");
                        } else if (resp.length === 0) {
                            alert("UnLike Movie Fail");
                        } else {
                            vm.likeitem=false;
                            for(var i in resp.data){
                                if(resp.data[i].tviso_id==vm.actor.id&&resp.data[i].type=="actor"){
                                    vm.likeitem = true;
                                }
                            }
                        }
                    });
                }
            });
        }

        function arrayToString(arr){
            var str = "";
            for(var i in arr){
                str = str+arr[i]+" | ";
            }
            return str.substring(0,str.length-2);
        }

    }
})();
