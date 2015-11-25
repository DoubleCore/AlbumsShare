(function () {
    angular.module('albumsShareApp')
        .controller('albumViewController', function ($scope, $routeParams, albumService, $location) {
            $scope.loadErrorText = "";
            $scope.album_name = $routeParams.album_name;
        
            albumService.getAlbums(function (err, albums) {
                if (err) {
                    $scope.pageLoadError = "Unexpected Error " + err.message;
                } else {
                    for (var i = 0; i < albums.length; i++) {
                        if (albums[i].name == $scope.album_name){
                            $scope.album_title = albums[i].title;
                        }
                    }
                }
            });
        
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