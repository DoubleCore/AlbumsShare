(function () {
    angular.module('albumsShareApp')
        .controller('albumViewController', function ($scope, $routeParams, albumService) {
            $scope.loadErrorText = "";
            $scope.album_name = $routeParams.album_name;
        
            try{
                var album = albumService.getAlbumByName($scope.album_name);
                $scope.photos = album.photos;
            }catch(e){
                $scope.loadErrorText = "Invalid Album Name";
            }
    });
})();