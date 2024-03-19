const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'absent'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;