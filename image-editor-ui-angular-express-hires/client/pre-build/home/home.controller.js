app.controller('HomeController', function($scope, $http, HomeFactory) {
  
  	// Image editor data
	$scope.imageId = "editable-image";
	$scope.imageEditor;

	// Image data
	// Note: the image _must_ be a publicly accessible image
	$scope.originalImageSrc = "https://upload.wikimedia.org/wikipedia/commons/3/38/Sakurajima_1902_survey.jpg";
	$scope.currentImageSrc = $scope.originalImageSrc;

	$scope.$on('$stateChangeSuccess', function() {
		$scope.getImageEditor();
	});

  	$scope.getImageEditor = function() {
  		HomeFactory.getCreativeSdkApiKey()
  			.then(function(key) {
  				$scope.imageEditor = new Aviary.Feather({
  					apiKey: key,
  					authenticationURL: "/api/auth/creativesdkAuthObj",
  					onSaveButtonClicked: function() {
  						$scope.imageEditor.saveHiRes();
  						return false;
  					},
  					onSaveHiRes: function(imageID, newURL) {
			            $scope.currentImageSrc = newURL;
			            $scope.imageEditor.close();
			            $scope.$digest();
			            console.log(newURL);
			        },
			        onError: function(errorObj) {
			            console.log(errorObj.code);
			            console.log(errorObj.message);
			            console.log(errorObj.args);
			        }
  				})
  			});
  	}

  	$scope.launchEditor = function() {

  		// Note: _both_ `url` and `hiresUrl` must be present.
		$scope.imageEditor.launch({
			image: $scope.imageId,
			url: $scope.currentImageSrc,
			hiresUrl: $scope.currentImageSrc
		});
	}

	$scope.resetImage = function() {
		if ($scope.currentImageSrc === $scope.originalImageSrc) {
			alert("Nothing to reset.");
		}
		else {
			$scope.currentImageSrc = $scope.originalImageSrc;
		}
	}

});