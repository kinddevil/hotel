// Paths and Shims
require.config({
    paths: {
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        'text': '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text',
        'bootstrap': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min',

        // 'jquery': '../lib/jquery',
        // 'underscore': '../lib/underscore',
        // 'backbone': '../lib/backbone',
        // 'text': '../lib/text',
        // 'bootstrap': '../lib/bootstrap',


        // Templates
        'HomeViewTpl': '../tpl/HomeViewTpl.html',
        'AboutViewTpl': '../tpl/AboutViewTpl.html',
        'AnalyticsViewTpl': '../tpl/AnalyticsViewTpl.html',
        'HeaderViewTpl': '../tpl/HeaderViewTpl.html',
        'FooterViewTpl': '../tpl/FooterViewTpl.html',
        'ProfileViewTpl': '../tpl/ProfileViewTpl.html',
        'ResultViewTpl': '../tpl/ResultViewTpl.html',
        'DstnViewTpl': '../tpl/DstnViewTpl.html',
        'HotelsViewTpl': '../tpl/HotelsViewTpl.html',
        'SignupViewTpl': '../tpl/SignupViewTpl.html',
        'DealsViewTpl': '../tpl/DealsViewTpl.html',
        'HotelDealsViewTpl': '../tpl/HotelDealsViewTpl.html',
        'FilterViewTpl': '../tpl/FilterViewTpl.html',
        
        // Views
        'AboutView': 'views/about',
        'ResultsView': 'views/results',
        'HeaderView': 'views/header',
        'FooterView': 'views/footer',
        'FilterView': 'views/filter',
        'paginator': 'views/paginator',

        'DstnsView': 'views/dstns',
        'HotelsView': 'views/hotels',

        'DealsView': 'views/deals',
        'HotelDealsView': 'views/hoteldeals',


        'ProfileView': 'views/profile',
        'AnalyticsView': 'views/analytics',
        'SignupView': 'views/signup',
        'HomeView': 'views/home',
        'DealsContainerView': 'views/deals-container',
        'HotelDealsContainerView': 'views/hoteldeals-container',
        
        // Models
        'Dstn': 'models/destination',
        'Hotel': 'models/hotel',
        'Deal': 'models/deal',
        'HotelDeal': 'models/hoteldeal',
        
        // Collections
        'Dstns': 'collections/destinations',
        'Hotels': 'collections/hotels',
        'Deals': 'collections/deals',
        'HotelDeals': 'collections/hoteldeals'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        }

    }
});

// Initiate Router
require(['jquery', 'underscore', 'backbone', 'approuter', 'bootstrap'], function($, _, Backbone, AppRouter) {
    $(function() {

        window.app = new AppRouter();
        console.log("Initiate AppRouter");
        Backbone.history.start();
    });
});