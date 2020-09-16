import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    // equivalent to - if (!req.session || !req.session.jwt)
    if (!req.session?.jwt) {
        return res.send({ currentuser: null });
    }

    try {
        // process.env.JWT_KEY! tells typescript that we are sure that this exists
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

        // tells the frontend app that thw user is currently logged in
        res.send({ currentUser: payload });
    } catch (err) {
        res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };
