(function() {
    angular.module('albumsShareApp').
    controller('appController', ['$scope','albumService','$location','$cookies', '$uibModal', function ($scope, albumService, $location, $cookies, $uibModal) {
            $scope.pageLoadError = "";
            
            $scope.isDoneLoading = false;
            $scope.last_album_created = $cookies.get("last_album_created");
        
            $scope.openDialog = function () {
                var addAlbumDialog = $uibModal.open({
                        size: 'md',
                        templateUrl: 'views/modals/AddAlbumDialog.html',
                        controller: 'AlbumDialogController',
                        resolve: {}
                });
                addAlbumDialog.result.then(function (album_name) {
                    location.reload();
                },function () {
                    console.log("modal dismissed.");
                });
            };

            albumService.getAlbums(function (err, albums) {
                if (err) {
                    $scope.pageLoadError = "Unexpected Error " + err.message;
                } else {
                    $scope.Albums = albums;
                    $scope.isDoneLoading = true;

                }
            });
    }]);
})();
