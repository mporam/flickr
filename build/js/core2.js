var app = angular.module('flickrFeed', []);

function flickrCtrl($scope, $http) {

    $scope.photos = [];

    $scope.loadData = function() {
        return $http.get("http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=?");
    };

    $scope.loadData().success(function(data) {
    	$scope.photos = data.items;
    }).error(function(data, status) {
		
    });

}