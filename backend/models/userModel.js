const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field can not be empty.'],
    },
    email: {
      type: String,
      required: [true, 'Email field can not be empty.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password field can not be empty.'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
