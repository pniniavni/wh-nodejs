const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);