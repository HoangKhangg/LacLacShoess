// routes/classRouter.js
import express from 'express';
import Class from '../models/Class.js';
import User from '../models/User.js';
import { verifyToken, isAdmin, isTeacher } from '../middlewares/auth.js';

const classRouter = express.Router();

// POST /api/classes - Create a new class (Admin only)
classRouter.post('/create', verifyToken, async (req, res) => {
  try {
    const { name, subject, semester, academicYear, teacher, students } = req.body;

    const newClass = new Class({
      name,
      subject,
      semester,
      academicYear,
      teacher,
      students
    });

    const savedClass = await newClass.save();

    res.status(201).json(savedClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class', error: error.message });
  }
});

// GET /api/classes - Lấy tất cả các lớp
classRouter.get('/', verifyToken, async (req, res) => {
  try {
    const classes = await Class.find().populate('subject teacher students');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
});

// GET /api/classes/subject/:subjectId - Lấy lớp theo môn học
classRouter.get('/subject/:subjectId', verifyToken, async (req, res) => {
  try {
    const { subjectId } = req.params;
    const classes = await Class.find({ subject: subjectId }).populate('subject teacher students');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes by subject', error: error.message });
  }
});

// PUT /api/classes/:classId/add-student - Thêm một sinh viên vào lớp
classRouter.put('/:classId/add-student', verifyToken, isTeacher, async (req, res) => {
  try {
    const { classId } = req.params;
    const { studentId } = req.body;

    // Kiểm tra xem người dùng có phải là sinh viên không
    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) {
      return res.status(400).json({ message: 'Invalid student ID or user is not a student' });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { students: studentId } },
      { new: true, runValidators: true }
    ).populate('students', 'username fullName email');

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student to class', error: error.message });
  }
});

// PUT /api/classes/:classId/add-students - Thêm nhiều sinh viên vào lớp
classRouter.put('/:classId/add-students', verifyToken, isTeacher, async (req, res) => {
  try {
    const { classId } = req.params;
    const { studentIds } = req.body;

    if (!Array.isArray(studentIds)) {
      return res.status(400).json({ message: 'studentIds must be an array' });
    }

    // Kiểm tra xem tất cả ID có phải là của sinh viên không
    const students = await User.find({ _id: { $in: studentIds }, role: 'student' });
    if (students.length !== studentIds.length) {
      return res.status(400).json({ message: 'Some IDs are invalid or not students' });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { students: { $each: studentIds } } },
      { new: true, runValidators: true }
    ).populate('students', 'username fullName email');

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Error adding students to class', error: error.message });
  }
});
export default classRouter;
