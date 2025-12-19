const mongoose = require('mongoose');

const ResourceConfigSchema = new mongoose.Schema({
    memory: {
        min: { type: Number, default: 128 },
        max: { type: Number, default: 10240 },
        default: { type: Number, default: 1024 }
    },
    cpu: {
        min: { type: Number, default: 10 },
        max: { type: Number, default: 400 },
        default: { type: Number, default: 100 }
    },
    disk: {
        min: { type: Number, default: 512 },
        max: { type: Number, default: 51200 },
        default: { type: Number, default: 10240 }
    },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResourceConfig', ResourceConfigSchema);
