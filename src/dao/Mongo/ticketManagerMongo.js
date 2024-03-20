import { ticketModel } from "../models/ticket.model.js";

class TicketManagerMongo {
    
    async createTicket(ticketData) {
        try {
            const newTicket = await ticketModel.create({ticketData})
            return newTicket
        } catch (error) {
            console.log('Error al crear ticket', error)
        }
    }
}

export default TicketManagerMongo