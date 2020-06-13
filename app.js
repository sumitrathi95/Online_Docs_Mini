var express = require("express"),
	config = require('./config'),
	HttpError = require('./error').HttpError,
	User = require("./models/user");
var app = express();


app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var session = require('./models/session');


app.use(session.session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: true,
    saveUninitialized: false,
    store: session.store
}));

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

require('./routes')(app);
// app.use(express.static(path.join(__dirname, 'public')));

/*
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

var errorHandler = require('errorhandler');

app.use(function(err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (process.env.NODE_ENV === 'development') {
        app.use(errorHandler());
        } else {
        console.log(err);
        err = new HttpError(500);
        res.sendHttpError(err);
        }
    }
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
