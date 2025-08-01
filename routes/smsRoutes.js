const express = require('express');
const router = express.Router();
const { sendSMS } = require('../controllers/smsController');
const authenticateToken = require('../middleware/auth');

router.post('/send-sms', authenticateToken, async (req, res) => {
  try {
    await sendSMS(req.body);
    res.status(200).json({ message: 'SMS inserted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert SMS', details: err.message });
  }
});

module.exports = router;