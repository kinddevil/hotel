define(['jquery', 'underscore', 'backbone', 'DealsView', 'paginator'], function($, _, Backbone, DealsView, Paginator) {

    return Backbone.View.extend({

        initialize: function() {

            this.render();
        },
        render: function() {

            var deals = this.model.models;
            var len = deals.length;
            var startPos = 0; //(this.options.page - 1) * 8;
            var endPos = Math.min(startPos + 8, len);

            $(this.el).html('<div class="row"></div>');

            for (var i = startPos; i < endPos; i++) {

                $('.row', this.el).append(new DealsView({
                    model: deals[i]
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