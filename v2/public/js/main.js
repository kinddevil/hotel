(function() {
    require.config({
        shim: {
            jquery: {
                exports: '$'
            },
            underscore: {
                exports: '_'
            },
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            jqueryAC: {
                deps: ['jquery']
            },
            bootstrapDP: {
                deps: ['jquery']
            }
        },
        paths: {
            jquery: 'libs/jquery-1.11.0',
            jqueryAC: 'libs/jquery-ui-1.10.4.custom',
            bootstrapDP: 'libs/bootstrap-datepicker',
            underscore: 'libs/underscore',
            backbone: 'libs/backbone',
            text: 'libs/text',
            'backbone.wreqr': 'libs/backbone.wreqr',

            'App': '/js/app',
            'MainApp': '/js/mainApp',
            'Router': '/js/router',

            //Events

            'Channel': '/js/channel',

            //Models

            'HotelsModel': '/js/models/sampleModel',
            'SaveApiHotelResponseModel' : '/js/models/SaveApiHotelResponseModel',
            'SaveHotelRequestModel' : '/js/models/SaveHotelRequestModel',
	        'SignInModel' : '/js/models/SignInModel',
            'SignUpModel' : '/js/models/SignUpModel',
            'AuthModel' : '/js/models/AuthModel',
            'UserTraceModel' : '/js/models/UserTraceModel',

            //Collections

            'DestinationsCollection': '/js/collections/destinationJSON',
            'HotelsExpediaCollection': '/js//collections/hotelList-expedia',
            'HotelsTravelocityCollection': '/js//collections/hotelList-travelocity',
            'TrendingHotelDestination': '/js/collections/TrendingHotelDestinationCollection',
            'HotelCollection': '/js/collections/HotelCollection',
            //Service

            'HotelListService': '/js/services/hotelListService/hotelListService',

            //Views

            'HotelListView': '/js/views/hotelListView',
            'MainView': '/js/views/mainView',
            'TrendingHotelDestinationView': '/js/views/TrendingHotelDestinationView',

//            Controller
            'TrendingHotelDestinationController': '/js/controller/TrendingHotelDestinationController'
        }
    });
    require(['app',
        'router',
        'MainApp',
        'controller/TrendingHotelDestinationController'
    ], function(App, Router, MainApp, TrendingHotelDestinationController) {
        new Router();
        new App();
        MainApp.initializeLayout();
    });
})();