var session = require('express-session');
var mongoose = require('./mongoose');
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

var nameSchema = new mongoose.Schema({
 username: String,
 filename: String,
});

var Document = mongoose.model("Document", nameSchema);
module.exports= Document;
