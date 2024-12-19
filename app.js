import e from "express";
import sequelize from "./database.js";
import cache from "./caching.js";
import limiter from "./limiter.js";
import morgan from "morgan";
import helmet from 'helmet';

import employeeRoutes from './routes/employeeRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productionRoutes from './routes/productionRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = e();

app.use(e.json());
app.use(morgan('combined'));
app.use(helmet());
app.use(limiter);

sequelize
    .authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error connecting to the database:', err));

app.use('/api/employees', employeeRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/productions', productionRoutes);
app.use('/api/users', userRoutes);

// Catch-all for 404
app.use((req, res, next) => {
    res.status(404).json({"error": "Route not found"});
});

// Global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;