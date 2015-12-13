define(['jquery', 'underscore', 'backbone', 'text!FilterViewTpl'], function($, _, Backbone, FilterViewTpl) {
    return Backbone.View.extend({
        template: _.template(FilterViewTpl),
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        }
    });
});