// server.js
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';

dotenv.config();  // Ensure this is at the top

// Debugging: Check if MONGO_URI is correctly loaded
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the .env file'.red.bold);
    process.exit(1);
}

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API');
});
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow.bold));
