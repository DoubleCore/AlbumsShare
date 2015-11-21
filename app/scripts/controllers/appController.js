(function() {
    angular.module('albumsShareApp').
    controller('appController', ['$scope','albumService', function ($scope, albumService) {
        
            $scope.Albums = albumService.getAlbums();
            $scope.input_error = "";
            $scope.tempAlbum = {};
            
            $scope.addAlbum = function () {
                
                try {
                    albumService.addAlbum($scope.tempAlbum);
                    $scope.tempAlbum = {};
                    $scope.input_error = "";

                } catch (e) {
                    if (e.message == "missing_name") 
                        $scope.input_error = "Please provide an album name.";
                    else if (e.message == "duplicate_name") 
                        $scope.input_error = "Album name already exist!";
                    else if (e.message == "missing_title") 
                        $scope.input_error = "Please provide an album title.";
                    else if (e.message == "missing_description") 
                        $scope.input_error = "Please provide an album description";
                    else if (e.message == "missing_date") 
                        $scope.input_error = "Please enter the date.";
                    else if (e.message == "invalid") 
                        $scope.input_error = "Please provide a valid date.";
                }
            }
        }]);
})();