import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;