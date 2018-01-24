angular.module('myApp', []).controller('appController', function($scope, $log) {
	var jquery = $;
	$.getJSON("http://gsx2json.com/api?id=1LUE00y5QwLVJAgEm2azkiyp75Bc38NVBwkPbN8kEN0U&columns=false", function(data) {
		$scope.data = data.rows;
		$log.log(data);
		$log.log(data.rows[0].violin);
		$scope.$apply(function() {
			$scope.testmodel = data.rows[0].violin;
		});
		$log.log("log 2"+$scope.data);
		$log.log($scope.name);
	});
	
	$scope.tab = 0;
	$scope.setTab = function(newTab) {
		$scope.tab = newTab;
	}
	
});
