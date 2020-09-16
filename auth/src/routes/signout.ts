import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    // we essentially dump the cookie session which means 
    // our JWT stored on there will be destroyed
    req.session = null;
    res.send({});
});

export { router as signoutRouter };