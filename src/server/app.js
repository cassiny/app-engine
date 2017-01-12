import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from 'config';
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

// Set Pug as the default view engine.
app.set('view engine', 'pug');
app.set('views', __dirname);

// Add HTTP body parsers.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add cookie and session support.
app.use(cookieParser());
app.use(session({
  secret: 'i$love%cassiny!',
  resave: false,
  saveUninitialized: false,
}));

// Initialize passport.
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use((req, res, next) => {
  if (req.path === '/login' || req.path.startsWith('/assets/') || req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`/login?redirect_url=${encodeURIComponent(req.url)}`);
  }
});

app.use('/', require('./routes').default);
app.use('/', require('./user/routes').default);

export default app;
