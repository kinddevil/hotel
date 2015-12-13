define(['jquery', 'underscore', 'backbone', 'HotelsView', 'FilterView', 'paginator'], function($, _, Backbone, HotelsView, FilterView, Paginator) {

    return Backbone.View.extend({

        initialize: function() {
            this.render();
        },
        render: function() {

            var hotels = this.model.models;
            var len = hotels.length;
            var startPos = 0; //(this.options.page - 1) * 8;
            var endPos = Math.min(startPos + 8, len);

            // $(this.el).html('<div class="filter"></div>');

            $(this.el).html('<div class="filter"></div> <div class="row"></div>');

            $('.filter', this.el).append(new FilterView().render().el);

            for (var i = startPos; i < endPos; i++) {

                $('.row', this.el).append(new HotelsView({
                    model: hotels[i]
                }).render().el);

            }

            // $(this.el).append(new Paginator({
            //     model: this.model,
            //     page: this.options.page
            // }).render().el);

            return this;
        }
    });
});