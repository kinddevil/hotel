define(['jquery', 'underscore', 'backbone', 'DstnsView', 'paginator', 'HeaderView', 'FooterView'],
    function($, _, Backbone, DstnsView, Paginator, HeaderView, FooterView) {

        return Backbone.View.extend({

            initialize: function() {
                console.log("HomeView Init");

                this.$el.addClass('loading');

                this.render();
            },
            render: function() {

                console.log("HomeView render");

                var dstns = this.model.models;
                var len = dstns.length;
                var startPos = 0; //(this.options.page - 1) * 8;
                var endPos = Math.min(startPos + 8, len);

                $(this.el).append(new HeaderView().render().el);
                $(this.el).append(new FooterView().render().el);

                $(this.el).html('<div class="row"></div>');

                for (var i = startPos; i < endPos; i++) {

                    $('.row', this.el).append(new DstnsView({
                        model: dstns[i]
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