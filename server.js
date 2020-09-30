const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// connect to MongoDB
connectDB();

// Initialise middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/students', require('./routes/students'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`|| Server running on port ${PORT} ||`));
