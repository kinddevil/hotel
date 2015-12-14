define(['backbone', '../../channel',
        'SignInModel',
        'SignUpModel',
        'AuthModel',
        'UserTraceModel',
        'App'
    ],
    function(Backbone, Channel, SignInModel, SignUpModel, AuthModel, UserTraceModel, App) {

        Channel.on("SignInReq", function(formData) {

            var signInModel = new SignInModel();
            signInModel.fetch({
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                },
                data: JSON.stringify(formData),
                success: function(child, data, req){
                    if (data){
                        if (data.error){
                            $("#signBtn form").append("<div id='errorMsg'><font color='red'>" + data.error + "</font></div>");
                        }else {
                            $('#sign').trigger('receivedata',data);
                        }
                    }else{
                        //Unkown Reason
                    }
                },
                error: function(){
                    console.log("error+>", arguments);
                    alert("Connection error, please retry");
                }
            });
        });

        Channel.on("SignUpReq", function(formData) {

            var signUpModel = new SignUpModel();
            signUpModel.fetch({
                type: 'PUT',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                },
                data: JSON.stringify(formData),
                success: function(child, data, req){
                    if (data){
                        if (data.error){
                            $("#signBtn form").append("<div id='errorMsg'><font color='red'>" + data.error + "</font></div>");
                        }else {
                            $('#sign').trigger('receivedata',data);
                        }
                    }else{
                        //Unkown Reason
                    }
                },
                error: function(){
                    console.log("error+>", arguments);
                    alert("Connection error, please retry");
                }
            });
        });

        Channel.on("AuthReq", function(formData) {
            $('.authLoader').css("display", "block");
            var authModel = new AuthModel();
            authModel.fetch({
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                },
                data: JSON.stringify(formData),
                success: function(child, data, req){
                    if (data){
                        if (data.success)
                            window.location.href = data.success;
                        else if (data.error)
                            alert(data.error);
                    }else{
                        //Unkown Reason
                    }
                },
                error: function(){
                    console.log("error+>", arguments);
                    alert("Connection error, please retry");
                }
            });
        });

        Channel.on("ActionTrcReq", function(formData) {

            var userTraceModel = new UserTraceModel();
            userTraceModel.fetch({
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                },
                data: JSON.stringify(formData),
                success: function(child, data, req){
                    if (data){
                        if (data.error)
                            console.log(data.error);
                    }else{
                        //Unkown Reason
                    }
                },
                error: function(){
                    console.log("error+>", arguments);
                }
            });
        });

    });