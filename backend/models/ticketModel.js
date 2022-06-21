const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    platform: {
      type: String,
      required: [true, 'Select the platform the game is running on.'],
      enum: ['Nintendo Switch', 'Xbox Series X', 'PlayStation 5', 'PC Windows'],
    },
    issue: {
      type: String,
      required: [true, 'Select the type of issue being experienced.'],
      enum: [
        'Bug',
        'Launch',
        'Syncing',
        'Memory',
        'Graphics',
        'Sound',
        'Other',
      ],
    },
    description: {
      type: String,
      required: [true, 'Provide a short description of the issue experienced.'],
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
