(function() {
  'use strict';

  angular
    .module('angularLocationservice')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, $timeout, $routeParams, $filter) {
    $scope.markers = [];


    $scope.lastUpdate = new Date();
    $scope.lastLocation = {};

    $scope.openlayer = {
      defaults: {
        "interactions": {
          "mouseWheelZoom": true
        }

      },
      center: {
        lon: -0.12755,
        lat: 51.507222,
        zoom: 14
      }
    };

    function updateMarkers() {
      $scope.lastUpdate = new Date();
      $http.get('http://www.newscombinator.com/location/search/getlocationmarker?id='+$routeParams["id"]).success(function(result) {


        $scope.markers = [];
        angular.forEach(result, function(obj) {
          $scope.markers.push({
            lat: Number(obj.latitude),
            lon: Number(obj.longitude)
          });
          $scope.lastLocation = new Date($filter('mysqlDatetime')(obj.created));
          console.log($scope.lastLocation);

        });
        if($scope.markers.length > 0) {
          $scope.openlayer.center.lat = $scope.markers[0].lat;
          $scope.openlayer.center.lon = $scope.markers[0].lon;
          $scope.openlayer.center.projection = "EPSG:4326";
        }

        $timeout(updateMarkers, 5000);
      }).error(function(data, status, header, config) {
        //do nothing?!
      });
    }

    updateMarkers();


  }
})();
