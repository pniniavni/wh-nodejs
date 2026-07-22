const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 100
  },
  category: {
    type: String,
    enum: ['mth', 'programming', 'fiction', 'general'], // התאמה מוחלטת ל-Joi
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  author: {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);