define(['jquery', 'underscore', 'backbone', 'text!AnalyticsViewTpl'], function($, _, Backbone, AnalyticsViewTpl) {
    return Backbone.View.extend({
        template: _.template(AnalyticsViewTpl),
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        }
    });
});