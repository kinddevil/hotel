define(['jquery', 'underscore', 'backbone', 'HotelDeal'], function($, _, Backbone, HotelDeal) {

    return Backbone.Collection.extend({
        model: HotelDeal,

        url: "/hoteldeals",

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