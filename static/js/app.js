/*
angular.module("getbookmarks.services", ["ngResource"]).
    factory('Story', function ($resource) {
        var Story = $resource('/api/v1/stories/:storyId', {storyId: '@id'});
        Story.prototype.isNew = function(){
            return (typeof(this.id) === 'undefined');
        }
        return Story;
    });

angular.module("getbookmarks", ["getbookmarks.services"]).
    config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/static/views/stories/list.html', controller: StoryListController})
            .when('/stories/new', {templateUrl: '/static/views/stories/create.html', controller: StoryCreateController})
            .when('/stories/:storyId', {templateUrl: '/static/views/stories/detail.html', controller: StoryDetailController});
    });

function StoryListController($scope, Story) {
    $scope.stories = Story.query();
    
}

function StoryCreateController($scope, $routeParams, $location, Story) {

    $scope.story = new Story();

    $scope.save = function () {
    	$scope.story.$save(function (story, headers) {
    		toastr.success("Submitted New Story");
            $location.path('/');
        });
    };
}


function StoryDetailController($scope, $routeParams, $location, Story) {
    var storyId = $routeParams.storyId;
    
    $scope.story = Story.get({storyId: storyId});

}*/

(function($, document, window){

	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
		$(".search-form button").click(function(){
			$(this).toggleClass("active");
			var $parent = $(this).parent(".search-form");

			$parent.find("input").toggleClass("active").focus();
		});


		$(".slider").flexslider({
			controlNav: false,
			prevText:'<i class="fa fa-chevron-left"></i>',
			nextText:'<i class="fa fa-chevron-right"></i>',
		});
		if( $(".map").length ) {
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14
					}
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );

	    }
	});

	$(window).load(function(){

	});

	angular
		.module('MovieFanApp',['ngRoute']);

})(jQuery, document, window);
