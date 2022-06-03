const mongoose = require('mongoose');

// @todo  Add 'issue' type selection
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    platform: {
      type: String,
      required: [true, 'Which platform are you gaming on?'],
      enum: ['Nintendo Switch', 'Xbox Series X', 'PlayStation 5', 'PC Windows'],
    },
    issue: {
      type: String,
      required: [
        true,
        'Select the option that best identifies the type of issue.',
      ],
      enum: [
        'Malfunction',
        'Unresponsive',
        'Connection',
        'Memory',
        'Graphics',
        'Sounds',
        'Other',
      ],
    },
    description: {
      type: String,
      required: [true, 'Please provide a short description of the issue.'],
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

// @todo: add small greyed out frame to list examples below to help user select option

// malfunction - i.e. game lagging, stuttering, hanging, freezing, crashing, etc.
// unresponsive - i.e. not starting, launching or responding to system interactions, etc.
// connection - i.e. bad or no network connection, unable to sync with online account, etc.
// memory - i.e. player progress not saving, loss of data from previous saved session, etc.
// graphics - i.e. screen tearing, pixelation, glitches, image/color irregularities, etc.
// sounds - i.e. no audio, low volume, music or sound effects delayed or distorted, etc.
// other - i.e. in-game purchases, general gameplay question/feedback, unlisted issue, etc.

// OPTIONAL: maybe add an option in case issue is with game card/cartridge itself???
