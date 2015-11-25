(function () {
    angular.module('albumsShareApp', ['ngRoute', 'angularFileUpload']). 
        config(function ($routeProvider) {
            $routeProvider
                .when ("/albums", {
                    controller: 'appController',
                    templateUrl: 'views/albums_list.html'
                })
                .when ("/albums/:album_name", {
                    controller: 'albumViewController',
                    templateUrl: 'views/album_view.html'
                })
                .when("/albums/:album_name/upload",{
                    controller: 'photoUploadController',
                    templateUrl: 'views/photo_uploader.html'
                })
                .when ("/", {
                    redirectTo: '/albums'
                });
                
        });
})();