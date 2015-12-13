define(['jquery', 'underscore', 'HotelDeals', 'HotelDealsView', 'HotelDealsContainerView'], function($, _, HotelDeals, HotelDealsView, HotelDealsContainerView) {

    return function(page) {

        var p = page ? parseInt(page, 10) : 1,
            hoteldeals = new HotelDeals(),
            defer = $.Deferred(),
            renderPromise = defer.then(function() {

                return new HotelDealsContainerView({
                    model: hoteldeals,
                    page: p
                }).el;
            });

        hoteldeals.fetch({
            success: function() {
                defer.resolve();
            }
        });
        return renderPromise;
    };
});