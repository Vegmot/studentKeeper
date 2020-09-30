const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  user: {
    // this item is used to easily check which student info was uploaded by which user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  startDate: {
    // will be changed into Date, using a JavaScript method, hopefully
    type: String,
    required: true,
  },
  visaStatus: {
    type: String,
    default: 'In effect', // or Expired
  },
  paymentStatus: {
    type: String,
    default: 'Paid', // or Not paid
  },
  attendance: {
    type: String,
    default: 'Good', // or Bad
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('student', StudentSchema);
