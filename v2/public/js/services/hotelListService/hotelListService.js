define(['backbone', '../../channel',
    'HotelsExpediaCollection',
    'HotelsTravelocityCollection',
    'SaveHotelRequestModel',
    'SaveApiHotelResponseModel',
    'HotelCollection',
    'App'
],
    function(Backbone, Channel, HotelListExpedia, HotelListTravelocity, SaveHotelRequestModel, SaveApiHotelResponseModel, HotelCollection, App) {
        var hotelIdMap = [];
        var expediaResult = [];
        var travelocityResult = [];
        var finalResult = [];

        /*$.getJSON( "js/hotelmap.json", function( data ) {
         hotelIdMap = data;
         console.log(hotelIdMap);
         });*/
        Channel.on("HotelList", function(formData) {
            $('.ajaxLoader').css("display", "block");
            var that = this;
            var saveHotelRequestModel = new SaveHotelRequestModel();
            var saveApiHotelResponseModel = new SaveApiHotelResponseModel();
            var hotelCollection = new HotelCollection();
            var app = new App();

            saveHotelRequestModel.fetch({
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                },
                data: JSON.stringify(formData)
            });

            hotelCollection.fetch({
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                },
                data: JSON.stringify(formData),
                success: function(res) {
                    var parsedIntermediateJSON;
                    if (res.length > 0) {
                        parsedIntermediateJSON = app.generateIntermediateJSON("expedia", 457509, res.models[0].attributes.HotelList);
                        getListFromTravelocity();
                        expediaResult = parsedIntermediateJSON;
                    } else {
                        new HotelListExpedia(formData).fetch({
                            success: function(data) {
                                var HotelList = data.models[0].attributes.HotelListResponse.HotelList;

                                if (!_.isUndefined(HotelList)) {
                                    parsedIntermediateJSON = app.generateIntermediateJSON("expedia", 457509, HotelList.HotelSummary);
                                    getListFromTravelocity();
                                    expediaResult = parsedIntermediateJSON;
                                    saveApiHotelResponseModel.fetch({
                                        type: 'POST',
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('Content-Type', 'application/json');
                                        },
                                        data: JSON.stringify({HotelList: HotelList.HotelSummary}),
                                        success: function(res) {
                                            console.log(res);
                                        }
                                    });
                                } else {
                                    alert(data.models[0].attributes.HotelListResponse.EanWsError.presentationMessage);
                                }

                            },
                            error: function() {
                                alert('failure');
                            }
                        });
                    }
                }
            });



            function getListFromTravelocity() {
                new HotelListTravelocity(formData).fetch({
                    success: function(data) {
                        var parsedIntermediateJSON = app.generateIntermediateJSON("travelocity", 457509, data.models[0].attributes.HotelListResponse);
                        travelocityResult = parsedIntermediateJSON;
                        compareJSON();
                        triggerRoute();
                    },
                    error: function() {
                        alert('failure');
                    }
                });
            }

            function compareJSON() {
                var hotelIdMap = hotelMapJSON;
                var expediaIds = [];
                var travelocityIds = [];

                for (var i = 0; i < expediaResult.HotelListResponse.HotelList.Hotels.length; i++) {
                    var expediaObject = expediaResult.HotelListResponse.HotelList.Hotels[i];
                    var fromExpedia = expediaObject.hotelId;
                    for (var k = 0; k < hotelIdMap.length; k++) {
                        if (hotelIdMap[k].expedia == fromExpedia) {
                            var commonId = hotelIdMap[k].travelocity;
                            for (var j = 0; j < travelocityResult.HotelListResponse.HotelList.Hotels.length; j++) {
                                var travelocityObject = travelocityResult.HotelListResponse.HotelList.Hotels[j];
                                var fromTravelocity = travelocityObject.hotelId;
                                if (commonId == fromTravelocity) {
                                    if (expediaObject.lowRate <= travelocityObject.lowRate) {
                                        travelocityIds[travelocityIds.length] = fromTravelocity;
                                    } else {
                                        expediaIds[expediaIds.length] = fromExpedia;
                                    }
                                    break;
                                } else {
                                    continue;
                                }
                            }
                        }
                    }
                }

                for (var m = 0; m < travelocityResult.HotelListResponse.HotelList.Hotels.length; m++) {
                    for (var s = 0; s < travelocityIds.length; s++) {
                        if (travelocityResult.HotelListResponse.HotelList.Hotels[m].hotelId == travelocityIds[s]) // delete index
                        {
                            travelocityResult.HotelListResponse.HotelList.Hotels.splice(m, 1);
                            m = m - 2;
                            break;
                        }
                    }
                };

                for (var n = 0; n < expediaResult.HotelListResponse.HotelList.Hotels; n++) {
                    for (var t = 0; t < expediaIds.length; t++) {
                        if (expediaResult.HotelListResponse.HotelList.Hotels[n].hotelId == expediaIds[t]) // delete index
                        {
                            expediaResult.HotelListResponse.HotelList.Hotels.splice(n, 1);
                            n = n - 2;
                            break;
                        }
                    }
                };

                function jsonConcat(o1, o2) {
                    for (var key in o2) {
                        o1[key] = o2[key];
                    }
                    return o1;
                }

                var output = {};
                output = jsonConcat(output, expediaResult);
                output.HotelListResponse.HotelList.Hotels = output.HotelListResponse.HotelList.Hotels.concat(travelocityResult.HotelListResponse.HotelList.Hotels);

                Backbone.application.Router.HotelList = {
                    "HotelListResponse": "",
                    "providerResponse": ""
                };
                Backbone.application.Router.HotelList.HotelListResponse = output.HotelListResponse.HotelList.Hotels;
            }

            function triggerRoute() {
                if (window.location.hash == '#home/hotels') {
                    Backbone.application.Router.navigate('#home', {
                        trigger: false
                    });
                }
                Backbone.application.Router.navigate('home/hotels', {
                    trigger: true
                });
                $('.ajaxLoader').css("display", "none");
            }
        });
    });