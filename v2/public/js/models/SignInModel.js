define(['backbone'], function ( Backbone) {
    return Backbone.Model.extend({
        baseUrl: 'localhost:8639',
        url: function(){
            return '/user/signin'
        }
    });
});