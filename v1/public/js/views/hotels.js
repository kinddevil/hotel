define(['jquery', 'underscore', 'backbone', 'text!HotelsViewTpl'], function($, _, Backbone, HotelsViewTpl) {

    return Backbone.View.extend({

        template: _.template(HotelsViewTpl),

        initialize: function() {

            console.log("HotelsView Init");
            this.model.on("change", this.render, this);
            this.model.bind("destroy", this.close, this);

        },
        render: function() {

            console.log("HotelsView Render");
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
});