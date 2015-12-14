define(['backbone'], function ( Backbone) { 
	var HotelList = Backbone.Collection.extend({
		
		url:'https://api.eancdn.com/ean-services/rs/hotel/v3/list',
		initialize: function(formData){
			var roomGroup = "";
			for(var i=0;i<formData.roomGroup.length;i++){
				roomGroup = roomGroup + '<Room>';
				for(key in formData.roomGroup[i]){
					if(key == "numberOfAdults")
						roomGroup = roomGroup + '<numberOfAdults>'+ formData.roomGroup[i].numberOfAdults+'</numberOfAdults>';
						else if(key == "numberOfChildren")
							roomGroup = roomGroup + '<numberOfChildren>'+ formData.roomGroup[i].numberOfChildren+'</numberOfChildren>';
				}
				roomGroup = roomGroup +'</Room>';
			}
			var xml = '<HotelListRequest>'
				+'<city>Seattle</city>'
				+'<arrivalDate>'+formData.arrivalDate+'</arrivalDate>'
				+'<departureDate>'+formData.departureDate+'</departureDate>'
				+'<RoomGroup>'+roomGroup+'</RoomGroup>'
				+'<numberOfResults>200</numberOfResults>'
			+'</HotelListRequest>';
			
			this.formData = xml;
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
        	 var that = this;
        	var requestParameters = 'cid=55505&minorRev=99'
        							+'&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US'
        							+'&currencyCode=USD&xml='
        							+this.formData;
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                //jsonp: false,
                //jsonpCallback: "cb"+timeSt+100,
                    url: that.url,
                    processData: true,
                    data:requestParameters
                }, options);
 
            return $.ajax(params);
        }
    });
	return HotelList;
});