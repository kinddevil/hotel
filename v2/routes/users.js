var mongo = require('mongodb'),
    Db = mongo.Db,
    MongoClient = mongo.MongoClient,
    BSON = mongo.BSONPure,
    db,
    MD5 = require('MD5'),
    request = require('request'),
    oauth = require('./utils/oauthUtil')
    maxage = 259200000; //3 Days 3 * 24 * 3600 * 1000
    // maxage = 30 * 1000;

// var dbURI = process.env.MONGOLAB_URI || 'mongodb://sparrows:sparrows@ds045089.mongolab.com:45089/hotelsdb';
var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/hotelsdb';
// var dbURI = process.env.MONGOLAB_URI || 'mongodb://<dbuser>:<dbpassword>@ds033579.mongolab.com:33579/heroku_app25400180';


MongoClient.connect(dbURI, {
    server: {
        auto_reconnect: true
    },
    db: {
        w: 1
    }
}, function(err, _db) {
    if (!err) {
        db = _db;
        console.log("Connected to 'hotelsdb' database for user action");
    } else {
        console.log('Could\'t connect to database : ' + err.message);
    }

});

function saveUser(userInfo){
    db.collection('users', function(err, collection) {
        collection.findOne({
            '_id': userInfo._id
        }, function(err, item) {
            if (err){
                console.log("Save oauth userinfo error" , userInfo);
            }else{
                if ( item ) {
                    updateUserinfo(userInfo);
                }else{
                    insertUserinfo(userInfo);
                }
            }
        });
    });
    
}

function insertUserinfo(userInfo){
    db.collection('users', function(err, collection) {
        collection.insert(userInfo, {
            safe: true
        }, function(err, result) {
            if (err) {
                console.log("Insert User Error => ", err);
            } else {
                console.log('Insert user success: ' , result);
            }
        });
    });
}

function updateUserinfo(userInfo){
    db.collection('users', function(err, collection) {
        collection.update({"_id": userInfo._id}, {$set: {firstname:userInfo.firstname, lastname:userInfo.lastname}}, {multi:false},
        function(err, result) {
            if (err) {
                console.log("Update User Error => ", err);
            } else {
                console.log('Update user success: ' , result);
            }
        });
    });
}

exports.signin = function(req, res) {
    console.info(req.url);
    var params = req.body;
    var validate = oauth.validateUser(params, params.oauth);
    if (validate.code&0XF1 ){
        console.log("Create user error => ", "User information is not completed!");
        res.send({"error": "User information is not completed!"});
        return;
    }
    params.password = MD5(params.password);
    console.log('Login: ' , params);
    db.collection('users', function(err, collection) {
        collection.findOne({
            '_id': params.email
        }, function(err, item) {
            if (err){
                console.log("An error has occurred, please retry");
                res.send('An error has occurred, please retry');
            }else{
                if ( item && item._id == params.email && (params.oauth=="true" || item.password == params.password) ) {
                    console.log("User login successfully:", item.email);
                    delete item.password;
                    res.send(item);
                }else{
                    console.log("User login failed:", params.email);
                    res.send({"error": "Invalidated user information"});
                }
            }
        });
    });
};

exports.signout = function(req, res) {
    console.info(req.url);
    res.cookie("userinfo", {}, {maxAge : 0});
    res.send({success: "Logout success"});
};

