app.factory('HomeFactory', function($http) {
	return {
		getCreativeSdkApiKey: function() {
			return $http.get('/api/auth/creativesdkKey')
				.then(function(res) {
					return res.data;
				});
		}
	}
});