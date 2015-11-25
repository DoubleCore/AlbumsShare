(function () {
    angular.module('albumsShareApp')
        .service('albumService',['$http', 'FileUploader', function ($http, FileUploader) {

          this.getUploader = function (album_name) {
            return new FileUploader({
              method: "PUT",
              url: "/v1/albums/"+album_name+"/photos.json",
            });
          }

            this.getAlbums = function (callback) {
                $http.get("/v1/albums.json")
                    .success(function (data, status, headers, conf) {
                        callback(null, data);
                    })
                    .error(function (data, status, headers, conf){
                        callback(data);
                    });
            };

            this.getPhotosForAlbum = function (album_name, callback) {
                $http.get("/v1/albums/"+album_name+"/photos.json")
                    .success(function (data, status, headers, conf) {
                        callback(null, data);
                    })
                    .error(function (data, status, headers, conf){
                        callback(data);
                    });
            }

            this.addAlbum = function (data, callback){
                if (!data.name)  return callback({code : "missing_name"});
                if (!data.title) return callback({code : "missing_title"});
                if (!data.description) return callback({code : "missing_description"});
                if (!data.date) return callback({code : "missing_date"});
                var d = new Date(data.date.trim());
                if (isNaN(d.getTime())) return callback( {code: "invalid_date"});

                $http.put("/v1/albums.json", data)
                    .success(function (data, status, headers, conf) {
                            callback(null, data);
                    })
                    .error(function (data, status, headers, conf){
                        callback(data);
                    });
            };
    }]);
})();
