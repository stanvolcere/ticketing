import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from "@svtickets/common";

import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [
	body('email')
		.isEmail()
		.withMessage('Email must be valid'),
	body('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Password must be between 4 to 20 characters long'),
], validateRequest, async (req: Request, res: Response) => {

	// Note all this has been moved to the validate-request middleware
	// const errors = validationResult(req);

	// if (!errors.isEmpty()) {
	//     throw new RequestValidationError(errors.array());
	// }

	const { email, password } = req.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new BadRequestError("Email in use");
	}

	// test out the save process
	const user = User.build({ email, password });
	await user.save();

	// generate the jwt and store it on the cookie session
	const userJwt = jwt.sign({
		id: user._id,
		email: user.email
		// ! here tells typescript that we're pretty sure (very confident that the var JWT_KEY)
		// has in fact been set and there's nothing to worry about
	}, process.env.JWT_KEY!);

	// done in this way because typescript doesn't 
	// want us to assume that there is a session.jwt property persent on the 
	// req object
	req.session = {
		jwt: userJwt
	};

	res.status(201).send(user);
});

export { router as signupRouter };