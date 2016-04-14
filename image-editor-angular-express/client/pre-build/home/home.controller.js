app.controller('HomeController', function($scope, $http, HomeFactory) {
  
  	// Image editor data
	$scope.imageId = "editable-image";
	$scope.imageEditor;

	// Image data
	$scope.originalImageSrc = "kyoto.jpg";
	$scope.currentImageSrc = $scope.originalImageSrc;

	$scope.$on('$stateChangeSuccess', function() {
		$scope.getImageEditor();
	});


	$scope.getCreativeSdkApiKey = function() {
  		HomeFactory.getCreativeSdkApiKey()
  			.then(function(key) {
  				$scope.key = key;
  			});
  	}

  	$scope.getImageEditor = function() {
  		HomeFactory.getCreativeSdkApiKey()
  			.then(function(key) {
  				$scope.imageEditor = new Aviary.Feather({
  					apiKey: key,
  					onSave: function(imageID, newURL) {
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

		var terms = /^https?:///;
		var isUrl = $scope.currentImageSrc.match(terms);
		
		if (isUrl) {
			$scope.imageEditor.launch({
				image: $scope.imageId,
				url: $scope.currentImageSrc
			});
		}
		else {
			$scope.imageEditor.launch({
				image: $scope.imageId
			});
		}
	}

});