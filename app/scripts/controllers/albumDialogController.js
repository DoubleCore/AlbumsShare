(function () {
    angular.module('albumsShareApp')
        .controller('AlbumDialogController', ['$scope', '$location','albumService','$uibModalInstance', function ($scope, $location, albumService,$uibModalInstance) {
            $scope.input_error = "";
            $scope.tempAlbum = {};
            $scope.format = "yyyy/MM/dd";
            $scope.status = {
                opened: false
            };
            $scope.open = function($event) {
                $scope.status.opened = true;
            };
            
            $scope.ok = function () {
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
                        else 
                            $scope.input_error = "Unexpected Error: "+err.code+". Message: " + err.message;
                    } else {
                        $uibModalInstance.close($scope.tempAlbum.name);
                    }
                });
            };
            
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
})();