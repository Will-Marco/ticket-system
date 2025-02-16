import { Ticket } from '../models/ticket.model.js';

const getAllTickets = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      title,
      row,
      seat,
      releaseDate,
      showStartDate,
      sortBy = 'releaseDate',
      order = 'desc',
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filters = {};
    if (title) filters.title = { $regex: title, $options: 'i' };
    if (row) filters.row = row;
    if (seat) filters.seat = seat;
    if (releaseDate) filters.releaseDate = new Date(releaseDate);
    if (showStartDate) filters.showStartDate = new Date(showStartDate);

    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const tickets = await Ticket.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalTickets = await Ticket.countDocuments(filters);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalTickets / limit),
      totalTickets,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: 'Ticket not found' });
    }

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTicket = async (req, res) => {
  try {
    const { title, releaseDate, row, seat, count, showStartDate } = req.body;

    const ticket = new Ticket({
      title,
      releaseDate,
      row,
      seat,
      count,
      showStartDate,
    });
    await ticket.save();

    res
      .status(201)
      .json({ success: true, message: 'Ticket created successfully', ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTicket) {
      return res
        .status(404)
        .json({ success: false, message: 'Ticket not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Ticket updated successfully',
      ticket: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

    if (!deletedTicket) {
      return res
        .status(404)
        .json({ success: false, message: 'Ticket not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
