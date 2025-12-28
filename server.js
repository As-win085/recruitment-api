const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// 1. Load Environment Variables
dotenv.config();

// 2. Initialize Express
const app = express();

// 3. Connect to Database
connectDB();

// 4. Global Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use('/uploads', express.static('uploads')); // Serve resume files statically

// 5. Route Definitions
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.use('/api/screening', require('./routes/screeningRoutes'));

// 6. Root/Health Check Route
app.get('/', (req, res) => {
    res.send('Recruitment API is running...');
});

// 7. Global Error Handler (Catch-all)
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// 8. Start Server
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));