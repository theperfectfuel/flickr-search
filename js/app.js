var flickrApp = angular.module('flickrApp', []);

flickrApp.controller('flickrCtrl', function($scope, $http, $q, $timeout) {
	$scope.message = "Flickr Tag Search";
	$scope.search_tag = "";
	$scope.imgFound = false;
	$scope.errorFound = false;

	// Get flickr photos from API based on tag

	function wait() {
		var defer = $q.defer();
		$timeout(function() {
			defer.resolve();
		}, 2000);
		return defer.promise;
	}

	$scope.getImages = function() {

		var url = "https://api.flickr.com/services/rest";
		var myParams = {
			method: 'flickr.photos.search',
		    api_key: '110d67ce6a140d760c68627837a0238b',
		    tags: $scope.search_tag,
		    format: 'json',
		    nojsoncallback: 1
		};

		$http({
			url: url,
			params: myParams
		})
		.then(function(response) {
			$scope.imgFound = false;
			$scope.searching = true;
			wait().then(function() {
				$scope.searching = false;
				$scope.imgFound = true;
			})
			$scope.photos = response.data.photos.photo;
			$scope.numImages = $scope.photos.length;
			$scope.search_msg = $scope.search_tag;
			$scope.search_tag = "";
		});
	};

});