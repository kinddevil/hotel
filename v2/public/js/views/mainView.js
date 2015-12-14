	define(['backbone', 'text!../templates/searchTemplate.html',
	        'bootstrapDP',
	        '../channel',
	        'DestinationsCollection',
	        'jqueryAC',
	        'views/hotelListView', 'views/signView'
	    ],
	    function(Backbone, SearchTemplate, Datepicker, Channel, destinationJSON, AutoComplete,
	        HotelListView, SignView) {

	        var SearchView = Backbone.View.extend({

	            el: '#searchView',

	            initialize: function(options) {
	                _.extend(this, _.pick(options, "SearchData"));
	                this.render();
	            },
	            render: function() {
	                var that = this;

	                this.template = _.template(SearchTemplate);

	                $(this.el).html(this.template({
	                    SearchData: this.SearchData
	                }));

	                this.datePickerInitialize(null, null);

	                this.populateAutoComplete(autoCompleteJSON);
	            },
	            populateAutoComplete: function(data) {
	                this.AutoComepleteJSON = data;
	                $.widget("custom.catcomplete", $.ui.autocomplete, {
	                    _renderMenu: function(ul, items) {
	                        var that = this,
	                            currentCategory = "";
	                        $.each(items, function(index, item) {
	                            if (item.category != currentCategory) {
	                                ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
	                                currentCategory = item.category;
	                            }
	                            that._renderItemData(ul, item);
	                        });
	                    }
	                });
	                $("#destination").catcomplete({
	                    delay: 1,
	                    minLength: 3,
	                    source: this.AutoComepleteJSON
	                });
	            },
	            events: {
	                "click #addRoomButton": "addRooms",
	                "click .deleteRoom": "deleteRoom",
	                "click #searchHotels": "generateFormData"
	            },
	            addRooms: function() {
	                if ($('#roomDetails > li').length < 8) {
	                    $('#roomDetails').append(this.AddRoomTemplate({
	                        RoomDetails: null,
	                        n: $('#roomDetails > li').length
	                    }));
	                }
	            },
	            deleteRoom: function(event) {
	                var selectedId = $(event.currentTarget).attr("id").split("-")[1];
	                var formData = {
	                    roomGroup: []
	                };
	                var count = 0;
	                for (var i = 0; i < $('#roomDetails > li').length; i++) {
	                    if (i != selectedId) {
	                        formData.roomGroup[count] = {
	                            numberOfAdults: $('#adultCountRoom' + (i + 1)).val()
	                        };
	                        if ($('#childrenCountRoom' + (i + 1)).val() > 0) {
	                            formData.roomGroup[count] = {
	                                numberOfAdults: $('#adultCountRoom' + (i + 1)).val(),
	                                numberOfChildren: $('#childrenCountRoom' + (i + 1)).val()
	                            };
	                        }
	                        count++;
	                    }
	                }
	                $('#roomDetails').html(this.AddRoomTemplate({
	                    RoomDetails: formData.roomGroup
	                }));
	                for (var i = 0; i < formData.roomGroup.length; i++) {
	                    var adultId = "#adultCountRoom" + (i + 1);
	                    var childId = "#childrenCountRoom" + (i + 1);
	                    $(adultId).val(formData.roomGroup[i].numberOfAdults);
	                    $(childId).val(formData.roomGroup[i].numberOfChildren ? formData.roomGroup[i].numberOfChildren : 0);
	                }
	            },
	            datePickerInitialize: function(arrivalDate, departureDate) {

	                var arrDate = '';
	                var depDate = '';

	                if (arrivalDate == null && departureDate == null) {
	                    var nowTemp = new Date();
	                    arrDate = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	                    depDate = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate() + 2, 0, 0, 0, 0);
	                } else {
	                    var arrivalDateParts = arrivalDate.split('/');
	                    var departureDateParts = departureDate.split('/');
	                    arrDate = new Date(arrivalDateParts[2], arrivalDateParts[0] - 1, arrivalDateParts[1], 0, 0, 0, 0);
	                    depDate = new Date(departureDateParts[2], departureDateParts[0] - 1, departureDateParts[1], 0, 0, 0, 0);
	                }

	                $('#checkInDate').val(arrDate.getMonth() + 1 + "/" + arrDate.getDate() + "/" + arrDate.getFullYear());
	                $('#checkOutDate').val(depDate.getMonth() + 1 + "/" + depDate.getDate() + "/" + depDate.getFullYear());

	                var checkin = $('#checkInDate').datepicker({
	                    onRender: function(date) {
	                        return date.valueOf() < arrDate.valueOf() ? 'disabled' : '';
	                    }
	                }).on('changeDate', function(ev) {
	                    if (ev.date.valueOf() > checkout.date.valueOf()) {
	                        var newDate = new Date(ev.date);
	                        newDate.setDate(newDate.getDate() + 2);
	                        checkout.setValue(newDate);
	                    }
	                    checkin.hide();
	                    $('#checkOutDate')[0].focus();
	                }).data('datepicker');

	                var checkout = $('#checkOutDate').datepicker({
	                    onRender: function(date) {
	                        return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
	                    }
	                }).on('changeDate', function(ev) {
	                    checkout.hide();
	                }).data('datepicker');


	            },
	            generateFormData: function(event) {
	                var formData = {
	                    city: $('#destination').val(),
	                    arrivalDate: $('#checkInDate').val(),
	                    departureDate: $('#checkOutDate').val(),
	                    roomGroup: [],
	                    dateless: false
	                };
	                for (var i = 0; i < $('#roomDetails > li').length; i++) {
	                    formData.roomGroup[i] = {
	                        numberOfAdults: $('#adultCountRoom' + (i + 1)).val()
	                    };
	                    if ($('#childrenCountRoom' + (i + 1)).val() > 0) {
	                        formData.roomGroup[i] = {
	                            numberOfAdults: $('#adultCountRoom' + (i + 1)).val(),
	                            numberOfChildren: $('#childrenCountRoom' + (i + 1)).val()
	                        };
	                    }
	                }
	                if ($('#dateless').prop("checked")) {
	                    formData.dateless = true;
	                } else {
	                    formData.dateless = false;
	                }

	                localStorage.setItem("Search-Data", JSON.stringify(formData));

	                Channel.trigger("HotelList", formData);
	            }
	        });
	        var MainView = Backbone.View.extend({
	            el: '#mainView',
	            initialize: function() {
	                var that = this;
	                Channel.bind("HotelListView", function(HotelList) {
	                    if (that.HotelListView) {
	                        that.HotelListView.closeView();
	                    }
	                    that.HotelListView = new HotelListView({
	                        HotelList: HotelList
	                    });
	                });

	                this.render();
	            },
	            render: function() {
	                if (!localStorage.getItem("Search-Data")) {
	                    this.SearchView = new SearchView({
	                        SearchData: null
	                    });
			    		
	                } else {
	                    this.SearchView = new SearchView({
	                        SearchData: JSON.parse(localStorage.getItem("Search-Data"))
	                    });
	                }
	                this.SignView = new SignView({"data":null});
	            },
	            closeView: function() {
	                this.unbind();
	                this.undelegateEvents();
	                this.views = [];
	            }
	        });
	        return MainView;
	    });