angular.module('app', [
	'app.services'
])

.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
})

.controller('WikiController', function($scope, Wiki) {
	$scope.data = {}

	$scope.getDateLinks = function(string) {
		// instead split at '\n*'? that gives each bullet
		// need to label, event, birth, death, holiday
		$scope.data.categories = string.split('n==')
		console.log($scope.data.categories)
		$scope.data.text = [];
		for(var i = 0; i < $scope.data.categories.length; i++) {
			$scope.data.text[i] = $scope.data.categories[i].split('\\n*')
		}

		// console.log($scope.data.text)
		$scope.data.formatted = [];
		$scope.data.text.shift()
		for( var j = 0; j < $scope.data.text.length; j++) {
			var section = $scope.data.text[j];
			// get indiv categories from each section of page
			var category = section.shift()
			var split = category.split('==')
			category = split[0]
			console.log(category)

			for( var k = 0; k < section.length; k++){
				var entry = section[k];
				// get indiv year for each entry
				var year, year1, yearStartIndex, yearEndIndex;

				//check to see if the year has brackets around it
				if(entry.indexOf('[') < 10){

					// find start and end brackets around year, create string based on those bracket positions
					yearStartIndex = entry.indexOf('[')+2
					yearEndIndex = entry.indexOf(']')
					year = entry.substring(yearStartIndex, yearEndIndex);
				}
				else {
					yearEndIndex = entry.indexOf('&') -1
					year1 = entry.substring(0, yearEndIndex);
				}

				// get text for each entry
				// find where '&ndash;' end index is
				var textStartIndex = entry.indexOf('&ndash;') + 8;

				// store this as raw text so we can get the links from it later
				var rawText = entry.substring(textStartIndex)

				var links = rawText.split('[[')
				// console.log(links)
				//slice from end at index of ]]
				for (var l = 0; l < links.length; l++) {
					var linksEndIndex = links[l].indexOf(']')
					links[l] = link.substr(0, linksEndIndex)
				}
				links.push(year)

				var indivEntry = {
					category: category,
					year: year,
					text: rawText,
					links: links
				}
				console.log(indivEntry)
				$scope.data.formatted.push(indivEntry)
			}
		}
		// console.log($scope.data.formatted)
		// take the label in the 0 position, cut off the excess '==\' to end. then need to make an object out of each data. have event, text, date, category
	}

	$scope.getDateData = function(date) {
		Wiki.wikiData(date)
			.then(function(data) {
				$scope.data.rawData = data;
				console.log(typeof $scope.data.rawData)
				// $scope.data.dataString = JSON.stringify(data);
				$scope.getDateLinks($scope.data.rawData)

			})
			.catch(function(error){
        console.error(error);
      });
	};


	$scope.getDateData('August 18')

})
