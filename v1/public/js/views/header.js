define(['jquery', 'underscore', 'backbone', 'text!HeaderViewTpl'], function($, _, Backbone, HeaderViewTpl) {
    return Backbone.View.extend({
        template: _.template(HeaderViewTpl),
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        }
    });
});