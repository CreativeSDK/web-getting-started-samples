app.controller('HomeController', function($scope, $http, HomeFactory) {
  
  	// Image editor data
	$scope.imageId = "editable-image";
	$scope.imageEditor;

	// Image data
	$scope.originalImageSrc = "kyoto.jpg";
	$scope.currentImageSrc = $scope.originalImageSrc;

	$scope.getCreativeSdkApiKey = function() {
  		HomeFactory.getCreativeSdkApiKey()
  			.then(function(key) {
  				$scope.key = key;
  			});
  	}

	$scope.getCreativeSdkApiKey();

});