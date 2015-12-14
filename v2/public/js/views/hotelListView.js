define(['backbone',
        'text!../templates/filter.html',
        'text!../templates/hotelList.html',

        '../channel',
        'jqueryAC'
    ],
    function(Backbone, FilterTemplate, HotelListTemplate, Channel, AutoComplete) {

        var FilterView = Backbone.View.extend({
            el: '#filterView',
            initialize: function(options) {
                _.extend(this, _.pick(options, "HotelList", "ProvidersInfo"));
                this.collection = this.HotelList;
                this.FilteredList = this.collection;
            },
            render: function(FilteredList) {

                var feedCollection = new Backbone.Collection();
                feedCollection.set(FilteredList);
                this.FilteredList = feedCollection;

                var that = this;

                var hotelNames = [];
                var providerNames = [];

                for (var i = 0; i < this.FilteredList.models.length; i++) {
                    hotelNames[i] = this.FilteredList.models[i].attributes.hotelName;
                }
                for (var j = 0; j < this.ProvidersInfo.length; j++) {
                    providerNames[j] = this.ProvidersInfo[j].provider;
                }

                this.template = _.template(FilterTemplate);
                $(this.el).html(this.template({
                    searchHotelName: $("#searchHotelName").val(),
                    filterProvider: $("#filterProvider").val()
                }));

                $("#searchHotelName").autocomplete({
                    delay: 0,
                    source: hotelNames,
                    select: function(event, ui) {
                        $("#searchHotelName").val(ui.item.value);
                        var filteredList = _(that.FilteredList.filter(function(model) {
                            return model.get('hotelName') == ui.item.value;
                        }));
                        that.FilteredList = new Backbone.Collection(filteredList["_wrapped"]);
                        Channel.trigger("UpdateList", that.FilteredList);
                    }
                });

                $("#filterProvider").autocomplete({
                    delay: 0,
                    source: providerNames,
                    select: function(event, ui) {
                        $("#filterProvider").val(ui.item.value);
                        var filteredList = _(that.FilteredList.filter(function(model) {
                            return model.get('provider') == ui.item.value;
                        }));
                        that.FilteredList = new Backbone.Collection(filteredList["_wrapped"]);
                        Channel.trigger("UpdateList", that.FilteredList);
                    }
                });

            },
            events: {
                "change #sorting": "sorting"
            },
            sorting: function(event) {
                var val = $(event.currentTarget).val().split("-");
                var sortedList = {};
                if (val.indexOf("hotelRating") >= 0) {
                    var sortBy = val[0];
                    var sort = val[1];
                    if (sort == "low") {
                        sortedList = _.sortBy(this.FilteredList.models, function(model) {
                            return model.attributes[sortBy];
                        });
                    } else if (sort == "high") {
                        sortedList = _.sortBy(this.FilteredList.models, function(model) {
                            return model.attributes[sortBy];
                        });
                        sortedList = sortedList.reverse();
                    }
                } else if (val.indexOf("hotelName") >= 0) {
                    sortedList = _.sortBy(this.FilteredList.models, function(model) {
                        return model.attributes[val];
                    });
                } else if (val.indexOf("price") >= 0) {
                    var sort = val[1];
                    if (sort == "low") {
                        sortedList = _.sortBy(this.FilteredList.models, function(model) {
                            return model.attributes["lowRate"] / 1;
                        });
                    } else if (sort == "high") {
                        sortedList = _.sortBy(this.FilteredList.models, function(model) {
                            return model.attributes["lowRate"] / 1;
                        });
                        sortedList = sortedList.reverse();
                    }
                }
                this.FilteredList.models = sortedList;
                Channel.trigger("UpdateList", this.FilteredList);
            }
        });

        var ListContainer = Backbone.View.extend({
            el: '#listView',
            initialize: function(options) {
                _.extend(this, _.pick(options, "HotelList"));
                var feedCollection = new Backbone.Collection();
                feedCollection.set(this.HotelList.HotelListResponse);
                this.collection = feedCollection;
                this.FilterView = new FilterView({
                    HotelList: this.collection,
                    ProvidersInfo: this.HotelList.providerResponse
                });
                this.render(this.collection);
                Channel.bind("UpdateList", this.render, this);
                var that = this;
                Channel.bind("RoomListView", function(RoomList) {
                    var feedCollection = new Backbone.Collection();
                    feedCollection.set(RoomList.HotelRoomResponse);
                    that.HotelInfo = RoomList;
                    that.RoomCollection = feedCollection;
                    var temp = _.template(RoomListTemplate);
                    $("li.selected .roomListContainer").html(temp({
                        collection: that.RoomCollection,
                        OtherInfo: that.HotelInfo
                    }));
                    setTimeout(function() {
                        $("li.selected .roomListContainer").slideDown('slow');
                    }, 10);

                });
            },
            render: function(collection) {
                console.log(collection);
                this.collection = collection;
                this.template = _.template(HotelListTemplate);
                this.ItemsPerPage = 10;
                this.IndexOfPage = 0;
                this.fillPage();
                this.FilterView.render(collection.models);
            },
            events: {
                "click .hotelList li .hotelListItem": "generateFormData",
                "click #paginator a": "listSelected",
                "change #noOfPages": "listNoSelected",
                "click .roomListItem": "generatePaymentView"
            },
            generatePagination: function() {
                $("#paginator").append("<li><a href='page0'>First<a></li>");
                if (this.IndexOfPage == 0) {
                    $("#paginator").append("<li>Prev</li>");
                } else {
                    $("#paginator").append("<li><a href='page" + (this.IndexOfPage - 1) + "'>Prev<a></li>");
                }
                for (var i = this.IndexOfPage; i < (this.IndexOfPage + 4); i++) {
                    if (i == this.Pages) {
                        break;
                    }
                    if (i == this.IndexOfPage) {
                        var listEl = "<li>" + (i + 1) + "</li>";
                    } else {
                        var listEl = "<li><a href='page" + i + "'>" + (i + 1) + "<a></li>";
                    }
                    $("#paginator").append(listEl);
                }
                if (this.IndexOfPage == this.Pages - 1) {
                    $("#paginator").append("<li>Next</li>");
                } else {
                    $("#paginator").append("<li><a href='page" + (this.IndexOfPage + 1) + "'>Next<a></li>");
                }
                $("#paginator").append("<li><a href='page" + (this.Pages - 1) + "'>Last<a></li>");
            },
            fillPage: function() {
                this.Pages = Math.floor(this.collection.models.length / this.ItemsPerPage);
                var rem = this.collection.models.length % this.ItemsPerPage;
                if (rem != 0) {
                    this.Pages = this.Pages + 1;
                }
                var maxLength = this.IndexOfPage * this.ItemsPerPage + this.ItemsPerPage > this.collection.models.length ? this.collection.models.length : this.IndexOfPage * this.ItemsPerPage + this.ItemsPerPage;
                $(this.el).html(this.template({
                    collection: this.collection,
                    offset: this.IndexOfPage * this.ItemsPerPage,
                    maxLength: maxLength
                }));
                $("#noOfPages").val(this.ItemsPerPage);
                if (this.collection.models.length >= this.ItemsPerPage) {
                    this.generatePagination();
                }

            },
            generateFormData: function(event) {
                $(".hotelList li").removeClass('selected');
                $(".hotelList li .roomListContainer").slideUp('fast', function() {
                    $(".hotelList li .roomListContainer").html("");
                });
                $(event.currentTarget).parent().addClass("selected");
                var selectedModel = this.collection.get($(event.currentTarget).attr("id"));
                console.log(selectedModel);
                var formData = {
                    hotelId: selectedModel.get("hotelId"),
                    arrivalDate: $('#checkInDate').val(),
                    departureDate: $('#checkOutDate').val(),
                    roomGroup: []
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
                Channel.trigger("RoomList", formData, selectedModel.get("provider"));
            },
            listSelected: function(event) {
                event.preventDefault();
                this.IndexOfPage = $(event.currentTarget).attr("href").split("page")[1] / 1;
                this.fillPage();
            },
            listNoSelected: function(event) {
                event.preventDefault();
                this.IndexOfPage = 0;
                this.ItemsPerPage = $(event.currentTarget).val() / 1;
                this.fillPage();
            },
            generatePaymentView: function(event) {
                var selectedModel = this.RoomCollection.get($(event.currentTarget).attr("id"));
                Channel.trigger("Payment", selectedModel.attributes, this.HotelInfo);
            },
            closeView: function() {
                this.unbind();
                this.undelegateEvents();
                this.views = [];
            }
        });

        return ListContainer;
    });