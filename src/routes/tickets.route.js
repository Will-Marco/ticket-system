import { Router } from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/ticket.controller.js';

const ticketsRouter = Router();

ticketsRouter.get('/ticket', getAllTickets);
ticketsRouter.get('/ticket/:id', getTicketById);
ticketsRouter.post('/ticket', createTicket);
ticketsRouter.patch('/ticket', updateTicket);
ticketsRouter.delete('/ticket:id', deleteTicket);

export default ticketsRouter;
