import express, { Request, Response } from "express"
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@svtickets/common';

const router = express.Router();

router.post("/api/tickets", requireAuth, [
	body("title")
		.not()
		.isEmpty()
		.withMessage("Title is required"),
	body("price")
		.isFloat({ gt: 0 })
		.withMessage("Price must be greater than 0")
], validateRequest, (req: Request, res: Response) => {
	// validate request will scan our errors array to find any 
	// errors that were picked up 
	// by the express-validator
	res.sendStatus(200);
})

export { router as createTicketRouter }