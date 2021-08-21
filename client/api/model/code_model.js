const mongoose = require('mongoose');

const codeScheme = new mongoose.Schema({
    title: String,
    code: String,
    createed_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Code', codeScheme);