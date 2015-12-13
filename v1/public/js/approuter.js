define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

    return Backbone.Router.extend({
        routes: {
            "": "home",
            "home": "home",
            "home/page/:page": "home",
            "hotels": "results",
            "deals": "deals",
            "hoteldeals": "hoteldeals",
            "about": "about",
            "analytics": "analytics",
            "signup": "signup"
        },
        initialize: function() {

        },
        setContent: function(htmlContent) {
            $('#content').html(htmlContent);
        },

        home: function(page) {
            var self = this;

            require(['../routes/home'], function(callback) {

                callback(page).done(function(htmlContent) {
                    self.setContent(htmlContent);
                });

            });

        },
        hotels: function(page) {
            var self = this;

            require(['../routes/results'], function(callback) {

                callback(page).done(function(htmlContent) {
                    self.setContent(htmlContent);
                });

            });

        },

        deals: function(page) {
            var self = this;

            require(['../routes/deals'], function(callback) {

                callback(page).done(function(htmlContent) {
                    self.setContent(htmlContent);
                });

            });

        },

        hoteldeals: function(page) {
            var self = this;

            require(['../routes/hoteldeals'], function(callback) {

                callback(page).done(function(htmlContent) {
                    self.setContent(htmlContent);
                });

            });

        },
        about: function() {

            var self = this;
            require(['../routes/about'], function(htmlContent) {
                self.setContent(htmlContent);
            });

        },
        analytics: function() {
            var self = this;
            require(['../routes/analytics'], function(htmlContent) {
                self.setContent(htmlContent);
            });

        },
        signup: function() {

        }
    });
});