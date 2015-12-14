define(['backbone',
    'underscore',
    'Channel',
    'vent'
],
function(Backbone, _, Channel, vent) {
    var Controller = {};
    Controller.initializeLayout = function(){
        vent.trigger('TrendingHotelDestinationView:render');
    }

    return Controller;
});