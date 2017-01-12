import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from 'config';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';

import logger from '../lib/log/logger';

// Initialize passport with our own strategies.
import '../lib/db/mongoose/setup';
import '../lib/passport/setup';


// Initialize Mongoose
const mongoConfig = config.get('db.mongo');
logger.info(`Connecting to MongoDB(mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database})`);
mongoose.connect(
  mongoConfig.host,
  mongoConfig.database,
  mongoConfig.port,
);


// Instantialize express.
const app = express();

// Initialize app settings.
app.set('assets url prefix', config.get('web.assets.urlPrefix'));

// Set Pug as the default view engine.
app.set('view engine', 'pug');
app.set('views', __dirname);

// Add HTTP body parsers.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add cookie and session support.
app.use(cookieParser());
// Use MongoDB to store session.
const MongoStore = connectMongo(session);
app.use(session({
  secret: 'i$love%cassiny!',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Initialize passport.
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use((req, res, next) => {
  if (req.path === '/login' || req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`/login?redirect_url=${encodeURIComponent(req.url)}`);
  }
});

app.use('/', require('./routes').default);
app.use('/', require('./user/routes').default);

export default app;
