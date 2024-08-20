import mongoose from 'mongoose';

const examProgressSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    question: {
      type: String
    },
    selectedOption: {
      type: String
    },
  }],
  lastSaved: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed'],
    default: 'in_progress'
  },
  score: {
    type: Number
  },
}, {
  timestamps: true
});

// Index để tối ưu hiệu suất truy vấn
examProgressSchema.index({ exam: 1, student: 1 }, { unique: true });

const ExamProgress = mongoose.model('ExamProgress', examProgressSchema);
export default ExamProgress;