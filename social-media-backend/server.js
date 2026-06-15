const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server is cruising smoothly on port ${PORT}`);
});