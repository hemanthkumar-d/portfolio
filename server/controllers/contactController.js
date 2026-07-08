const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');

const createContact = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    data: { message: 'Message sent successfully' },
  });
});

module.exports = { createContact };
