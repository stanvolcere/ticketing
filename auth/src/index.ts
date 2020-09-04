import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import mongoose from 'mongoose';

//import { keys } from './config/keys';
const keys = require('./config/keys');

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';

import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
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