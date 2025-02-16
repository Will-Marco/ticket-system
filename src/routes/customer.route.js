import { Router } from 'express';
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from '../controllers/customer.controller.js';

const customerRouter = Router();

customerRouter.get('/customer', getAllCustomers);
customerRouter.get('/customer/:id', getCustomerById);
customerRouter.post('/customer', createCustomer);
customerRouter.patch('/customer', updateCustomer);
customerRouter.delete('/customer:id', deleteCustomer);

export default customerRouter;
