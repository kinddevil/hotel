define(['jquery', 'underscore', 'backbone', 'Deal'], function($, _, Backbone, Deal) {

    return Backbone.Collection.extend({
        model: Deal,

        url: "/deals",

        // Sorting
        sort_key: 'id', // default sort key
        comparator: function(item) {
            return item.get(this.sort_key);
        },
        sortByField: function(fieldName) {
            this.sort_key = fieldName;
            this.sort();
        }
    });

});