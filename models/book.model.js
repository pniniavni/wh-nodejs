const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'שם ספר הוא שדה חובה'],
    minlength: [2, 'שם ספר חייב להכיל לפחות 2 תווים'],
    maxlength: [20, 'שם ספר יכול להכיל עד 20 תווים'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'מחיר ספר הוא שדה חובה']
  },
  categories: {
    type: [String],
    enum: ['mth', 'programming', 'fiction', 'general'], // רשימת ערכים מורשים
    required: true
  },
  author: {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);