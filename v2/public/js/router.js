define(['backbone','views/mainView','channel'],
   function (Backbone,MainView,Channel) {
		var AppRouter = Backbone.Router.extend({
		    initialize: function () {
		    	Backbone.application = {};
		    	Backbone.application.Router = this;
		    	Backbone.history.start();
		    },
		    routes: {
		        "home": "main",
		        "home/hotels":"hotelListPage",
		        "home/hotels/payment":"initiatePayment"
	            },
	            main: function () {
	            	Backbone.application.Router.view = new MainView();
	            } ,
	            hotelListPage: function(){
	            	if(!Backbone.application.Router.view){
	            		this.main();
	            		localStorage.setItem("url",window.location.hash);
	            	}
	            	if(Backbone.application.Router.HotelList){
	            		localStorage.setItem("Hotel-List", JSON.stringify(Backbone.application.Router.HotelList));
	            	}
	            	else{
		            	if(!localStorage.getItem("Hotel-List")){
		            		localStorage.setItem("Hotel-List", JSON.stringify(Backbone.application.Router.HotelList));
		            	}
	            	}
	            	Channel.trigger("HotelListView",JSON.parse(localStorage.getItem("Hotel-List")));
	            },
	            initiatePayment: function(){
	            	if(!Backbone.application.Router.view){
	            		this.main();
	            		this.hotelListPage();
	            		localStorage.setItem("url",window.location.hash);
	            	}
	            	if(Backbone.application.Router.SelectedRoom){
	            		localStorage.setItem("Selected-Hotel", JSON.stringify(Backbone.application.Router.SelectedHotel));
		            	localStorage.setItem("Selected-Room", JSON.stringify(Backbone.application.Router.SelectedRoom));
	            	}
	            	else{
	            		if(!localStorage.getItem("Selected-Hotel") && !localStorage.getItem("Selected-Room")){
		            		localStorage.setItem("Selected-Hotel", JSON.stringify(Backbone.application.Router.SelectedHotel));
			            	localStorage.setItem("Selected-Room", JSON.stringify(Backbone.application.Router.SelectedRoom));
		            	}
	            	}
	            	Channel.trigger("PaymentView",JSON.parse(localStorage.getItem("Selected-Hotel")),JSON.parse(localStorage.getItem("Selected-Room")));
	            }
	        });
		
      return AppRouter;
});