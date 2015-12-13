var mongo = require('mongodb'),
    Db = mongo.Db,
    MongoClient = mongo.MongoClient,
    BSON = mongo.BSONPure,
    db;

// var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/trazigohotels';
// var dbURI = 'mongodb://sparrows:sparrows@ds049219.mongolab.com:49219/trazigohotels';
var dbURI = 'mongodb://localhost:27017/trazigohotels';

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
        console.log("Connected to 'trazigo' database" + db);
        _db.collection('destinations', {
            strict: true
        }, function(err, collection) {
            if (err) {

            }
        });
    } else {
        console.log('Could\'t connect to database : ' + err.message);
    }

});

exports.findDestinations = function(req, res) {
    db.collection('destinations', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.findHotels = function(req, res) {
    db.collection('hotels', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findDeals = function(req, res) {
    db.collection('destinations_on_deals', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.findHotelDeals = function(req, res) {
    db.collection('hotels_on_deals', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.citySearch = function(req, res) {
    id = req.params.city;

    console.log(id);

    db.collection('hotels_on_deals', function(err, collection) {
        collection.find({
            "city_name": id
        }).toArray(function(err, items) {
            console.log("exports.findHotels");
            res.send(items);
        });
    });
};