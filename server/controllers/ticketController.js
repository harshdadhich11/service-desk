// server/controllers/ticketController.js
const Ticket = require('../models/Ticket');

// Create a new ticket
const createTicket = async (req, res) => {
  const { description, priority, category } = req.body;

  try {
    const newTicket = new Ticket({
      user: req.user.id,
      description,
      priority,
      category,
    });

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all tickets for the logged-in user
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all tickets (Admin only)
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update ticket status
const updateTicketStatus = async (req, res) => {
  const { status } = req.body;

  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    ticket.status = status;
    ticket.updatedAt = Date.now();

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Assign ticket to an admin
const assignTicket = async (req, res) => {
  const { adminId } = req.body;

  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    ticket.assignedTo = adminId;
    ticket.updatedAt = Date.now();

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createTicket,
  getTickets,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  assignTicket,
};
