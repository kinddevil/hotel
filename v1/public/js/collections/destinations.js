define(['jquery', 'underscore', 'backbone', 'Dstn'], function($, _, Backbone, Dstn) {

    return Backbone.Collection.extend({
        model: Dstn,

        url: "/home",

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