import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  }
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;