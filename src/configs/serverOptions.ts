/**
 * serverOptions.ts
 */
import session from 'express-session';

const SESSION_SECRET = process.env.SESSION_SECRET ?? '@node-expres1324!';

const sessionOptions: session.SessionOptions = {
  cookie: { httpOnly: true },
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
};

export { sessionOptions };
