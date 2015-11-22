(function () {
	angular.module('albumUploadController',
	 ['$scope', '$location', 'routeParams', 'albumService',
	 	function ($scope, $location, $routeParams, albumService) {
	 		$scope.album_name = $routeParams.album_name;
	 		$scope.pageLoadingError = "";
	 		$scope.doneUploading = false;
	 		$scope.descriptions = {};

	 		albumService.getPhotosByAlbumName($scope.album_name, function (err, photos) {
	 			if (err){
          if (err.error == "not_found") {
            $scope.pageLoadError = "Album not exist!"
          } else {
            $scope.photos = photos;
          }
        }
	 		});
	}])

  $scope.uploader.bind('beforeUpload', function (event, item) {
    var fn = item.file.name;
    var d = item.file.lastModFileDate;
    item.formData = [
      {
        filename: _fix_filename(item.file.name),
        description: $$scope.descriptions[item.file.name],
        date: d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate()
      }
    ];
  });

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
})();

$$scope.uploader = albumService.getUploader($scope.album_name, $scope);


