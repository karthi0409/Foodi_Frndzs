// backend/server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';

import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import itemRouter from './routes/itemRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://foodifrndzs-admin.onrender.com'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/cart', cartRouter);
app.use('/api/items', itemRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
