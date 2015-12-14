define(['backbone'], function ( Backbone) { 
	var CurrencyList = Backbone.Collection.extend({
		
		url:'js/autocompleteCurrency.json',
		initialize: function(){

		},
		parse: function (data) {
	        return data;
	    },
	    fetch: function (options) {
	        options = options || {};
	        return Backbone.Collection.prototype.fetch.call(this, options);
	    },
	    // Overwrite the sync method to pass over the Same Origin Policy
        sync: function(method, model, options) {
        	var that= this;
            var params = _.extend({
            	 type: 'GET',
				 processData: true,
				 url:that.url
               }, options);
 
            return $.ajax(params);
        }
    });
	return CurrencyList;
});