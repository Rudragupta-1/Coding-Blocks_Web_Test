const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String, 
      required: true,
    },
    type: { 
      type: String, 
      enum: ['info', 'alert', 'reminder'],  
      default: 'info'
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Note', noteSchema);
