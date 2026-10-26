import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './auth.js';
import profileRoutes from './profile.js';
import productRoutes from './products.js';
import orderRoutes from './orders.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
