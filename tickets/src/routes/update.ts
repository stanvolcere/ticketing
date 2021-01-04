import express, { Request, Response } from "express"
import { body } from 'express-validator'
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from '@svtickets/common';

import { Ticket } from '../models/ticket'

const router = express.Router();

router.put("/api/tickets/:id", requireAuth, async (req: Request, res: Response) => {
	const ticket = await Ticket.findById(req.params.id)

	if (!ticket) {
		throw new NotFoundError();
	}

	if (ticket.userId != req.currentUser!.id) {
		throw new NotAuthorizedError();
	}
	// validate request will scan our errors array to find any 
	// errors that were picked up 
	// by the express-validator
	//const { title, price } = req.body;

	// const ticket = Ticket.build({
	// 	title,
	// 	price,
	// 	// telling Typescript don't sweat it the req.currentUser
	// 	// we're very sure is defined
	// 	userId: req.currentUser!.id
	// })
	//await ticket.save()

	res.send(ticket)
})

export { router as updateTicketRouter }