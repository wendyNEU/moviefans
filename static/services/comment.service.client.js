(function() {
    angular.module("MovieFanApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var api = {
            getCommentSet:getCommentSet,
            createComment:createComment,
            createSubComment:createSubComment,
            deleteComment:deleteComment,
            deleteSubComment:deleteSubComment
        };
        return api;

        function getCommentSet(type,tviso_id){
            return $http.get("/api/project/comment/"+type+"/"+tviso_id);
        }

        function createComment(type,tviso_id,comment){
            return $http.post("/api/project/comment/"+type+"/"+tviso_id,comment);
        }

        function createSubComment(type,tviso_id,comment_id,subcomment){
            return $http.post("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id,subcomment);
        }

        function deleteComment(type,tviso_id,comment_id){
            return $http.delete("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id);
        }

        function deleteSubComment(type,tviso_id,comment_id,subcomment_id){
            return $http.delete("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id+"/subcomment/"+subcomment_id);
        }
    }
})();

