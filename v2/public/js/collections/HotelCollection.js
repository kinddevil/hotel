define(['backbone'], function ( Backbone) {
    var hotelModel = Backbone.Model.extend({});

    return Backbone.Collection.extend({
        model: hotelModel,
        baseUrl: 'localhost:8639',
        url: function(){
            return '/hotels/name'
        }
    });
});