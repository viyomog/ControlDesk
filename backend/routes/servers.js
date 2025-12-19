const express = require('express');
const router = express.Router();
const Server = require('../models/Server');
const ResourceConfig = require('../models/ResourceConfig');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all servers for logged in user
// @route   GET /api/servers
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const servers = await Server.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, count: servers.length, data: servers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a new server
// @route   POST /api/servers
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { name, memory, cpu, disk } = req.body;

        // Fetch Resource Limits
        let config = await ResourceConfig.findOne();
        if (!config) config = await ResourceConfig.create({}); // Ensure limits exist

        const mem = Number(memory);
        const cpuLimit = Number(cpu);
        const diskSpace = Number(disk);

        // Validate Limits
        if (mem < config.memory.min) return res.status(400).json({ message: `Memory cannot be less than ${config.memory.min} MB` });
        if (mem > config.memory.max) return res.status(400).json({ message: `Memory cannot exceed ${config.memory.max} MB` });

        if (cpuLimit < config.cpu.min) return res.status(400).json({ message: `CPU cannot be less than ${config.cpu.min}%` });
        if (cpuLimit > config.cpu.max) return res.status(400).json({ message: `CPU cannot exceed ${config.cpu.max}%` });

        if (diskSpace < config.disk.min) return res.status(400).json({ message: `Disk cannot be less than ${config.disk.min} MB` });
        if (diskSpace > config.disk.max) return res.status(400).json({ message: `Disk cannot exceed ${config.disk.max} MB` });

        const server = await Server.create({
            name,
            limits: {
                memory: mem,
                cpu: cpuLimit,
                disk: diskSpace
            },
            owner: req.user.id
        });

        res.status(201).json({ success: true, data: server });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid server data', error: err.message });
    }
});

// @desc    Get single server
// @route   GET /api/servers/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const server = await Server.findById(req.params.id);

        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }

        // Ensure user owns the server
        if (server.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json({ success: true, data: server });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete server
// @route   DELETE /api/servers/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const server = await Server.findById(req.params.id);

        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }

        // Ensure user owns the server
        if (server.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await server.deleteOne();

        res.json({ success: true, message: 'Server removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
