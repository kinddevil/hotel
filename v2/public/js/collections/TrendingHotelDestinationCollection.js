define(['backbone'], function ( Backbone) {
    var hotelDestinationModel = Backbone.Model.extend({});

    return Backbone.Collection.extend({
        model: hotelDestinationModel,
        baseUrl: 'localhost:8639',
        url: function(){
            return '/trendingDestination'
        }
    });
});