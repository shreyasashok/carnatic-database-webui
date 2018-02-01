angular.module('myApp', [])
.controller('appController', function($scope, $log) {
	var jquery = $;
	var week = 604800000;
	var spreadsheet_key = "1MHBp2GX_h5B9mC6GPcIt7XH2-CPz4W8FK0f2nBi9nZ4"
	$.getJSON("https://spreadsheets.google.com/feeds/list/"+spreadsheet_key+"/2/public/values?alt=json", function(data) {
		var rawData = data.feed.entry;
		$log.log(rawData);

		$log.log(rawData[0]);
		$scope.albumData = [];
		for (var rawIndex in rawData) {
			var rawRow = rawData[rawIndex];
			var processedRow = {albumid:rawRow.gsx$albumid.$t, mainartist:rawRow.gsx$mainartist.$t, violin:rawRow.gsx$violin.$t, mridangam:rawRow.gsx$mridangam.$t, upapakkavadhyam:rawRow.gsx$upapakkavadhyam.$t,
						concertsabha:rawRow.gsx$concertsabha.$t, sabhalocation:rawRow.gsx$sabhalocation.$t, date:rawRow.gsx$date.$t, audioquality:rawRow.gsx$audioquality.$t, uploaddate:rawRow.gsx$uploaddate.$t};
			$log.log(rawRow.gsx$upapakkavadhyam.$t)
			$scope.$apply( function() {
				$scope.albumData.push(processedRow);
			});
		}
	});
	$.getJSON("https://spreadsheets.google.com/feeds/list/"+spreadsheet_key+"/1/public/values?alt=json", function(data) {
		var rawData = data.feed.entry;
		$log.log(rawData);

		$log.log(rawData[0]);
		$scope.krithiData = [];
		for (var rawIndex in rawData) {
			var rawRow = rawData[rawIndex];
			var processedRow = {songtitle:rawRow.gsx$songtitle.$t, albumid:rawRow.gsx$albumid.$t, tracknumber:rawRow.gsx$tracknumber.$t, type:rawRow.gsx$type.$t, ragam:rawRow.gsx$ragam.$t, talam:rawRow.gsx$talam.$t, 
						composer:rawRow.gsx$composer.$t, alapana:rawRow.gsx$a.$t, niraval:rawRow.gsx$n.$t, swaram:rawRow.gsx$s.$t, comments:rawRow.gsx$comments.$t, youtubevideoid:rawRow.gsx$youtubevideoid.$t, 
						mainartist:rawRow.gsx$mainartist.$t, violin:rawRow.gsx$violin.$t, mridangam:rawRow.gsx$mridangam.$t, upapakkavadhyam:rawRow.gsx$upapakkavadhyam.$t, concertsabha:rawRow.gsx$concertsabha.$t,
						sabhalocation:rawRow.gsx$sabhalocation.$t, date:rawRow.gsx$date.$t, audioquality:rawRow.gsx$audioquality.$t, uploaddate:rawRow.gsx$uploaddate.$t, newtrack: false};
			var uploadDate = new Date(processedRow.uploaddate);
			var today = new Date();
			var delta = today-uploadDate;
			if (delta < week) {
				processedRow.newtrack = true;
			}
			$log.log(delta);
			$log.log(uploadDate.toUTCString());
			$log.log(processedRow.newtrack);
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
	$scope.krithiColumnEnable = {albumid: true, tracknumber: true, songtitle: true, type: false, ragam: true, talam: true, composer: true, comments: false, mainartist:true, violin:true, mridangam: true, upapakkavadhyam: false, 
					concertsabha: false, sabhalocation: false, date: false};
        $log.log($scope.krithiColumnEnable.sabhalocation);
	$scope.albumColumnEnable = {};


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
	$scope.krithiInfoButtonClick = function($row) {
		$scope.krithiModalContent = $row.songtitle+", "+$row.ragam;
		$('#krithiInfoModal').modal()
	};
	$scope.showHideKrithiColumn = function($column, $showHide, $search) {
		if ($showHide == false) {
			$scope.krithiSearch[$column] = "";
			if ($scope.krithiSortType === $column) {
				$scope.krithiSortType = "songtitle";
			}
		}
		
	};
	$scope.changeKrithiSort = function($newSort) {
		if ($newSort === $scope.krithiSortType) {
			$scope.krithiSortReverse = !$scope.krithiSortReverse;
		}
		else {
			$scope.krithiSortType = $newSort;
			$scope.krithiSortReverse = false;
		}
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
	};
})
.directive("playlist", function() {
	return {
		templateUrl: "playlistTemplate.html"
	};
});
