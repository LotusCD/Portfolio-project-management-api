const fs = require('fs'); // Add this line to import the fs module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// old method to handle hidden .env
// const mongoURI = process.env.MONGO_URI;

// Function to get MongoDB URI
function getMongoURI() {
  const secretPath = process.env.MONGO_URI_FILE || '/run/secrets/mongo_uri';
  if (fs.existsSync(secretPath)) {
    return fs.readFileSync(secretPath, 'utf8').trim();
  }
  return process.env.MONGO_URI;
}

const mongoURI = getMongoURI();


// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/clientes', require('./routes/clientes'));
// Add other routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
