const mongoose = require('mongoose');

const UserSettingsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    preferences: { type: Map, of: String }, // Key-value pairs for settings
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserSettings', UserSettingsSchema);
