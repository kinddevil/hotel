define(['jquery', 'underscore', 'backbone', 'text!FooterViewTpl'], function($, _, Backbone, FooterViewTpl) {
    return Backbone.View.extend({
        template: _.template(FooterViewTpl),
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        }
    });
});