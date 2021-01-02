import express, { Request, Response } from "express"
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@svtickets/common';

import { Ticket } from '../models/ticket'

const router = express.Router();

router.post("/api/tickets", requireAuth, [
	body("title")
		.not()
		.isEmpty()
		.withMessage("Title is required"),
	body("price")
		.isFloat({ gt: 0 })
		.withMessage("Price must be greater than 0")
], validateRequest, async (req: Request, res: Response) => {
	// validate request will scan our errors array to find any 
	// errors that were picked up 
	// by the express-validator
	const { title, price } = req.body;

	const ticket = Ticket.build({
		title,
		price,
		// telling Typescript don't sweat it the req.currentUser
		// we're very sure is defined
		userId: req.currentUser!.id
	})
	await ticket.save()

	res.status(201).send(ticket)
})

export { router as createTicketRouter }