const express = require('express');
const router = express.Router();
const ResourceConfig = require('../models/ResourceConfig');
const { protect } = require('../middleware/authMiddleware');

// Get Resource Limits
// Public or Protected? Let's keep it protected for now to match the app style, 
// though often config is public. User is creating server so likely logged in.
router.get('/resource-limits', protect, async (req, res) => {
    try {
        let config = await ResourceConfig.findOne();

        // Seed default if not exists
        if (!config) {
            config = await ResourceConfig.create({});
        }

        res.json(config);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Resource Limits (Admin only - placeholder for now)
// router.put('/resource-limits', protect, admin, ...); 

module.exports = router;
