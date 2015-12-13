define(['jquery', 'underscore', 'backbone', 'Hotel'], function($, _, Backbone, Hotel) {

    return Backbone.Collection.extend({
        model: Hotel,

        url: "/results",

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