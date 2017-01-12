import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

// Initialize passport with our own strategies.
import '../lib/passport/config';

// Instantialize express.
const app = express();

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

app.get('/', (req, res) => {
  res.type('html');
  res.send('<h1>Welcome</h1><p>Welcome to Cassiny AppEngine</p>');
});

export default app;
