import mongoose from 'mongoose';

const questionSetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    options: [{
      text: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      }
    }]
  }]
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

const Question = mongoose.model('Question', questionSetSchema);
export default Question;