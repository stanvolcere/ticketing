import { Subjects, TicketCreatedEvent, Publisher } from '@svtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
	// Type annotation here is to make sure we never accidentally 
	// change the value of subject
	subject: Subjects.TicketCreated = Subjects.TicketCreated


}