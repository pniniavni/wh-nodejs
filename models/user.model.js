const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // ביטוי רגולרי לטלפון ישראלי (נייד או נייח)
        return /^0(?:[23489]|5[0-9])-?[0-9]{7}$/.test(v);
      },
      message: props => `${props.value} אינו מספר טלפון ישראלי תקין!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  borrowedBooks: [
    {
      bookId: { type: String, required: true },
      title: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);