define(['jquery', 'underscore', 'backbone', 'text!AboutViewTpl'], function($, _, Backbone, AboutViewTpl) {
    return Backbone.View.extend({
        template: _.template(AboutViewTpl),
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        }
    });
});