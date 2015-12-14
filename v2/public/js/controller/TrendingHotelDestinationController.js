define(['vent', 'views/TrendingHotelDestinationView', 'collections/TrendingHotelDestinationCollection'],
    function(vent, TrendingHotelDestinationView, TrendingHotelDestinationCollection){

        var Controller = {};

        vent.on('TrendingHotelDestinationView:render', function(){
            console.log('teheheh');
            Controller.trendingHotelCollection = new TrendingHotelDestinationCollection();
            Controller.trendingHotelCollection.fetch({
                async: false,
                success: function(res) {
                    console.log(res);
                }

            });
            Controller.trendingHotelDestinationView =  new TrendingHotelDestinationView({
                collection: Controller.trendingHotelCollection
            });
            Controller.trendingHotelDestinationView.render();
            Controller.trendingHotelCollection.reset(Controller.trendingHotelCollection);
        });
        return Controller;
});