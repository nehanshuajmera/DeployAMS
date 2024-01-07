const mongoose = require('mongoose');

const substituteTeacherSchema = new mongoose.Schema({
    created_teacherId: mongoose.Schema.Types.ObjectId,
    subjectId: mongoose.Schema.Types.ObjectId,
    assign_teacherId: mongoose.Schema.Types.ObjectId,
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    flag: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const SubstituteTeacher = mongoose.model('SubstituteTeacher', substituteTeacherSchema);
module.exports = SubstituteTeacher;