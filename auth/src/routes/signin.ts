import express from 'express';

const router = express.Router();

router.post('api/users/signin', (req, res) => {
    res.send('hi there son');
});

export { router as signinRouter };