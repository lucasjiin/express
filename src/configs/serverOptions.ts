/**
 * serverOptions.ts
 */
import session from 'express-session';

import { SESSION_SECRET } from './environments.js';

export const sessionOptions: session.SessionOptions = {
  cookie: { httpOnly: true },
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
};
