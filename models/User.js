const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  telephone: { type: String, required: false },
  email: { type: String, required: true },
});

module.exports = mongoose.model('User', UsersSchema);
