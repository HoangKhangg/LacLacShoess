import express from 'express';
import Exam from '../models/Exam.js';
import User from '../models/User.js';
import Class from '../models/Class.js';
import { verifyToken, isAdmin, isTeacher } from '../middlewares/auth.js';

const examRouter = express.Router();

// POST /api/exams - Create a new exam (Admin and Teacher only)
examRouter.post('/create', verifyToken, isTeacher, async (req, res) => {
  try {
    const { name, class: classId, duration, startTime, endTime, questions, shuffleQuestions, shuffleOptions, showResultImmediately } = req.body;

    const newExam = new Exam({
      name,
      class: classId,
      duration,
      startTime,
      endTime,
      questions,
      shuffleQuestions,
      shuffleOptions,
      showResultImmediately
    });

    const savedExam = await newExam.save();

    // Get all students in the class
    const classObj = await Class.findById(classId).populate('students');
    const students = classObj.students.map(student => ({
      student: student._id,
      status: 'not_logged_in'
    }));

    // Update the exam with students
    savedExam.students = students;
    await savedExam.save();

    res.status(201).json(savedExam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating exam', error: error.message });
  }
});

// GET /api/exams - Get all exams
examRouter.get('/', verifyToken, async (req, res) => {
  try {
    const exams = await Exam.find().populate('class', 'name').populate('questions').lean();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams', error: error.message });
  }
});

// GET /api/exams/:id - Get a specific exam
examRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate('class', 'name')
      .populate('questions')
      .populate('students.student', 'username fullName email')
      .lean();
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam', error: error.message });
  }
});

// PUT /api/exams/:id - Update an exam (Admin and Teacher only)
examRouter.put('/:id', verifyToken, isTeacher, async (req, res) => {
  try {
    const updateFields = {};
    const allowedFields = ['name', 'class', 'duration', 'startTime', 'endTime', 'questions', 'shuffleQuestions', 'shuffleOptions', 'showResultImmediately', 'status'];

    allowedFields.forEach(field => {
      if (field in req.body) {
        updateFields[field] = req.body[field];
      }
    });

    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('class', 'name');

    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: 'Error updating exam', error: error.message });
  }
});

// PUT /api/exams/:examId/add-student - Add a student to the exam
examRouter.put('/:examId/add-student', verifyToken, isTeacher, async (req, res) => {
  try {
    const { examId } = req.params;
    const { studentId } = req.body;

    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) {
      return res.status(400).json({ message: 'Invalid student ID or user is not a student' });
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      { 
        $addToSet: { 
          students: { 
            student: studentId, 
            status: 'not_logged_in' 
          } 
        } 
      },
      { new: true, runValidators: true }
    ).populate('students.student', 'username fullName email');

    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student to exam', error: error.message });
  }
});

// PUT /api/exams/:examId/add-students - Add multiple students to the exam
examRouter.put('/:examId/add-students', verifyToken, isTeacher, async (req, res) => {
  try {
    const { examId } = req.params;
    const { studentIds } = req.body;

    if (!Array.isArray(studentIds)) {
      return res.status(400).json({ message: 'studentIds must be an array' });
    }

    const students = await User.find({ _id: { $in: studentIds }, role: 'student' });
    if (students.length !== studentIds.length) {
      return res.status(400).json({ message: 'Some IDs are invalid or not students' });
    }

    const studentsToAdd = students.map(student => ({
      student: student._id,
      status: 'not_logged_in'
    }));

    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      { $addToSet: { students: { $each: studentsToAdd } } },
      { new: true, runValidators: true }
    ).populate('students.student', 'username fullName email');

    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: 'Error adding students to exam', error: error.message });
  }
});

// DELETE /api/exams/:id - Delete an exam (Admin only)
examRouter.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting exam', error: error.message });
  }
});

