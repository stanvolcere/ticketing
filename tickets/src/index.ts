import 'express-async-errors'
import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
	// type guard inserted here to check that that JWT_KEY env variable used 
	// later on actually exists because Typesript will never assume that a 
	// var we intend to use actually exists 

	// detect the var not being present from way early
	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY must be defined");
	}

	// detect the var not being present from way early
	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI must be defined");
	}

	try {
		await mongoose.connect(process.env.MONGO_URI, {
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