exports.signup = function(req, res) {
    console.info(req.url);
    var params = req.body;
    var validate = oauth.validateUser(params, params.oauth);
    if (validate.code){
        console.log("Create user error => ", "User information is not completed!");
        res.send({"error": "User information is not completed!"});
        return;
    }
    if (params.oauth !="true")
        params.password = MD5(params.password);
    params._id = validate._id;
    console.log('Sign up params: ' , params);

    db.collection('users', function(err, collection) {
        collection.insert(params, {
            safe: true
        }, function(err, result) {
            if (err) {
                console.log("Create User Error => ", err);
                if (err.code == '11000'){
                    res.send({error: "User already exists"});
                    return;
                }
                res.send({error: 'An error has occurred, please retry'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                delete result[0].password;
                res.send(result[0]);
            }
        });
    });
};

exports.auth = function(req, res){
    console.info(req.url);
    // var oauthType = req.query.oauth;
    var oauthType = req.body.oauth;
    var authObject = oauth.oauthObj(oauthType); 
    if (authObject){
        console.log("Get url ", authObject.initUrl + oauthType);
        res.send({success: authObject.initUrl + oauthType});
    }else {
        console.log("Unknown oauth type =>" + oauthType);
        res.send( {error: 'Unknown oauth type ' + oauthType});
    }
    /* 
    if (authObject){
        console.log("Fetch oauth : " + authObject.initUrl + oauthType);
        request(authObject.initUrl + oauthType, function(error, response, body){
            if (error){
                console.log("Get oauth code err", error, error.errno);
                if (error.errno != "ETIMEDOUT")
                    res.send( {error: 'Get remote url error '});
            }else {
                console.log(body, response.statusCode);
                res.send(body);
            }
        })
    }else{
        console.log("Unknown oauth type =>" + oauthType);
        res.send( {error: 'Unknown oauth type ' + oauthType});
    }
    */
};

exports.oauth = function(req, res){
    console.info(req.url);
    var params = req.query;
    if (!params.code){
        console.log("Oauth error => ", params);
        res.send({error: params.error?params.error_description?params.error_description: params.error : "access_denied"});
    }else {
        var state = params.state;
        var authObject = oauth.oauthObj(state);
        if (!authObject){
            console.log("Unknown oauth request => ", state);
            res.send({error: "Unknown oauth request"});
            return;
        }
        authObject.formData.code = params.code;
        request.post(authObject.tockenUrl , {form: authObject.formData}, function(error, response , body){
            if (error){
                console.log("error1 =>", error);
                res.send("Network problem, please retry");
            }else{
                console.log("Token return: " , body);
                var ret = JSON.parse(body);
                var access_token = ret.access_token;
                if (!access_token)
                    res.send("certificate problem, please retry");
                else {
                    request(authObject.infoUrl + access_token, function(err, response, body){
                        if (err){
                            console.log("error2 =>", err);
                            res.send("Network problem, please retry");
                        }else{
                            console.log("Userinfo", body);  
                            var userInfo = JSON.parse(body);
                            var user = oauth.getUserInfo(userInfo, state);
                            res.cookie("userinfo", JSON.stringify(user), {maxAge: maxage});
                            // res.send(userInfo);
                            saveUser(user);
                            res.redirect('/');
                        }
                    })
                }
            }
        });
    }
};

exports.trace = function(req, res){
    console.info(req.url);
    var params = req.body;
    var _id = params.uid;
    if (_id){
        delete params.uid;
        db.collection('users', function(err, collection) {
            collection.findOne({'_id': _id},
             function(err, result) {
                if (err) {
                    console.log("Find User Error => ", err);
                    res.send({error: 'An error has occurred, please retry'});
                } else {
                    if (result.logs && result.logs instanceof Array) result.logs.push(params);
                    else result.logs = [params];
                    db.collection('users', function(err, collection) {
                        collection.save(result, {
                            safe: true
                        }, function(err, result) {
                            if (err) {
                                console.log("Save User Log Error => ", err);
                                res.send({error: 'An error has occurred, please retry'});
                            } else {
                                console.log("Save User Log Success => ", _id);
                                res.send({success: 'Update Log Success'});
                            }
                        });
                    });
                }
            });
        });
    }else{
        console.log(params);
        res.send({error: "uid is empty"});    
    }
}

exports.test = function(req, res){
    console.log(req.url);
    console.log(req.body);
    console.log(req.params);
    console.log("cookie:", req.cookies,req.headers.cookie);
    console.log("headers:", req.headers);
    res.cookie("a","b");
    res.send("oauth");
}