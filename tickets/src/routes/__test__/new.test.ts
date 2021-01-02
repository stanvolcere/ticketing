import request from 'supertest'
import { app } from "../../app"

import { Ticket } from "../../models/ticket"

it("has a route handler awaiting requests as /api/tickets to create tickets", async () => {
	const response = await request(app)
		.post("/api/tickets")
		.send({})

	expect(response.status).not.toEqual(404)
})

it("it can only be accessed if the user is signed", async () => {
	const response = await request(app)
		.post("/api/tickets")
		.send({})
		.expect(401)
})

// getting callback timeout error
it("it returns status code other than 401 if the user is signed", async () => {
	const response = await request(app)
		.post("/api/tickets")
		.set('Cookie', global.signin())
		.send({})

	expect(response.status).not.toEqual(401);
})

it("only if the a valid title is provided", async () => {
	await request(app)
		.post("/api/tickets")
		.set('Cookie', global.signin())
		.send({
			title: "",
			price: 10
		})
		.expect(400);

	await request(app)
		.post("/api/tickets")
		.set('Cookie', global.signin())
		.send({
			price: 10
		})
		.expect(400);
})

it("only if a valid price is provided", async () => {
	await request(app)
		.post("/api/tickets")
		.set('Cookie', global.signin())
		.send({
			title: "A new title",
			price: -10
		})
		.expect(400);

	await request(app)
		.post("/api/tickets")
		.set('Cookie', global.signin())
		.send({
			title: "A new title"
		})
		.expect(400);
})

it("creates a ticket with valid inputs", async () => {
	// find all the tickets that we have
	let tickets = await Ticket.find({});
	// we expect there to be 0 at the start
	expect(tickets.length).toEqual(0)

	// add in a check to make sure an actual ticket was saved
	await request(app)
		.post("/api/tickets")
		.set('Cookie', global.signin())
		.send({
			title: "A new title",
			price: 20
		})
		.expect(201);

	// check that the newly created ticket was actually created 
	tickets = await Ticket.find({});
	expect(tickets.length).toEqual(1)
})