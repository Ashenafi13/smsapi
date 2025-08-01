require('dotenv').config();
const express = require('express');
const app = express();
const smsRoutes = require('./routes/smsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/api', smsRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SMS API server running on port ${PORT}`);
});