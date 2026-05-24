const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const routes = require('./routes');

// API Routes
app.use('/api/v1', routes);

// Home Route
app.get('/', (req, res) => {
    res.json({
        message: 'E-Bikes Rental System API Running'
    });
});

module.exports = app;