var express = require('express'),
    path = require('path'),
    db = require('./routes/db'),
    http = require('http')

    var app = express();
var env = process.env.NODE_ENV || 'development';

if ('development' == env) {

    app.set('port', process.env.PORT || 8639);

    app.use(express.static(path.join(__dirname, 'public')));
}

app.get('/', function(req, res) {
    res.render(index);
});

app.get('/home', db.findDestinations);
app.get('/hotels', db.findHotels);

app.get('/deals', db.findDeals);
app.get('/hoteldeals', db.findHotelDeals);

app.get('/hoteldeals/:city', db.citySearch);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});