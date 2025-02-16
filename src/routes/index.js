import customerRouter from './customer.route.js';
import ticketsTouter from './tickets.route.js';

export default function routes() {
  return [ticketsTouter, customerRouter];
}
