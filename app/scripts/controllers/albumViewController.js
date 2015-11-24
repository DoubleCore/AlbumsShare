(function () {
    angular.module('albumsShareApp')
        .controller('albumViewController', function ($scope, $routeParams, albumService, $location) {
            $scope.loadErrorText = "";
            $scope.album_name = $routeParams.album_name;
        
            albumService.getPhotosForAlbum($scope.album_name, function (err, photos){
                if (err){
                    if (err.code == "not_found") {
                        $scope.pageLoadError = "Page Not Found!";
                    } else {
                        $scope.pageLoadError = "Unexpected Error " + err.code + " " + err.message; 
                    }
                } else {
                    $scope.photos = photos;
                }
            });
    });
})();