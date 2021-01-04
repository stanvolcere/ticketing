import request from 'supertest'
import mongoose from 'mongoose'
import { app } from "../../app"

it.skip("returns a 404 to update a ticket that doesn't exist", async () => {
	const id = new mongoose.Types.ObjectId().toHexString()

	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', global.signin())
		.send({
			title: "testingtitle",
			price: 50
		})
		.expect(404)
})

it.skip("returns a 401 if the user is not authenticated", async () => {
	const id = new mongoose.Types.ObjectId().toHexString()

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: "testingtitle 2",
			price: 50
		})
		.expect(401)
})

it.skip("returns a 401 if the ticket we are trying to update doesnlt belong to the user", async () => {
	const response = await request(app)
		.post(`/api/tickets`)
		.set('Cookie', global.signin())
		.send({
			title: "testingtitle",
			price: 50
		})
		.expect(201)

	const anotherone = await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', global.signin())
		.send({
			title: "testingtitle updated",
			price: 100
		})

	console.log(anotherone.status)
	expect(anotherone.status).toEqual(401)
})

it.skip("returns a 400 if the title or price of the update is invalid", async () => {
	// const cookie = global.signin()

	// const response = await request(app)
	// 	.put(`/api/tickets/${response.body.id}`)
	// 	.set('Cookie', global.signin())
	// 	.send({
	// 		title: "testingtitle updated",
	// 		price: 100
	// 	})
})

it("updates the ticket as expected", async () => {

})