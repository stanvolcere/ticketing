import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from './events/ticket-created-publisher'
console.clear();

// client/instance of nats
const stan = nats.connect('ticketing', 'abc', {
	url: 'http://localhost:4222'
});

stan.on('connect', async () => {
	console.log("publisher connected to nats")

	const publisher = new TicketCreatedPublisher(stan);

	try {
		await publisher.publish({
			id: '123',
			title: 'Concert',
			price: 20
		});
	} catch (err) {
		console.log(err.message);
	}
	// nats only accepts strings being sent as data
	// const data = JSON.stringify({
	// 	id: '123',
	// 	title: "concert",
	// 	price: 20
	// });

	// publish event
	// remember in nats terminology data sent across 
	// is refered to as message
	// stan.publish('ticket:created', data, () => {
	// 	console.log("event published")
	// })
})
