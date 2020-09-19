import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string,
    email: string
}

// tells Typescript to reach into the declaration if Request and add an extra property 
//
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    // equivalent to - if (!req.session || !req.session.jwt)
    if (!req.session?.jwt) {
        console.log("yo");
        return next();
    }

    try {
        // process.env.JWT_KEY! tells typescript that we are sure that this exists
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;

        //console.log(payload);

        // typescript is unhappy with arbituraily add a new property to the req object 
        // req.currentUser = payload;
        // because in express's type definition file used by typescript there is not property called
        // currentUser
        req.currentUser = payload;
    } catch (err) { }

    console.log(req.currentUser);
    next();
}