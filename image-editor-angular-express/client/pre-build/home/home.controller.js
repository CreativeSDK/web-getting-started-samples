app.controller('HomeController', function($scope, $http, HomeFactory) {
  
  $scope.msgFromScope = "...And I'm a message from the HomeController scope, just so you know that I work!";

  $scope.getCreativeSdkApiKey = function() {
  	HomeFactory.getCreativeSdkApiKey()
  		.then(function(key) {
  			$scope.key = key;
  		});
  }

  $scope.getCreativeSdkApiKey();

});