define(['backbone',
    'services/hotelListService/hotelListService',
    'services/signService/signService'
],
    function(Backbone, Router, HotelListService, SignService) {
        var App = Backbone.View.extend({
            initialize: function() {
                if (!localStorage.getItem("url")) {
                    Backbone.application.Router.navigate('home', {
                        trigger: true
                    });
                } else {
                    Backbone.application.Router.navigate(localStorage.getItem("url"), {
                        trigger: true
                    });
                }
            },

            generateIntermediateJSON: function(providerName, providerId, data) {
                var intermediateJSON = {
                    "HotelListResponse": {
                        "HotelList": {
                            "Hotels": []
                        }
                    }
                };
                if (providerName == "expedia") {
                    var hotelList = data;
                    for (var i = 0; i < hotelList.length; i++) {
                        var hotels = intermediateJSON.HotelListResponse.HotelList.Hotels;
                        hotels[i] = {
                            "@ubsScore": hotelList[i]["@ubsScore"] == undefined ? "-" : hotelList[i]["@ubsScore"],
                            "@order": hotelList[i]["@order"] == undefined ? "-" : hotelList[i]["@order"],
                            "provider": providerName, // New "provider": "travelocity"
                            "providerId": providerId, // New
                            "hotelId": hotelList[i]["hotelId"] == undefined ? "-" : hotelList[i]["hotelId"],
                            "hotelName": hotelList[i]["name"] == undefined ? "-" : hotelList[i]["name"], // changed from name
                            "address": hotelList[i]["address"] == undefined ? "-" : hotelList[i]["address"], // changed from address1
                            "city": hotelList[i]["city"] == undefined ? "-" : hotelList[i]["city"],
                            "stateProvinceCode": hotelList[i]["stateProvinceCode"] == undefined ? "-" : hotelList[i]["stateProvinceCode"],
                            "postalCode": hotelList[i]["postalCode"] == undefined ? "-" : hotelList[i]["postalCode"],
                            "countryCode": hotelList[i]["countryCode"] == undefined ? "-" : hotelList[i]["countryCode"],
                            "airportCode": hotelList[i]["airportCode"] == undefined ? "-" : hotelList[i]["airportCode"],
                            "supplierType": hotelList[i]["supplierType"] == undefined ? "-" : hotelList[i]["supplierType"],
                            "propertyCategory": hotelList[i]["propertyCategory"] == undefined ? "-" : hotelList[i]["propertyCategory"],
                            "hotelRating": hotelList[i]["hotelRating"] == undefined ? "-" : hotelList[i]["hotelRating"],
                            "confidenceRating": hotelList[i]["confidenceRating"] == undefined ? "-" : hotelList[i]["confidenceRating"],
                            "amenityMask": hotelList[i]["amenityMask"] == undefined ? "-" : hotelList[i]["amenityMask"],
                            "tripAdvisorRating": hotelList[i]["tripAdvisorRating"] == undefined ? "-" : hotelList[i]["tripAdvisorRating"],
                            "tripAdvisorReviewCount": hotelList[i]["tripAdvisorReviewCount"] == undefined ? "-" : hotelList[i]["tripAdvisorReviewCount"],
                            "tripAdvisorRatingUrl": hotelList[i]["tripAdvisorRatingUrl"] == undefined ? "-" : hotelList[i]["tripAdvisorRatingUrl"],
                            "locationDescription": hotelList[i]["locationDescription"] == undefined ? "-" : hotelList[i]["locationDescription"],
                            "shortDescription": hotelList[i]["shortDescription"] == undefined ? "-" : hotelList[i]["shortDescription"],
                            "highRate": hotelList[i]["highRate"] == undefined ? "-" : hotelList[i]["highRate"],
                            "lowRate": hotelList[i]["lowRate"] == undefined ? "-" : hotelList[i]["lowRate"],
                            "rateCurrencyCode": hotelList[i]["rateCurrencyCode"] == undefined ? "-" : hotelList[i]["rateCurrencyCode"],
                            "latitude": hotelList[i]["latitude"] == undefined ? "-" : hotelList[i]["latitude"],
                            "longitude": hotelList[i]["longitude"] == undefined ? "-" : hotelList[i]["longitude"],
                            "proximityDistance": hotelList[i]["proximityDistance"] == undefined ? "-" : hotelList[i]["proximityDistance"],
                            "proximityUnit": hotelList[i]["proximityUnit"] == undefined ? "-" : hotelList[i]["proximityUnit"],
                            "hotelInDestination": hotelList[i]["hotelInDestination"] == undefined ? "-" : hotelList[i]["hotelInDestination"],
                            "thumbNailUrl": hotelList[i]["thumbNailUrl"] == undefined ? "-" : hotelList[i]["thumbNailUrl"],
                            "deepLink": hotelList[i]["deepLink"] == undefined ? "-" : hotelList[i]["deepLink"],
                            "RoomRateDetails": {
                                "roomTypeCode": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["roomTypeCode"],
                                "rateCode": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["rateCode"],
                                "maxRoomOccupancy": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["maxRoomOccupancy"],
                                "quotedRoomOccupancy": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["quotedRoomOccupancy"],
                                "minGuestAge": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["minGuestAge"],
                                "roomDescription": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["roomDescription"],
                                "promoId": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["promoId"],
                                "promoDescription": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["promoDescription"],
                                "currentAllotment": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["currentAllotment"],
                                "propertyAvailable": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["propertyAvailable"],
                                "propertyRestricted": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["propertyRestricted"],
                                "expediaPropertyId": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["expediaPropertyId"],
                                "rateKey": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["rateKey"],
                                "nonRefundable": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["nonRefundable"],
                                "RateInfos": {
                                    "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos["@size"],
                                    "RateInfo": {
                                        "@rateChange": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo["@rateChange"],
                                        "@promo": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo["@promo"],
                                        "@priceBreakdown": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo["@priceBreakdown"],
                                        "RoomGroup": {
                                            "Room": {
                                                "numberOfAdults": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room["numberOfAdults"],
                                                "numberOfChildren": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room["numberOfChildren"]
                                            }
                                        },
                                        "ChargeableRateInfo": {
                                            "@commissionableUsdTotal": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@commissionableUsdTotal"],
                                            "@total": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@total"],
                                            "@surchargeTotal": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@surchargeTotal"],
                                            "@nightlyRateTotal": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@nightlyRateTotal"],
                                            "@averageBaseRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageBaseRate"],
                                            "@averageRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageRate"],
                                            "@maxNightlyRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@maxNightlyRate"],
                                            "@currencyCode": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@currencyCode"],
                                            "NightlyRatesPerRoom": {
                                                "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom["@size"],
                                                "NightlyRate": {
                                                    "@promo": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate["@promo"],
                                                    "@rate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate["@rate"],
                                                    "@baseRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate["@baseRate"]
                                                }
                                            }
                                            /*,
                                             "Surcharges": {
                                             "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges["@size"],
                                             "Surcharge": {
                                             "@amount": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge["@amount"],
                                             "@type": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge["@type"]
                                             }
                                             }*/
                                        }
                                        /*,
                                         "HotelFees":{
                                         "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees["@size"],
                                         "HotelFee":{
                                         "@amount": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee["@amount"],
                                         "@description": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee["@description"]
                                         }
                                         }*/
                                    }
                                }
                                /*,
                                 "ValueAdds":{
                                 "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds["@size"],
                                 "ValueAdd":{
                                 "@id": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd["@id"],
                                 "description": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd["description"]
                                 }

                                 }*/
                            }

                        };
                        var nightlyRate = hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate;
                        for (var j = 0; j < nightlyRate.length; j++) {
                            hotels[i].RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate[j] = nightlyRate[j];
                        }
                        /*var surcharge = hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge;
                         for(var j=0;j<surcharge.length;j++){
                         hotels[i].RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge[j] =surcharge[j];
                         }*/
                    }
                } else if (providerName == "travelocity") {
                    var hotelList = data;
                    for (var i = 0; i < hotelList.length; i++) {
                        var hotels = intermediateJSON.HotelListResponse.HotelList.Hotels;
                        hotels[i] = {
                            "@ubsScore": hotelList[i]["@ubsScore"] == undefined ? "-" : hotelList[i]["@ubsScore"],
                            "@order": hotelList[i]["@order"] == undefined ? "-" : hotelList[i]["@order"],
                            "provider": providerName, // New "provider": "travelocity"
                            "providerId": providerId, // New
                            "hotelId": hotelList[i]["hotelId"] == undefined ? "-" : hotelList[i]["hotelId"],
                            "hotelName": hotelList[i]["name"] == undefined ? "-" : hotelList[i]["name"], // changed from name
                            "address": hotelList[i]["address"] == undefined ? "-" : hotelList[i]["address"], // changed from address1
                            "city": hotelList[i]["city"] == undefined ? "-" : hotelList[i]["city"],
                            "stateProvinceCode": hotelList[i]["stateProvinceCode"] == undefined ? "-" : hotelList[i]["stateProvinceCode"],
                            "postalCode": hotelList[i]["postalCode"] == undefined ? "-" : hotelList[i]["postalCode"],
                            "countryCode": hotelList[i]["countryCode"] == undefined ? "-" : hotelList[i]["countryCode"],
                            "airportCode": hotelList[i]["airportCode"] == undefined ? "-" : hotelList[i]["airportCode"],
                            "supplierType": hotelList[i]["supplierType"] == undefined ? "-" : hotelList[i]["supplierType"],
                            "propertyCategory": hotelList[i]["propertyCategory"] == undefined ? "-" : hotelList[i]["propertyCategory"],
                            "hotelRating": hotelList[i]["hotelRating"] == undefined ? "-" : hotelList[i]["hotelRating"],
                            "confidenceRating": hotelList[i]["confidenceRating"] == undefined ? "-" : hotelList[i]["confidenceRating"],
                            "amenityMask": hotelList[i]["amenityMask"] == undefined ? "-" : hotelList[i]["amenityMask"],
                            "tripAdvisorRating": hotelList[i]["tripAdvisorRating"] == undefined ? "-" : hotelList[i]["tripAdvisorRating"],
                            "tripAdvisorReviewCount": hotelList[i]["tripAdvisorReviewCount"] == undefined ? "-" : hotelList[i]["tripAdvisorReviewCount"],
                            "tripAdvisorRatingUrl": hotelList[i]["tripAdvisorRatingUrl"] == undefined ? "-" : hotelList[i]["tripAdvisorRatingUrl"],
                            "locationDescription": hotelList[i]["locationDescription"] == undefined ? "-" : hotelList[i]["locationDescription"],
                            "shortDescription": hotelList[i]["shortDescription"] == undefined ? "-" : hotelList[i]["shortDescription"],
                            "highRate": hotelList[i]["highRate"] == undefined ? "-" : hotelList[i]["highRate"],
                            "lowRate": hotelList[i]["lowRate"] == undefined ? "-" : hotelList[i]["lowRate"],
                            "rateCurrencyCode": hotelList[i]["rateCurrencyCode"] == undefined ? "-" : hotelList[i]["rateCurrencyCode"],
                            "latitude": hotelList[i]["latitude"] == undefined ? "-" : hotelList[i]["latitude"],
                            "longitude": hotelList[i]["longitude"] == undefined ? "-" : hotelList[i]["longitude"],
                            "proximityDistance": hotelList[i]["proximityDistance"] == undefined ? "-" : hotelList[i]["proximityDistance"],
                            "proximityUnit": hotelList[i]["proximityUnit"] == undefined ? "-" : hotelList[i]["proximityUnit"],
                            "hotelInDestination": hotelList[i]["hotelInDestination"] == undefined ? "-" : hotelList[i]["hotelInDestination"],
                            "thumbNailUrl": hotelList[i]["thumbNailUrl"] == undefined ? "-" : hotelList[i]["thumbNailUrl"],
                            "deepLink": hotelList[i]["deepLink"] == undefined ? "-" : hotelList[i]["deepLink"],
                            "RoomRateDetails": {
                                "roomTypeCode": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["roomTypeCode"],
                                "rateCode": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["rateCode"],
                                "maxRoomOccupancy": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["maxRoomOccupancy"],
                                "quotedRoomOccupancy": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["quotedRoomOccupancy"],
                                "minGuestAge": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["minGuestAge"],
                                "roomDescription": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["roomDescription"],
                                "promoId": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["promoId"],
                                "promoDescription": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["promoDescription"],
                                "currentAllotment": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["currentAllotment"],
                                "propertyAvailable": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["propertyAvailable"],
                                "propertyRestricted": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["propertyRestricted"],
                                "expediaPropertyId": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["expediaPropertyId"],
                                "rateKey": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["rateKey"],
                                "nonRefundable": hotelList[i].RoomRateDetailsList.RoomRateDetails == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails["nonRefundable"],
                                "RateInfos": {
                                    "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos["@size"],
                                    "RateInfo": {
                                        "@rateChange": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo["@rateChange"],
                                        "@promo": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo["@promo"],
                                        "@priceBreakdown": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo["@priceBreakdown"],
                                        "RoomGroup": {
                                            "Room": {
                                                "numberOfAdults": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room["numberOfAdults"],
                                                "numberOfChildren": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.RoomGroup.Room["numberOfChildren"]
                                            }
                                        },
                                        "ChargeableRateInfo": {
                                            "@commissionableUsdTotal": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@commissionableUsdTotal"],
                                            "@total": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@total"],
                                            "@surchargeTotal": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@surchargeTotal"],
                                            "@nightlyRateTotal": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@nightlyRateTotal"],
                                            "@averageBaseRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageBaseRate"],
                                            "@averageRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageRate"],
                                            "@maxNightlyRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@maxNightlyRate"],
                                            "@currencyCode": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@currencyCode"],
                                            "NightlyRatesPerRoom": {
                                                "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom["@size"],
                                                "NightlyRate": {
                                                    "@promo": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate["@promo"],
                                                    "@rate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate["@rate"],
                                                    "@baseRate": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate == undefined ? "-" : hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate["@baseRate"]
                                                }
                                            }
                                            /*,
                                             "Surcharges": {
                                             "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges["@size"],
                                             "Surcharge": {
                                             "@amount": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge["@amount"],
                                             "@type": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge["@type"]
                                             }
                                             }*/
                                        }
                                        /*,
                                         "HotelFees":{
                                         "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees["@size"],
                                         "HotelFee":{
                                         "@amount": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee["@amount"],
                                         "@description": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.HotelFees.HotelFee["@description"]
                                         }
                                         }*/
                                    }
                                }
                                /*,
                                 "ValueAdds":{
                                 "@size": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds["@size"],
                                 "ValueAdd":{
                                 "@id": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd["@id"],
                                 "description": hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd==undefined?"-":hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.ValueAdds.ValueAdd["description"]
                                 }

                                 }*/
                            }

                        };
                        var nightlyRate = hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate;
                        for (var j = 0; j < nightlyRate.length; j++) {
                            hotels[i].RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.NightlyRatesPerRoom.NightlyRate[j] = nightlyRate[j];
                        }
                        /*var surcharge = hotelList[i].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge;
                         for(var j=0;j<surcharge.length;j++){
                         hotels[i].RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo.Surcharges.Surcharge[j] =surcharge[j];
                         }*/
                    }
                }
                console.log(intermediateJSON);
                return intermediateJSON;
            }
        });
        return App;
    });