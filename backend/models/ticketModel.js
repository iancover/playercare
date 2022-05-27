const mongoose = require('mongoose');

// @todo  Add 'issue' type selection
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['Nintendo', 'Xbox', 'Playstation', 'Sega'],
    },
    description: {
      type: String,
      required: [true, 'Please describe the issue.'],
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'pending', 'closed'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
