define(['jquery', 'underscore', 'backbone', 'text!DstnViewTpl'], function($, _, Backbone, DstnsViewTpl) {

    return Backbone.View.extend({

        template: _.template(DstnsViewTpl),

        initialize: function() {

            console.log("DstnsView Init");
            this.model.on("change", this.render, this);
            this.model.bind("destroy", this.close, this);

        },
        render: function() {

            console.log("DstnsView Render");
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
});