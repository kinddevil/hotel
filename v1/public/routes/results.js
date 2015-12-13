define(['jquery', 'underscore', 'Hotels', 'HotelsView', 'ResultsView'], function($, _, Hotels, HotelsView, ResultsView) {

    return function(page) {

        var p = page ? parseInt(page, 10) : 1,
            hotels = new Hotels(),
            defer = $.Deferred(),
            renderPromise = defer.then(function() {

                return new ResultsView({
                    model: hotels,
                    page: p
                }).el;
            });

        hotels.fetch({
            success: function() {
                defer.resolve();
            }
        });
        return renderPromise;
    };
});