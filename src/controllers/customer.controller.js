import { Customer } from '../models/customer.model.js';

const getAllCustomers = async (req, res) => {
  try {
    let {
      name,
      page = 1,
      limit = 10,
      sortBy = 'name',
      order = 'desc',
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filters = {};
    if (name) filters.name = { $regex: name, $options: 'i' };

    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const customers = await Customer.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCustomers = await Customer.countDocuments(filters);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalCustomers / limit),
      totalCustomers,
      customers,
    });
  } catch (error) {
    console.log('🚀 ~ getAllCustomers ~ error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, orders } = req.body;

    const customer = new Customer({ name, orders: orders ? [...orders] : [] });
    await customer.save();

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      ticket: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
