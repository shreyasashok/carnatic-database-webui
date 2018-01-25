angular.module('myApp', [])
.controller('appController', function($scope, $log) {
	var jquery = $;
	$.getJSON("https://spreadsheets.google.com/feeds/list/1LUE00y5QwLVJAgEm2azkiyp75Bc38NVBwkPbN8kEN0U/1/public/values?alt=json", function(data) {
		var rawData = data.feed.entry;
		$log.log(rawData);

		$log.log(rawData[0]);
		$scope.albumData = [];
		for (var rawIndex in rawData) {
			var rawRow = rawData[rawIndex];
			var processedRow = {albumid:rawRow.gsx$albumid.$t, mainartist:rawRow.gsx$mainartist.$t, violinist:rawRow.gsx$violin.$t, mridangist:rawRow.gsx$mridangist.$t};
			$scope.$apply( function() {
				$scope.albumData.push(processedRow);
			});
		}
	});
	$.getJSON("https://spreadsheets.google.com/feeds/list/1LUE00y5QwLVJAgEm2azkiyp75Bc38NVBwkPbN8kEN0U/2/public/values?alt=json", function(data) {
		var rawData = data.feed.entry;
		$log.log(rawData);

		$log.log(rawData[0]);
		$scope.krithiData = [];
		for (var rawIndex in rawData) {
			var rawRow = rawData[rawIndex];
			var processedRow = {songtitle:rawRow.gsx$songtitle.$t, albumid:rawRow.gsx$albumid.$t, tracknumber:rawRow.gsx$tracknumber.$t};
			$scope.$apply( function() {
				$scope.krithiData.push(processedRow);
			});
		}
	});

	$scope.tab = 0;

	$scope.krithiSearch = {};
	$scope.albumSearch = {};
	$scope.krithiSortType = "songtitle";
	$scope.krithiSortReverse = false;
	$scope.albumSortType = "albumid";
	$scope.albumSortReverse = false;

	$scope.logFunction = function($print) {
		$log.log($print);
	};

	$scope.clearKrithiSearch = function() {
		$scope.krithiSearch.songtitle = "";
		$scope.krithiSearch.albumid = "";
		$scope.krithiSearch.tracknumber = "";
	}

	$scope.clearAlbumSearch = function() {
		$scope.albumSearch.albumid = "";
		$scope.albumSearch.mainartist = "";
		$scope.albumSearch.violinist = "";
		$scope.albumSearch.mridangist = "";
	}
	$scope.accessAlbum = function($albumid) {
		$scope.krithiSortType = "tracknumber";
		$scope.clearKrithiSearch();
		$scope.krithiSearch.albumid = $albumid;
		$scope.krithiSortReverse = false;
		$scope.tab = 0;
	};

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
