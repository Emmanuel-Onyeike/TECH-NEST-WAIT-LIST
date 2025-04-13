import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import apiRoutes from './routes/api.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));


app.use('/api', apiRoutes);


app.get('/admin', (req, res) => {
  res.sendFile('admin-dashboard.html', { root: path.join(__dirname, '../client') });
});


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../client') });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});