const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Student = require('../models/Student');

// @route   GET api/students
// @desc    Get all students info for each account (user)
// @access  Private: requires auth as the second parameter
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/students
// @desc    Add a student
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'First name is required').not().isEmpty(),
      check('lastName', 'Last name is required').not().isEmpty(),
      check('email', 'A valid email is required').isEmail(),
      check('startDate', "Please enter the student's start date")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { firstName, lastName } = req.body;

    const {
      email,
      phone,
      startDate,
      visaStatus,
      paymentStatus,
      attendance,
      date,
    } = req.body;

    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    try {
      const newStudent = new Student({
        firstName,
        lastName,
        email,
        phone,
        startDate,
        visaStatus,
        paymentStatus,
        attendance,
        date,
        user: req.user.id,
      });

      const student = await newStudent.save();

      res.json(student);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/students/:id
// @desc    Edit a student's info
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    startDate,
    visaStatus,
    paymentStatus,
    attendance,
  } = req.body;

  const studentFields = {};
  if (firstName)
    studentFields.firstName = firstName.charAt(0) + firstName.slice(1);
  if (lastName) studentFields.lastName = lastName.charAt(0) + lastName.slice(1);
  if (email) studentFields.email = email;
  if (phone) studentFields.phone = phone;
  if (startDate) studentFields.startDate = startDate;
  if (visaStatus) studentFields.visaStatus = visaStatus;
  if (paymentStatus) studentFields.paymentStatus = paymentStatus;
  if (attendance) studentFields.attendance = attendance;

  try {
    let student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Make sure the user owns their own students list
    if (student.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/students/:id
// @desc    Delete a student
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Make sure the user owns their own students list
    if (student.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }

    await Student.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Student removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
