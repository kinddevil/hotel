var express = require('express'),
    // routes = require('./routes/router'),
    path = require('path'),
    hotel = require('./routes/hotels'),
    user = require('./routes/users'),
    http = require('http'),
    bodyParser = require('body-parser');
    https = require('https'),
    fs = require('fs'),
    cookieParser = require('cookie-parser');
// _ = require('underscore');

// bodyParser = require('body-parser'),
// _ = require('underscore');


var app = express();
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('9cUjvz7KRIT5o_YSoInj0g');

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
    app.use(bodyParser());
    app.use(cookieParser('hozodo'));
    //app.set('port', process.env.PORT || 8639);
    app.set('port', process.env.PORT || 8080);
    app.use(express.static(path.join(__dirname, 'public')));
}

app.get('/', function(req, res) {
    res.render(index);
});

app.get('/hotels', hotel.findAll);
app.get('/hotels/:id', hotel.findById);
app.post('/hotels', hotel.addHotels);
app.put('/hotels/:id', hotel.updateHotels);
app.delete('/hotels/:id', hotel.deleteHotels);

app.post('/hotels/hotelRequest', hotel.saveHotelRequest);
app.post('/hotels/hotelApiResponse', hotel.saveApiResponse);
app.get('/trendingDestination', hotel.trendingDestination);
app.post('/hotels/name', hotel.findHotelByName);
app.post('/user/oauth', user.auth);
app.post('/user/signin', user.signin);
app.post('/user/logout', user.signout);
app.put('/user/signup', user.signup);
app.post('/user/trace', user.trace);
app.get('/oauth2callback', user.oauth);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

/* For test 
var options = {
    key: fs.readFileSync('../privatekey.pem'),
    cert: fs.readFileSync('../certificate.pem')
};

https.createServer(options, app).listen(443, function () {
    console.log('Https server listening on port ' + 443);
});
*/