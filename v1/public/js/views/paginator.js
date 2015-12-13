define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    return Backbone.View.extend({

        className: "pagination pagination-centered",

        initialize: function() {
            this.model.bind("reset", this.model, this);
            this.render();
        },
        render: function() {
            var items = this.model.models;
            var len = items.length;
            var pageCount = Math.ceil(len / 8);
            $(this.el).html('<ul />');
            for (var i = 0; i < pageCount; i++) {
                $('ul', this.el).append("<li" + ((i + 1) === this.options.page ?
                    "class='active" : "") + "><a href='#home/page/" + (i + 1) + "'>" + (i + 1) + "</a></li>");
            }
            return this;
        }
    });
});