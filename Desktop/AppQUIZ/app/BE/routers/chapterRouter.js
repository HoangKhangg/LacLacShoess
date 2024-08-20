import express from 'express';
import Chapter from '../models/Chapter.js';
import { verifyToken, isAdmin, isTeacher } from '../middlewares/auth.js';

const chapterRouter = express.Router();

// POST /api/chapters - Create a new chapter (Admin and Teacher only)
chapterRouter.post('/create', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Admin or Teacher only.' });
    }

    const { name, subject } = req.body;
    const newChapter = new Chapter({ name, subject });
    const savedChapter = await newChapter.save();
    res.status(201).json(savedChapter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chapter', error: error.message });
  }
});

// GET /api/chapters - Get all chapters
chapterRouter.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find().populate('subject', 'name');
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapters', error: error.message });
  }
});

// GET /api/chapters/:id - Get a specific chapter
chapterRouter.get('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate('subject', 'name');
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapter', error: error.message });
  }
});

// PUT /api/chapters/:id - Update a chapter (Admin and Teacher only)
chapterRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Admin or Teacher only.' });
    }

    const { name, subject } = req.body;
    const updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      { name, subject },
      { new: true, runValidators: true }
    ).populate('subject', 'name');

    if (!updatedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.json(updatedChapter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating chapter', error: error.message });
  }
});

// DELETE /api/chapters/:id - Delete a chapter (Admin only)
chapterRouter.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!deletedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chapter', error: error.message });
  }
});

export default chapterRouter;