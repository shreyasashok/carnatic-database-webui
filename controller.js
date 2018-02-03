angular.module('myApp', [])
.controller('appController', function($scope, $window, $log) {
	var jquery = $;
	var week = 604800000;
	var spreadsheet_key = "1MHBp2GX_h5B9mC6GPcIt7XH2-CPz4W8FK0f2nBi9nZ4"
	$.getJSON("https://spreadsheets.google.com/feeds/list/"+spreadsheet_key+"/2/public/values?alt=json", function(data) {
		var rawData = data.feed.entry;
		$scope.albumData = [];
		for (var rawIndex in rawData) {
			var rawRow = rawData[rawIndex];
			var processedRow = {albumid:rawRow.gsx$albumid.$t, mainartist:rawRow.gsx$mainartist.$t, violin:rawRow.gsx$violin.$t, mridangam:rawRow.gsx$mridangam.$t, ghatam:rawRow.gsx$ghatam.$t, 
						kanjira:rawRow.gsx$kanjira.$t, morsing:rawRow.gsx$morsing.$t, vocalsupport:rawRow.gsx$vocalsupport.$t, otherartist:rawRow.gsx$otherartist.$t, upapakkavadhyam:rawRow.gsx$upapakkavadhyam.$t,
						concertsabha:rawRow.gsx$concertsabha.$t, sabhalocation:rawRow.gsx$sabhalocation.$t, date:rawRow.gsx$date.$t, audioquality:rawRow.gsx$audioquality.$t, uploaddate:rawRow.gsx$uploaddate.$t,
						newalbum: false};
			var uploadDate = new Date(processedRow.uploaddate);
			var today = new Date();
			var delta = today-uploadDate;
			if (delta < week) {
				processedRow.newalbum = true;
			}
			$scope.$apply( function() {
				$scope.albumData.push(processedRow);
			});
		}
	});
	$.getJSON("https://spreadsheets.google.com/feeds/list/"+spreadsheet_key+"/1/public/values?alt=json", function(data) {
		var rawData = data.feed.entry;
		$scope.krithiData = [];
		for (var rawIndex in rawData) {
			var rawRow = rawData[rawIndex];
			var processedRow = {songtitle:rawRow.gsx$songtitle.$t, albumid:rawRow.gsx$albumid.$t, tracknumber:rawRow.gsx$tracknumber.$t, type:rawRow.gsx$type.$t, ragam:rawRow.gsx$ragam.$t, talam:rawRow.gsx$talam.$t, 
						composer:rawRow.gsx$composer.$t, alapana:rawRow.gsx$a.$t, niraval:rawRow.gsx$n.$t, swaram:rawRow.gsx$s.$t, comments:rawRow.gsx$comments.$t, youtubevideoid:rawRow.gsx$youtubevideoid.$t, 
						mainartist:rawRow.gsx$mainartist.$t, violin:rawRow.gsx$violin.$t, mridangam:rawRow.gsx$mridangam.$t, ghatam:rawRow.gsx$ghatam.$t, kanjira:rawRow.gsx$kanjira.$t, 
						morsing:rawRow.gsx$morsing.$t, vocalsupport:rawRow.gsx$vocalsupport.$t, otherartist:rawRow.gsx$otherartist.$t, upapakkavadhyam:rawRow.gsx$upapakkavadhyam.$t, 
						concertsabha:rawRow.gsx$concertsabha.$t, sabhalocation:rawRow.gsx$sabhalocation.$t, date:rawRow.gsx$date.$t, audioquality:rawRow.gsx$audioquality.$t, 
						uploaddate:rawRow.gsx$uploaddate.$t, newtrack: false, selected: false};
			var uploadDate = new Date(processedRow.uploaddate);
			var today = new Date();
			var delta = today-uploadDate;
			if (delta < week) {
				processedRow.newtrack = true;
			}
			$scope.$apply( function() {
				$scope.krithiData.push(processedRow);
			});
		}
	});

	$scope.tab = 0;

	$scope.playlistData = [];
	$scope.krithiSearch = {};
	$scope.albumSearch = {};
	$scope.krithiSortType = "songtitle";
	$scope.krithiSortReverse = false;
	$scope.albumSortType = "albumid";
	$scope.albumSortReverse = false;
	$scope.krithiColumnEnableDefault = {albumid: false, tracknumber: false, songtitle: true, type: false, ragam: true, talam: true, composer: true, alapana: true, niraval: true, swaram: true, comments: false, 
						mainartist:true, violin:true, mridangam: true, upapakkavadhyam: false, concertsabha: false, sabhalocation: false, date: false};
	$scope.krithiColumnEnable = {albumid: false, tracknumber: false, songtitle: true, type: false, ragam: true, talam: true, composer: true, alapana: true, niraval: true, swaram: true, comments: false, 
						mainartist:true, violin:true, mridangam: true, upapakkavadhyam: false, concertsabha: false, sabhalocation: false, date: false};
	$scope.playlistColumnEnableDefault = {albumid: false, tracknumber: false, songtitle: true, type: false, ragam: true, talam: true, composer: true, alapana: true, niraval: true, swaram: true, comments: false, 
						mainartist:true, violin:true, mridangam: true, upapakkavadhyam: false, concertsabha: false, sabhalocation: false, date: false};
	$scope.playlistColumnEnable = {albumid: false, tracknumber: false, songtitle: true, type: false, ragam: true, talam: true, composer: true, alapana: true, niraval: true, swaram: true, comments: false, 
						mainartist:true, violin:true, mridangam: true, upapakkavadhyam: false, concertsabha: false, sabhalocation: false, date: false};
	$scope.albumColumnEnableDefault = {albumid: true, mainartist: true, violin:true, mridangam: true, upapakkavadhyam: true, concertsabha: true, sabhalocation: false, date: true};
	$scope.albumColumnEnable = {albumid: true, mainartist: true, violin:true, mridangam: true, upapakkavadhyam: true, concertsabha: true, sabhalocation: false, date: true};

	$scope.krithiItemsSelected = false;
	$scope.playlistItemsSelected = false;

	$scope.logFunction = function($log_info) {
		$log.log($log_info);
	};

	$scope.clearKrithiSearch = function() {
		for (key in $scope.krithiSearch) {
			if ($scope.krithiSearch.hasOwnProperty(key)) {
				$scope.krithiSearch[key] = "";
			}
		}
	};
	$scope.clearAlbumSearch = function() {
		for (key in $scope.albumSearch) {
			if ($scope.albumSearch.hasOwnProperty(key)) {
				$scope.albumSearch[key] = "";
			}
		}
	};
	$scope.accessAlbum = function($albumid) {
		$scope.krithiSortType = "tracknumber";
		$scope.clearKrithiSearch();
		$scope.krithiSearch.albumid = $albumid;
		$scope.krithiSortReverse = false;
		$scope.krithiColumnEnable.albumid = true;
		$scope.krithiColumnEnable.tracknumber = true;
		$scope.showHideKrithiColumn("albumid", true);
		$scope.showHideKrithiColumn("tracknumber", true);
		$scope.tab = 0;
	};
	$scope.krithiInfoButtonClick = function($row) {
		$scope.krithiModalContent = $row;
		$('#krithiInfoModal').modal()
	};
	$scope.albumInfoButtonClick = function($row) {
		$scope.albumModalContent = $row;
		$('#albumInfoModal').modal()
	};
	$scope.playlistInfoButtonClick = function($row) {
		$scope.playlistModalContent = $row;
		$('#playlistInfoModal').modal()
	};
	$scope.showHideKrithiColumn = function($column, $showHide) { //doesn't actually do what it says haha! need to call $scope.krithiColumnEnable.$column = true/false to make it work
		if ($showHide == false) {
			$scope.krithiSearch[$column] = "";
			if ($scope.krithiSortType === $column) {
				$scope.krithiSortType = "songtitle";
			}
		}
		
	};
	$scope.showHideAlbumColumn = function($column, $showHide) {
		if ($showHide == false) {
			$scope.albumSearch[$column] = "";
			if ($scope.albumSortType === $column) {
				$scope.albumSortType = "albumid";
			}
		}
		
	};
	$scope.showHidePlaylistColumn = function($column, $showHide) { //doesn't actually do what it says haha! need to call $scope.krithiColumnEnable.$column = true/false to make it work
		// intentionally empty	
	};
	$scope.showHideKrithiDefault = function() {
		for (key in $scope.krithiColumnEnableDefault) {
			$scope.krithiColumnEnable[key] = $scope.krithiColumnEnableDefault[key];
			$scope.showHideKrithiColumn(key, $scope.krithiColumnEnableDefault[key])
		}
	};
	$scope.showHideAlbumDefault = function() {
		for (key in $scope.albumColumnEnableDefault) {
			$scope.albumColumnEnable[key] = $scope.albumColumnEnableDefault[key];
			$scope.showHideAlbumColumn(key, $scope.albumColumnEnableDefault[key])
		}
	};
	$scope.showHidePlaylistDefault = function() {
		for (key in $scope.playlistColumnEnableDefault) {
			$scope.playlistColumnEnable[key] = $scope.playlistColumnEnableDefault[key];
			$scope.showHidePlaylistColumn(key, $scope.playlistColumnEnableDefault[key])
		}
	};
	$scope.changeKrithiSort = function($newSort) {
		if ($newSort === $scope.krithiSortType) {
			$scope.krithiSortReverse = !$scope.krithiSortReverse;
		}
		else {
			$scope.krithiSortType = $newSort;
			if ($newSort == "alapana" || $newSort == "niraval" || $newSort == "swaram") {
				$scope.krithiSortReverse = true;
			}
			else {
				$scope.krithiSortReverse = false;
			}
		}
	};
	$scope.changeAlbumSort = function($newSort) {
		if ($newSort === $scope.albumSortType) {
			$scope.albumSortReverse = !$scope.albumSortReverse;
		}
		else {
			$scope.albumSortType = $newSort;
			$scope.albumSortReverse = false;
		}
	};
	$scope.krithiSelectAll = function($select) {
		for (row in $scope.filteredKrithiData) {
			$scope.filteredKrithiData[row].selected = $select;
		}
	};
	$scope.playlistSelectAll = function($select) {
		for (row in $scope.playlistData) {
			$scope.playlistData[row].selected = $select;
		}
	};
	$scope.krithiPlayAll = function() {
		var video_ids = [];
		for (row in $scope.filteredKrithiData) {
			video_ids.push($scope.filteredKrithiData[row].youtubevideoid);
		}
		$scope.generatePlaylist(video_ids, "Carnatic Archive");
	};
	$scope.playlistPlayAll = function() {
		var video_ids = [];
		for (row in $scope.playlistData) {
			video_ids.push($scope.playlistData[row].youtubevideoid);
		}
		$scope.generatePlaylist(video_ids, "Carnatic Archive");
	};
	$scope.krithiPlaySelected = function() {
		var video_ids = [];
		for (row in $scope.filteredKrithiData) {
			if ($scope.filteredKrithiData[row].selected) {
				video_ids.push($scope.filteredKrithiData[row].youtubevideoid);
			}
		}
		$scope.generatePlaylist(video_ids, "Carnatic Archive");
	};
	$scope.playlistPlaySelected = function() {
		var video_ids = [];
		for (row in $scope.playlistData) {
			if ($scope.playlistData[row].selected) {
				video_ids.push($scope.playlistData[row].youtubevideoid);
			}
		}
		$scope.generatePlaylist(video_ids, "Carnatic Archive");
	};
	$scope.playlistAddRow = function($row) {
		$log.log($row);
		var newRow = angular.copy($row);
		$log.log(newRow);
		$log.log(newRow === $row);
		$log.log(newRow == $row);
		$scope.playlistData.push(newRow);
	};
	$scope.playlistAddRows = function($rows) {
		for (row in $rows) {
			$scope.playlistAddRow($rows[row]);
		}
	};
	$scope.krithiAddAllToPlaylist = function() {
		$scope.playlistAddRows($scope.filteredKrithiData);
	};
	$scope.krithiAddSelectedToPlaylist = function() {
		var rows = [];
		for (row in $scope.filteredKrithiData) {
			if ($scope.filteredKrithiData[row].selected) {
				rows.push($scope.filteredKrithiData[row]);
			}
		}
		$scope.playlistAddRows(rows);
	};
	$scope.playlistDeleteAll = function() {
		$scope.playlistDeleteRows($scope.playlistData);
	};
	$scope.playlistDeleteSelected = function() {
		var rows = [];
		for (row in $scope.playlistData) {
			if ($scope.playlistData[row].selected) {
				rows.push($scope.playlistData[row]);
			}
		}
		$log.log(rows);
		$scope.playlistDeleteRows(rows);
	};
	$scope.playlistMoveRow = function($row, $move_amount) {
		var currentIndex = $scope.playlistData.indexOf($row);
		var newIndex = currentIndex + $move_amount;
		if (newIndex < 0 || newIndex == $scope.playlistData.length) { //account for beginning and end of list
			return;
		}
		$log.log($scope.playlistData);
		$scope.playlistData[currentIndex] = $scope.playlistData.splice(newIndex, 1, $scope.playlistData[currentIndex])[0];
		$log.log($scope.playlistData);
	};
	$scope.playlistDeleteRow = function($rowIndex) {
		if ($rowIndex > -1) {
			$log.log($rowIndex);
			$scope.playlistData.splice($rowIndex, 1);
		}
	};
	$scope.playlistDeleteRows = function($rows) {
		var length = $rows.length;
		var indices = [];
		for (row = 0; row < length; row++) {
			$log.log($rows[row]);
			var index = $scope.playlistData.indexOf($rows[row]);
			indices.push(index);
		}
		indices.sort(function(a, b){return b - a});
		$log.log("Indices");
		$log.log(indices);
		$log.log("Indices 0th index: "+indices[0]);
		for (currentIndex in indices) {
			$scope.playlistDeleteRow(indices[currentIndex]);
		}
	};
	$scope.generatePlaylist = function ($video_ids, $title) {
		var hyperlink = "https://youtube.com/watch_videos?video_ids=";
		var video_ids_joined = $video_ids.join(',');
		var title_joined = "&title="+$title;
		hyperlink += video_ids_joined+title_joined;
		$window.open(hyperlink);

	};
	$scope.$watch("filteredKrithiData", function(new_value, old_value) {
		var all_true = true;
		var items_selected = false;
		for (row in new_value) {
			if (new_value[row].selected == false) {
				all_true = false;
			}
			if (new_value[row].selected) {
				items_selected = true;
			}
		}
		$scope.krithi_select_all = all_true;
		$scope.krithiItemsSelected = items_selected;
		
		for (row in $scope.krithiData) {
			if ($scope.filteredKrithiData.indexOf($scope.krithiData[row]) == -1) {
				$scope.krithiData[row].selected = false;
			}
		}
	}, true);
	$scope.$watch("playlistData", function(new_value, old_value) {
		var all_true = true;
		var items_selected = false;
		for (row in new_value) {
			if (new_value[row].selected == false) {
				all_true = false;
			}
			if (new_value[row].selected) {
				items_selected = true;
			}
		}
		$scope.playlist_select_all = all_true;
		$scope.playlistItemsSelected = items_selected;
	}, true);

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
})
.directive("about", function() {
	return {
		templateUrl: "aboutTemplate.html"
	};
});
