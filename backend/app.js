// app.js
const express = require('express');
const app = express();


const hostname = 'localhost';
const port = 4000;
const originalUrl = `http://${hostname}:${port}`;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const agentPerformanceRoutes = require('./routes/agentPerformanceRoutes');
const noSaleCallBackRoutes = require('./routes/noSaleCallBackRoutes');
app.use('/agent-performance', agentPerformanceRoutes);
app.use('/no-sale-callback', noSaleCallBackRoutes);



app.listen(port, hostname, () => {
    console.log(`Server running at ${originalUrl}/`);
});