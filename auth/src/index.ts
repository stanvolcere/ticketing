import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

//import { keys } from './config/keys';
const keys = require('./config/keys');

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';

import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());

// we're turning off the encrytion on the cookie because the JWT already is encrypted
// we're only using the cookie as the mode of transportation for the JWT
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {

    // type guard inserted here to check that that JWT_KEY env variable used 
    // later on actually exists because Typesript will never assume that a 
    // var we intend to use actually exists 

    // detect the var not being present from way early
    if (!process.env.JWT_KEY) {
        throw new Error();
    }

    try {
        await mongoose.connect(keys.dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //useCreateIndex: true
        }).catch((e) => {
            console.log("Something went wrong while connecting");
            console.log(e.message);
        });

        console.log('Connected to mongo db');
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });

    } catch (err) {
        console.log(err);
    }
}

start();