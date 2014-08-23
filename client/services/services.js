angular.module('app.services', [])

.factory('Wiki', function($http) {
	// var wikiLogin = function() {
	// 	return $http({
	// 		method: 'POST',
	// 		url: 'http://en.wikipedia.org/w/api.php?action=login&lgname=historyapp&lgpassword=historyiscool',

	// 	}).then(function(resp){
	// 		return resp
	// 	})
	// }

	var wikiData = function(date) {
		return $http.jsonp(
			'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=August%2018&prop=revisions&rvprop=content&callback=JSON_CALLBACK')
		.then(function(resp) {
			console.log('resp',resp)
			var data = JSON.stringify(resp.data.query.pages)
			return data
		})
	}

	var wikiResponse = function(data){
		return data;
	}

	return {
		// wikiLogin : wikiLogin,
		wikiData: wikiData
	}
})