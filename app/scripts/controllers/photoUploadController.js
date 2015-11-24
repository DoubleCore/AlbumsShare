(function () {
    angular.module('albumsShareApp')
        .controller('photoUploadController', function ($scope, $location, $routeParams, albumService, Upload, $timeout){
        $scope.album_name = $routeParams.album_name;
        $scope.page_load_error = "";
        $scope.finishedUploading = false;
        $scope.photosDescriptions = {};
        
         $scope.uploader = function (file) {
                    var filename = _fix_filename(file.name);
                    Upload.upload({
                        url: "/v1/albums/" + $scope.album_name + "/photos.json",
                        method: "PUT",
                        data: {
                            filename: _fix_filename(file.name),
                            date: file.date,
                            description: $scope.photosDescriptions[file.name]
                        }
                    });
                }
        
        function _fix_filename(fn) {
            if (!fn || fn.length == 0)  return "unknown";

            var r = new RegExp("^[a-zA-Z0-9\\-_.]+$");
            var out = "";

            for (var i = 0; i < fn.length; i++) {
                if (r.exec(fn[i]) != null)
                    out += fn[i];
            }

            if (!out) out = "unknown_" + (new Date()).getTime();
            return out;
        }
    });
})();