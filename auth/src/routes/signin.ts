import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Password } from '../services/password';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage("Email mist be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password")
],
    validateRequest,
    async (req: Request, res: Response) => {
        //all validation is now being handled by the reusable validate-request function above
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid credentials");
        }

        // generate the jwt and store it on the cookie session
        const userJwt = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
            // ! here tells typescript that we're pretty sure (very confident that the var JWT_KEY)
            // has in fact been set and there's nothing to worry about
        }, process.env.JWT_KEY!);

        // done in this way because typescript doesn't 
        // want us to assume that there is a session.jwt property persent on the 
        // req object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);

    });

export { router as signinRouter };