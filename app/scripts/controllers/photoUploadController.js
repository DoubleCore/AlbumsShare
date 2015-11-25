(function () {
    angular.module('albumsShareApp')
        .controller('photoUploadController', function ($scope, $location, $routeParams, albumService, FileUploader){
        $scope.album_name = $routeParams.album_name;
        $scope.page_load_error = "";
        $scope.finishedUploading = false;

        $scope.uploader = albumService.getUploader($scope.album_name);

        $scope.uploader.onBeforeUploadItem = function (item) {
          var fn = _fix_filename(item.file.name);
          var d = item.file.lastModifiedDate;
          item.formData = [{
            name: fn,
            date: d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate(),
          }];
          item.uploader.formData = item.formData;
        }

        $scope.uploader.onCompleteAll = function () {
          $scope.finishedUploading = true;
        }

        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

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
