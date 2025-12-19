const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['running', 'stopped', 'starting', 'stopping'],
        default: 'stopped'
    },
    limits: {
        memory: { type: Number, required: true }, // in MB
        cpu: { type: Number, required: true },    // in %
        disk: { type: Number, required: true }    // in MB
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Server', ServerSchema);