// PUT /api/exams/:id/toggle-result-visibility - Toggle exam result visibility
examRouter.put('/:examId/toggle-result-visibility', verifyToken, isTeacher, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    exam.showResultImmediately = !exam.showResultImmediately;
    const updatedExam = await exam.save();

    res.json({
      message: `Exam result visibility toggled to ${updatedExam.showResultImmediately ? 'immediate' : 'delayed'}`,
      exam: updatedExam
    });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling exam result visibility', error: error.message });
  }
});

// PUT /api/exams/:id/status - Activate an exam
examRouter.put('/status/:id/:status', verifyToken, isTeacher, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    if(req.params.status==='active') {
      if (exam.status === 'active') {
        return res.status(400).json({ message: 'Exam is already active' });
      }
      exam.status = 'active';
    } else if (exam.params === 'completed') {
      if (exam.status === 'completed') {
        return res.status(400).json({ message: 'Exam is already completed' });
      }
  
      exam.status = 'completed';
    }
    
    const updatedExam = await exam.save();

    res.json({
      message: 'Exam status updated to active',
      exam: updatedExam
    });
  } catch (error) {
    res.status(500).json({ message: 'Error activating exam', error: error.message });
  }
});

// PUT /api/exams/:id/update-time - Update exam time information
examRouter.put('/:id/update-time', verifyToken, isTeacher, async (req, res) => {
  try {
    const { startTime, endTime, duration } = req.body;
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (!Number.isInteger(duration) || duration <= 0) {
      return res.status(400).json({ message: 'Duration must be a positive integer (in minutes).' });
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const now = new Date();

    if (startDate <= now) {
      return res.status(400).json({ message: 'Start time must be in the future' });
    }

    if (endDate - startDate !== duration * 60 * 1000) {
      return res.status(400).json({ message: 'End time must equal start time plus duration' });
    }

    exam.startTime = startDate;
    exam.endTime = endDate;
    exam.duration = duration;

    const updatedExam = await exam.save();

    res.json({
      message: 'Exam time information updated successfully',
      exam: updatedExam
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating exam time information', error: error.message });
  }
});

// PUT /api/exams/:id/extend-time - Extend exam end time and duration
examRouter.put('/:id/extend-time', verifyToken, isTeacher, async (req, res) => {
  try {
    const { endTime, duration } = req.body;
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (!Number.isInteger(duration) || duration <= 0) {
      return res.status(400).json({ message: 'Duration must be a positive integer (in minutes).' });
    }

    const newEndDate = new Date(endTime);
    const oldEndDate = new Date(exam.endTime);

    if (newEndDate <= oldEndDate) {
      return res.status(400).json({ message: 'New end time must be after the current end time.' });
    }

    if (duration <= exam.duration) {
      return res.status(400).json({ message: 'New duration must be greater than the current duration.' });
    }

    const newStartDate = new Date(newEndDate.getTime() - duration * 60 * 1000);

    exam.startTime = newStartDate;
    exam.endTime = newEndDate;
    exam.duration = duration;

    const updatedExam = await exam.save();

    res.json({
      message: 'Exam end time and duration extended successfully',
      exam: updatedExam
    });
  } catch (error) {
    res.status(500).json({ message: 'Error extending exam time', error: error.message });
  }
});

// PUT /api/exams/:examId/students/:studentId - Cập nhật trạng thái của học sinh trong kỳ thi
examRouter.put('/:examId/students/:studentId', verifyToken, isTeacher, async (req, res) => {
  try {
    const { examId, studentId } = req.params;
    const { status } = req.body;

    // Kiểm tra xem trạng thái có hợp lệ không
    const validStatus = ['not_logged_in', 'logged_in', 'started', 'completed', 'needs_support'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Cập nhật trạng thái của học sinh trong Exam
    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, 'students.student': studentId },
      { $set: { 'students.$.status': status } },
      { new: true, runValidators: true }
    ).populate('students.student', 'username fullName email');

    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam not found or student not in exam' });
    }

    // Tìm học sinh đã được cập nhật
    const updatedStudent = updatedExam.students.find(s => s.student._id.toString() === studentId);

    res.json({
      message: 'Student status updated successfully',
      exam: updatedExam._id,
      student: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student status in exam', error: error.message });
  }
});

export default examRouter;