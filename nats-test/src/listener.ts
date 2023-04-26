import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto'

import { TicketCreatedListener } from './events/ticket-created-listener'
console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
	url: "http://localhost:4222"
})
// Set manual acknowledgement to be true
const options = stan.subscriptionOptions().setManualAckMode(true);

stan.on('connect', () => {
	console.log("Listener connected to NATS");

	stan.on('close', () => {
		console.log("Connection closed");
		// will exit process
		process.exit();
	})

	new TicketCreatedListener(stan).listen();

	// create the subscription first
	// Queue group - will make sure that only one of the many 
	// identical services that 
	// are subscribed actually get the event

	// All replaced by the sub class
	// const subscription = stan.subscribe('ticket:created', 'orders-service-queue-group', options);

	// subscription.on('message', (msg: Message) => {
	// 	console.log("Msg received")
	// 	const data = msg.getData();

	// 	if (typeof data === 'string') {
	// 		console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`)
	// 	}

	// 	// sends an acknowledgement that we've handled the event 
	// 	msg.ack();
	// })
});

// Will watch for INTeraupt or termination signals
process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())
