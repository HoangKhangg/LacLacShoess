import express from 'express';
import Subject from '../models/Subject.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const subjectRouter = express.Router();

// POST /api/subjects - Create a new subject (Admin only)
subjectRouter.post('/create', verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSubject = new Subject({ name, description });
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subject', error: error.message });
  }
});

// GET /api/subjects - Get all subjects
subjectRouter.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
});

// GET /api/subjects/:id - Get a specific subject
subjectRouter.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error: error.message });
  }
});

// PUT /api/subjects/:id - Update a subject (Admin only)
subjectRouter.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subject', error: error.message });
  }
});

// DELETE /api/subjects/:id - Delete a subject (Admin only)
subjectRouter.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error: error.message });
  }
});

export default subjectRouter;