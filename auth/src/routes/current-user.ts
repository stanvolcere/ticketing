import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send('New changes from current user AGAIN AGAIN 2');
});

export { router as currentUserRouter };
