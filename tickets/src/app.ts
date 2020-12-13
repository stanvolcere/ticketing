import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

//import { keys } from './config/keys';
const keys = require('./config/keys');
import { errorHandler, NotFoundError } from '@svtickets/common';

const app = express();
app.set('trust proxy', true);
app.use(json());

// we're turning off the encrytion on the cookie because the JWT already is encrypted
// we're only using the cookie as the mode of transportation for the JWT
app.use(cookieSession({
	signed: false,
	// means only set the secure property to true if we're not on a test env
	// otherwise cookies are only to be set if the request is being made over HTTPS
	// and jest is NOT making a request over HTTPS
	secure: process.env.NODE_ENV !== "test"
}));


app.all('*', () => {
	throw new NotFoundError();
});

app.use(errorHandler);

// curly brace indicates a named export
export { app };