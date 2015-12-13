define(['jquery', 'underscore', 'backbone', 'text!HotelDealsViewTpl'], function($, _, Backbone, HotelDealsViewTpl) {

    return Backbone.View.extend({

        template: _.template(HotelDealsViewTpl),

        initialize: function() {

            this.model.on("change", this.render, this);
            this.model.bind("destroy", this.close, this);

        },
        render: function() {

            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
});