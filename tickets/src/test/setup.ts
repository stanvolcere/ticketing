import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from "jsonwebtoken"

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[]
		}
	}
}

let mongo: any;

beforeAll(async () => {
	process.env.JWT_KEY = "echoes"

	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = () => {
	const payload = {
		id: "qwerty",
		email: "test@test.com",
	}

	// ! tells typescript to not worry about process.env.JWT_KEY  
	// potentially being undefined because we are almost certain that 
	// it is defined
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	const session = { jwt: token }

	const sessionJSON = JSON.stringify(session)

	const base64 = Buffer.from(sessionJSON).toString('base64');

	console.log(base64)

	// returned as an [] to be compatible with what supertest is expecting
	return [`express:sess=${base64}`];
}