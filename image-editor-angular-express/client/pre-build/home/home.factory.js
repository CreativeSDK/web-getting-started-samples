app.factory('HomeFactory', function($http) {
	return {
		getCreativeSdkApiKey: function() {
			return $http.get('/api/auth/creativesdk')
				.then(function(res) {
					console.log(res.data);
					return res.data;
				});
		}
	}
});