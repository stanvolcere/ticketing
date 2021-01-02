import express, { Request, Response } from "express"
import { requireAuth, validateRequest, NotFoundError } from '@svtickets/common';

import { Ticket } from '../models/ticket'

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
	const tickets = await Ticket.find({})

	if (tickets.length == 0) {
		throw new NotFoundError()
	}

	res.send(tickets)
})

export { router as indexTicketRouter }