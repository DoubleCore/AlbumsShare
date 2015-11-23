(function() {
    angular.module('albumsShareApp').
    controller('appController', ['$scope','albumService','$location', function ($scope, albumService, $location) {
            $scope.pageLoadError = "";
            $scope.input_error = "";
            $scope.tempAlbum = {};
            $scope.isDoneLoading = false;    
        
            albumService.getAlbums(function (err, albums) {
                if (err) {
                    $scope.pageLoadError = "Unexpected Error " + err.message;
                } else {
                    $scope.Albums = albums;
                    $scope.isDoneLoading = true;

                }
            });
           // $scope.Albums = albumService.getAlbums();
        
            $scope.addAlbum = function () {
                
                albumService.addAlbum($scope.tempAlbum, function(err, album) {
                    if (err) {
                    if (err.code == "missing_name") 
                        $scope.input_error = "Please provide an album name.";
                    else if (err.code == "duplicate_name") 
                        $scope.input_error = "Album name already exist!";
                    else if (err.code == "missing_title") 
                        $scope.input_error = "Please provide an album title.";
                    else if (err.code == "missing_description") 
                        $scope.input_error = "Please provide an album description";
                    else if (err.code == "missing_date") 
                        $scope.input_error = "Please enter the date.";
                    else if (err.code == "invalid_date") 
                        $scope.input_error = "Please provide a valid date.";
                } else {
                    $location.path("/albums/" + $scope.tempAlbum.name);

                }
                });
            }
    }]);
})();