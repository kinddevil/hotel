define(['jquery', 'underscore', 'Dstns', 'DstnsView', 'HomeView'], function($, _, Dstns, DstnsView, HomeView) {

    return function(page) {

        var p = page ? parseInt(page, 10) : 1,
            dstns = new Dstns(),
            defer = $.Deferred(),
            renderPromise = defer.then(function() {

                return new HomeView({
                    model: dstns,
                    page: p
                }).el;
            });

        dstns.fetch({
            success: function() {

                defer.resolve();
                
                this.$el.removeClass('loading');
            }
        });
        return renderPromise;
    };
});