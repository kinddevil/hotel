	define(['backbone', 'text!../templates/signinTemplate.html', 'text!../templates/signupTemplate.html' ,
			 'text!../templates/profileTemplate.html' , '../channel',
			  'text!../currency.js' ,
			  'jqueryAC'
	    ],
	    function(Backbone, SigninTemplate, SignupTemplate, ProfileTemplate, Channel, CurrencyJSON, jqueryUI ) {
	    	var currencyJSON = JSON.parse(CurrencyJSON);
	    	var SignView = Backbone.View.extend({

	    		el: "#sign",

	    		initialize: function(options){
	    			this.render();
	    			this.showup = true;
	    			this.state = 'out';
	    		},

	    		render: function(){
	    			var userinfo = this.getCookie('userinfo');
	    			if (userinfo){
	    				try{
	    					var userJson = JSON.parse(userinfo);
	    					$(".sign font", this.el).text(" Hi, " + userJson.firstname + "  " + userJson.lastname + " " + (userJson.currency?"("+userJson.currency+")":'') );	
	    					$(".out", this.el).css("display","inline");
	    					SignView.state = 'in';
	    					$("#signBtn").css('display', 'none');
	    					this.actionView = new ActionView();
	    				}catch (err){
	    					console.log(err);
	    					$(".sign font", this.el).text("Sign in");	
	    					$(".out", this.el).css("display","none");
	    					SignView.state = 'out';
	    				}
	    			}else {
	    				$(".sign font", this.el).text("Sign in");
	    				$(".out", this.el).css("display","none");
	    				SignView.state = 'out';
	    				if (this.actionView){
	    					$(this.actionView.el).unbind('click');
	    					this.showup = true;
	    					$('#signBtn').unbind('click');
	    				}	
	    			}
	    		},

	    		events: {
	    			'click .sign' : 'signin',
	    			'click .out'  : 'logout',
	    			'receivedata' : 'receivedata'
	    		},

	    		signin: function(evt){
	    			if (SignView.state=='out'){
	    				new SigninView({'showUp': this.showup});
	    				this.showup = !this.showup;
	    			}else{
	    				new ProfileView({'showUp': this.showup});
	    				this.showup = !this.showup;
	    			}
	    		},

	    		logout: function(){
	    			this.setCookie('userinfo', "", -1);
	    			SignView.state=='out';
	    			this.render();
	    		},

	    		receivedata : function(evt, data){
					this.setCookie("userinfo", JSON.stringify(data));
					this.render();
				},

	    		validateFormDate : function(formdata){
	    			for (var e in formdata){
	    				if (!formdata[e] || (typeof formdata[e] == 'string' &&  formdata[e]=="" ) ) {
	    					$("form", this.el).append("<div id='errorMsg'><font color='red'>" + e + " is empty" + "</font></div>");
	    					return false;
	    				}
	    			}
	    			return true;
	    		},

	    		getCookie: function(name){
	    			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     				if(arr != null) return unescape(arr[2]); return null;
	    		},

	    		setCookie: function ( name, value, expires, path, domain, secure ) {
				    var today = new Date();     
				    today.setTime( today.getTime() );    
				    if ( expires ) {
				        expires = expires * 1000 * 60 * 60 * 24;     
				    }     
				    var expires_date = new Date( today.getTime() + (expires) );     
				    document.cookie = name+'='+escape( value ) +         
				        ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + 
				        ( ( path ) ? ';path=' + path : '' ) +
				        ( ( domain ) ? ';domain=' + domain : '' ) +
				        ( ( secure ) ? ';secure' : '' ); 
				}

	    	});

	    	var SigninView = SignView.extend({

	    		el: "#signBtn",

	    		initialize: function(options){
	    			_.extend(this, options);
	    			this.render(this.showUp);
	    		},

	    		render: function(showUp){
	    			if (showUp){
	    				this.template = _.template(SigninTemplate);
		    			$(this.el).html(this.template({

		    			}));
		    			$(this.el).css('display','block');	
	    			}else
	    				$(this.el).html("");
	    		},

	    		events: {
	    			'click #signinBtn' : 'signin',
	    			'click #outlookBtn' : 'microsignin',
	    			'click #facebookBtn' : 'facebooksignin',
	    			'click #googlekBtn' : 'googleksignin',
	    			'click #newuser' : 'signup'
	    		},

	    		signin : function(){
	    			$("#errorMsg", this.el).remove();
	    			var formData = {
	    				"email": $("#email").val().trim(),
	    				"password":  $("#password").val().trim()
	    			}
	    			if (!this.validateFormDate(formData))
	    				return false;

	    			Channel.trigger("SignInReq", formData);
	    		},

	    		signup : function(){
	    			$(this.el).off('click');
	    			new SignupView();
	    		},

	    		microsignin : function(){
	    			var formData = {"oauth" : "microsoft"};
	    			Channel.trigger("AuthReq", formData);
	    		},

	    		facebooksignin : function(){
	    			var formData = {"oauth" : "facebook"};
	    			Channel.trigger("AuthReq", formData);
	    		},

	    		googleksignin : function(){
	    			var formData = {"oauth" : "google"};
	    			Channel.trigger("AuthReq", formData);
	    		}

	    	});

	    	var SignupView = SignView.extend({

	    		el: "#signBtn",

	    		initialize: function(options){
	    			_.extend(this, options);
	    			this.render();
	    		},

	    		render: function(){
	    			this.template = _.template(SignupTemplate);
	    			$(this.el).html(this.template({

	    			}));
	    			//this.autocomplete(currencyJSON);
	    			this.completeOption(currencyJSON);
	    		},

	    		events: {
	    			'click #signupBtn' : 'signup',
	    			'click #olduser' : 'signin'
	    		},

	    		completeOption: function(data){
	    			for (var i in data){
	    				var select = data[i].default?'selected':''
	    				$("#currency").append('<option '+select+' value="'+data[i].value+'">'+data[i].label+'</option>');
	    			}
	    		},

	    		autocomplete: function(data) {
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
	                $("#currency").autocomplete({
	                    delay: 1,
	                    minLength: 1,
	                    source: this.AutoComepleteJSON
	                });
	    		},

	    		signup: function(){
	    			$("#errorMsg", this.el).remove();
	    			var formData = {
	    				"email": $("#email").val().trim(),
	    				"password":  $("#password").val().trim(),
	    				"firstname": $("#firstname").val().trim(),
	    				"lastname": $("#lastname").val().trim(),
	    				"currency": $("#currency").val()?$("#currency").val().trim():""
	    			}
	    			if (!this.validateFormDate(formData))
	    				return false;
	    			if ($("#password").val().trim() != $("#cpassword").val().trim()){
	    				$("form", this.el).append("<div id='errorMsg'><font color='red'>" + "passwords is not the same" + "</font></div>");
	    				return false;
	    			}
	    			formData.address = $("#address").val().trim();
	    			Channel.trigger("SignUpReq", formData);
	    		},

	    		signin: function(){
	    			new SigninView({'showUp': true});
	    		}
	    	});


			var ProfileView = SignView.extend({

				el: "#signBtn",

	    		initialize: function(options){
	    			_.extend(this, options);
	    			this.render(this.showUp);
	    		},

	    		render: function(showUp){
	    			if (showUp){
	    				var userinfo = this.getCookie('userinfo');
	    				if (!userinfo){
	    					alert("Can not get user information, please refresh.");
	    					return;
	    				}
	    				var jsonData = JSON.parse(userinfo);
	    				this.template = _.template(ProfileTemplate);
	    				$(this.el).css("display","block");
		    			$(this.el).html(this.template({

		    			}));
		    			this.fillInput(jsonData);
	    			}else
	    				$(this.el).html("");
	    		},

	    		fillInput: function(userinfo){
	    			$('input', this.el).each(function(i, v){
	    				var id = $(v).attr('id');
	    				if (userinfo[id])
	    					$(v).val(userinfo[id]);
	    			});
	    		}
			});

			var ActionView = Backbone.View.extend({
				el: 'body',
				initialize: function(options){
					$(this.el).off('click');
	    			_.extend(this, options);
	    		},

	    		render: function(){
	    			
	    		},

	    		events: {
	    			'click ' : 'tracelog'
	    		},

	    		tracelog: function(evt, data){
	    			var _target = evt.target;
	    			var _targetName = $(_target)[0].tagName;
	    			var formData = null;
	    			var userinfo = this.getCookie('userinfo');
	    			var uid = null;
	    			if (!userinfo){
	    				console.log("log: can not get uid");
	    				return;
	    			}else uid = JSON.parse(userinfo).email;

	    			if (_targetName=='A'){
	    				formData = this.getLinkAction(_targetName, _target);
	    			}else if (_targetName == "BUTTON"){
	    				formData = this.getSearchAction(_targetName, _target);
	    			}else return;

	    			formData.uid = uid;
	    			Channel.trigger("ActionTrcReq", formData);
	    		},

	    		getLinkAction: function(tagname, target){
	    			return {
	    				dom: tagname,
	    				action: 'click',
	    				time: new Date(),
	    				name: $(target).attr("name"),
	    				tagid: $(target).attr("id"),
	    			};
	    		},

	    		getSearchAction: function(tagname, target){
	    			var _parent = $(target).parent();
	    			var content = [];
	    			$("input" , _parent).each(function(i, v){
	    				content.push({
	    					name: $(v).attr('name'),
	    					value: $(v).val()
	    				});
	    			});
	    			return {
	    				dom: tagname,
	    				action: 'search',
	    				time: new Date(),
	    				name: $(target).attr("name"),
	    				tagid: $(target).attr("id"),
	    				content: content
	    			};
	    		},

	    		getCookie: function(name){
	    			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     				if(arr != null) return unescape(arr[2]); return null;
	    		}
			});
	       	
	        return SignView;
	    });