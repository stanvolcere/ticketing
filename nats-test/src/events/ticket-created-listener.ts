import nats, { Message, Stan } from 'node-nats-streaming';
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from './subjects'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
	readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
	queueGroupName = 'payments-service';

	// enforce type checking on the data
	onMessage(data: TicketCreatedEvent['data'], msg: Message) {
		console.log('Event data:', data);

		console.log(data.id);

		// tells nats that the msg was succesfully parsed
		msg.ack();
	}
}
