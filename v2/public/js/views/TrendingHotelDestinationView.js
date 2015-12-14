define(['backbone', 'templates'],
    function(Backbone, templates) {

        return Backbone.View.extend({
            el: '#trending-destination',
            initialize: function() {
                this.template = _.template(templates.trendingHotelDestination);
            },
            render: function() {
                $(this.el).html(this.template(this.collection));
            }
        });

    });