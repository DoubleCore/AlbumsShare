(function () {
    angular.module('albumsShareApp', ['ngRoute']). 
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
                .when ("/", {
                    redirectTo: '/albums'
                })
                .otherwise ({
                    templateUrl: 'views/404.html'
                });
        });
})();