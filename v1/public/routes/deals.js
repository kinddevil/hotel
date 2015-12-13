define(['jquery', 'underscore', 'Deals', 'DealsView', 'DealsContainerView'], function($, _, Deals, DealsView, DealsContainerView) {

    return function(page) {

        var p = page ? parseInt(page, 10) : 1,
            deals = new Deals(),
            defer = $.Deferred(),
            renderPromise = defer.then(function() {

                return new DealsContainerView({
                    model: deals,
                    page: p
                }).el;
            });

        deals.fetch({
            success: function() {
                defer.resolve();
            }
        });
        return renderPromise;
    };
});