import request from 'supertest'
import { app } from "../../app"

const createTicket = (title: string, price: number) => {
	return request(app)
		.post("/api/tickets")
		.set('Cookie', global.signin())
		.send({
			title,
			price
		})
		.expect(201);
}

it('can fetch a list of tickets', async () => {
	// build 3 tickets
	await createTicket("Gig 1", 10)
	await createTicket("Gig 2", 20)
	await createTicket("Gig 3", 30)

	const response = await request(app)
		.get(`/api/tickets`)
		.send()
		.expect(200)

	expect(response.body.length).toEqual(3)
})