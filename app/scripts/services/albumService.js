(function () {
    angular.module('albumsShareApp')
        .service('albumService', function () {
            
            var Albums = [
                {
                    title: 'Weekend in Barcelona',
                    date: '30/09/2014',
                    description: 'Barcelona is an enchanting seaside city with boundless culture, fabled architecture, and a world-class drinking and dining scene',
                    name: 'barcelona30092014',
                    photos: [
                        {
                        filename: "1.png",
                        date: "29/9/2014",
                        description: "Barcelona Photo #1",
                        },
                        {
                            filename: "2.png",
                            date: "29/9/2014",
                            description: "Barcelona Photo #2",
                        }
                    ]
                },
                {
                    title: 'Trip to Thailand',
                    date: '20/11/2015',
                    description: 'Thailand is one of the world\'s most popular holiday destinations, and with good reason - there\'s so much to do and the landscape is so varied that no matter what your interest, you\'ll find your little pocket of paradise.',
                    name: 'thailand20112015',
                    photos: [
                        {
                        filename: "1.png",
                        date: "19/11/2015",
                        description: "Thailand Photo #1",
                        },
                        {
                            filename: "2.png",
                            date: "19/11/2015",
                            description: "Thailand Photo #1",
                        }
                    ]
                },
                {
                    title: 'Amsterdam',
                    date: '01/01/2013',
                    description: 'Seventeenth-century buildings. Joint-smoking alien sculptures. Few cities meld history with modern urban flair like Amsterdam.',
                    name: 'amsterdam01102013',
                    photos: [
                        {
                        filename: "1.png",
                        date: "31/10/2013",
                        description: "Amsterdam Photo #1",
                        },
                        {
                            filename: "2.png",
                            date: "31/10/2013",
                            description: "Amsterdam Photo #1",
                        }
                    ]
                },
                {
                    title: 'New York, USA',
                    date: '14/03/2006',
                    description: 'Epicenter of the arts. Dining and shopping capital. Trendsetter. New York City wears many crowns, and spreads an irresistible feast for all.',
                    name: 'nyc14032006',
                    photos: [
                        {
                        filename: "1.png",
                        date: "13/03/2006",
                        description: "NYC Photo #1",
                        },
                        {
                            filename: "2.png",
                            date: "13/03/2006",
                            description: "NYC Photo #1",
                        }
                    ]
                }
            ];
        
            this.getAlbums = function () {
                return Albums;
            };
        
            this.getAlbumByName = function (name) {
                for (var i = 0; i < Albums.length; i++){
                    if(name.toLowerCase() == Albums[i].name.toLowerCase()){
                        return Albums[i];
                    }
                }
                
                throw new Error("not_found");
            };
            
            function isValidDate(date) {
                if(date.match(/^[0-9]{1,2}[\-\/\. ,][0-9]{1,2}[\-\/\. ,][0-9]{2,4}$/)){
                    var d = new Date(date);
                    return !isNaN(d.getTime());
                } else {
                    return false;
                }
            };
            
            this.addAlbum = function (data){
                if (!data.name) {
                    throw new Error ("missing_name");
                }
                
                for (var i = 0; i < Albums.length; i++) {
                    if (data.name.toLowerCase() == Albums[i].name.toLowerCase()){
                        throw new Error("duplicate_name");
                    } 
                }
                
                if (!data.title){
                    throw new Error ("missing_title");
                }
                if (!data.description){
                    throw new Error ("missing_description");
                }
                if (!data.date){
                    throw new Error ("missing_date");
                }
                if (!isValidDate(data.date)){
                    throw new Error("invalid_date");
                }
                
                Albums.push(data);
            };
    });
})();