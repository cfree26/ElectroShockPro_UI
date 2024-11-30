const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to My Local API');
});

// Example Endpoint: Get All Calculations
app.get('/calculations', (req, res) => {
    res.json([
        { id: 1, type: "Ohm's Law", voltage: 120, current: 10, result: 12 },
        { id: 2, type: "Power Calculation", voltage: 220, current: 5, result: 1100 }
    ]);
});

// Example Endpoint: Add a New Calculation
app.post('/calculations', (req, res) => {
    const newCalculation = req.body;
    res.status(201).json({
        message: 'Calculation added successfully',
        calculation: newCalculation
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
