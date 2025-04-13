import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import apiRoutes from './routes/api.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Load environment variables (for local development)
dotenv.config();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming requests (optional, for debugging)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client')));

// API routes
app.use('/api', apiRoutes);

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile('admin-dashboard.html', { root: path.join(__dirname, '../client') });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../client') });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});