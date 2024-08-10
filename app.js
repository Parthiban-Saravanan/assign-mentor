const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

app.get('/', (req, res) => {
    res.send('Server is working well!');
});

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// Define Routes
app.use('/api/mentors', require('./routes/mentorRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
