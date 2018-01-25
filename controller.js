angular.module('myApp', [])
.controller('appController', function($scope, $log) {
	var jquery = $;
	$.getJSON("https://spreadsheets.google.com/feeds/list/1LUE00y5QwLVJAgEm2azkiyp75Bc38NVBwkPbN8kEN0U/od6/public/values?alt=json", function(data) {
		var rawData = data.feed.entry;
		$log.log(rawData);

		$log.log(rawData[0]);
		$scope.data = [];
		for (var rawIndex in rawData) {
			var rawRow = rawData[rawIndex];
			var processedRow = {albumid:rawRow.gsx$albumid.$t, mainartist:rawRow.gsx$mainartist.$t, violinist:rawRow.gsx$violin.$t, mridangist:rawRow.gsx$mridangist.$t};
			$scope.$apply( function() {
				$scope.data.push(processedRow);
			});
		}
	});
	
	$scope.tab = 0;
	$scope.krithiSortType = "albumid";
	$scope.krithiSortReverse = false;
	
})
.directive("trackList", function() {
	return {
		templateUrl: "trackListTemplate.html"
	};
})
.directive("albums", function() {
	return {
		templateUrl: "albumsTemplate.html"
	}
})
.directive("playlist", function() {
	return {
		templateUrl: "playlistTemplate.html"
	}
});
