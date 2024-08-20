import express from 'express';
import ExamProgress from '../models/ExamProgress.js';
import User from '../models/User.js';
import Exam from '../models/Exam.js';
import { verifyToken, isStudent, isAdmin, isTeacher  } from '../middlewares/auth.js';

const examProgressRouter = express.Router();

// Create ExamProgress for a student starting an exam
examProgressRouter.post('/exam-progress/start', verifyToken, isStudent, async (req, res) => {
  try {
    const { examId } = req.body;
    const userId = req.user.id; 

    // Check if the exam exists and populate the students field
    const exam = await Exam.findById(examId).populate('students.student');
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    console.log(exam)

    // Check if the current time is within the exam's time frame
    const currentTime = new Date();
    if (exam.status==='pending' || exam.status==='completed')  {
      return res.status(403).json({ message: 'The exam is not currently active' });
    }

    // Check if the student is allowed to take this exam
    const studentEntry = exam.students.find(entry => entry.student._id.toString() === userId);

    if (!studentEntry) {
      return res.status(403).json({ message: 'You are not allowed to take this exam' });
    }

    if (studentEntry.status === 'completed') {
      return res.status(400).json({ message: 'You have already completed this exam' });
    }

    // Check if ExamProgress already exists for this student and exam
    let examProgress = await ExamProgress.findOne({ exam: examId, student: userId });
    if (examProgress) {
      return res.status(400).json({ message: 'You have already started this exam' });
    }

    // Create new ExamProgress
    examProgress = new ExamProgress({
      exam: examId,
      student: userId,
      status: 'in_progress',
      answers: []
    });

    await examProgress.save();

    // Update the student's status in the Exam document
    await Exam.findByIdAndUpdate(examId, {
      $set: { 'students.$[elem].status': 'started' }
    }, {
      arrayFilters: [{ 'elem.student': userId }]
    });

    res.status(201).json({ message: 'Exam started successfully', examProgressId: examProgress._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Hàm kiểm tra sự tồn tại của người dùng
const checkUserExists = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Lấy tiến trình làm bài của một học sinh trong một kỳ thi
examProgressRouter.get('/exam-progress/:examId/:userId', verifyToken, async (req, res) => {
  try {
    const { examId, userId } = req.params;
    
    // Kiểm tra sự tồn tại của người dùng
    await checkUserExists(userId);
    
    const examProgress = await ExamProgress.findOne({ exam: examId, student: userId })
      .populate('exam', 'name duration')
      .populate('student', 'fullName mssv');

    if (!examProgress) {
      return res.status(404).json({ message: 'Exam progress not found' });
    }
    
    res.json(examProgress);
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật tiến trình làm bài của học sinh
examProgressRouter.post('/exam-progress/update', verifyToken, async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const userId = req.user.id;
    
    // Kiểm tra sự tồn tại của người dùng
    await checkUserExists(userId);
    
    let examProgress = await ExamProgress.findOne({ exam: examId, student: userId });

    if (!examProgress) {
      examProgress = new ExamProgress({
        exam: examId,
        student: userId,
        answers: answers.map(a => ({ question: a.question, selectedAnswer: a.selectedAnswer }))
      });
    } else {
      examProgress.answers = answers.map(a => ({ question: a.question, selectedAnswer: a.selectedAnswer }));
      examProgress.lastSaved = new Date();
    }

    await examProgress.save();
    res.json({ message: 'Exam progress saved successfully' });
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: err.message });
  }
});

// Hoàn thành bài thi
examProgressRouter.post('/exam-progress', verifyToken, async (req, res) => {
  try {
    const { examId, score} = req.body;
    const userId = req.user.id;

    // Kiểm tra sự tồn tại của người dùng
    await checkUserExists(userId);
    
    const examProgress = await ExamProgress.findOne({ exam: examId, student: userId });

    if (!examProgress) {
      return res.status(404).json({ message: 'Exam progress not found' });
    }

    examProgress.score = score;
    examProgress.status = 'completed';
    examProgress.lastSaved = new Date();
    await examProgress.save();

    res.json({ message: 'Exam completed successfully' });
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: err.message });
  }
});

// Lấy danh sách tiến trình làm bài của tất cả học sinh trong một kỳ thi
examProgressRouter.get('/exam-progress/:examId', verifyToken, isTeacher, async (req, res) => {
  try {
    const { examId } = req.params;
    const examProgresses = await ExamProgress.find({ exam: examId })
      .populate('student', 'fullName mssv')
      .select('student status lastSaved score');
    
    res.json(examProgresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default examProgressRouter;