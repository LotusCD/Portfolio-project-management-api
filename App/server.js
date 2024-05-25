const fs = require('fs'); // Add this line to import the fs module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Function to get MongoDB URI
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('MongoDB URI is undefined. Please check your .env file.');
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/etapas', require('./routes/etapas'));
// Add other routes here

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));