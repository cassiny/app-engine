import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

// Initialize passport with our own strategies.
import '../lib/passport/config';

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
app.use('/', require('./user/routes').default);

export default app;
