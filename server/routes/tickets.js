const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');

// @route   POST api/tickets
// @desc    Create a ticket
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required').not().isEmpty(),
      check('priority', 'Priority is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, priority, category } = req.body;

    try {
      const newTicket = new Ticket({
        description,
        priority,
        category,
        user: req.user.id,
      });

      const ticket = await newTicket.save();
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
