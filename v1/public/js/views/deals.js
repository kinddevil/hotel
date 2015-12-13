define(['jquery', 'underscore', 'backbone', 'text!DealsViewTpl'], function($, _, Backbone, DealsViewTpl) {

    return Backbone.View.extend({

        template: _.template(DealsViewTpl),

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