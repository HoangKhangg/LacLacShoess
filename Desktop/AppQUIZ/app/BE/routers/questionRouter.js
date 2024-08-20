import express from 'express';
import Question from '../models/Question.js';
import { verifyToken, isAdmin, isTeacher } from '../middlewares/auth.js';

const questionRouter = express.Router();

// POST /api/questions - Create a new question set (Admin and Teacher only)
questionRouter.post('/create', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Admin or Teacher only.' });
    }
    const { content, chapter, subject, questions } = req.body;
    const newQuestionSet = new Question({ content, chapter, subject, questions });
    const savedQuestionSet = await newQuestionSet.save();
    res.status(201).json(savedQuestionSet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question set', error: error.message });
  }
});

// GET /api/questions - Get all question sets
questionRouter.get('/', async (req, res) => {
  try {
    const questionSets = await Question.find().populate('chapter', 'name').populate('subject', 'name');
    res.json(questionSets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question sets', error: error.message });
  }
});

// PUT /api/questions/bulk-update - Update multiple question sets (Admin and Teacher only)
questionRouter.put('/bulk-update', verifyToken, async (req, res) => {
    try {
      if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Access denied. Admin or Teacher only.' });
      }
      const { questionSets } = req.body;
      if (!Array.isArray(questionSets)) {
        return res.status(400).json({ message: 'Invalid input. Expected an array of question sets.' });
      }
  
      const updatedQuestionSets = await Promise.all(
        questionSets.map(async (set) => {
          const { id, content, chapter, subject, questions } = set;
          const updatedSet = await Question.findByIdAndUpdate(
            id,
            { content, chapter, subject, questions },
            { new: true, runValidators: true }
          ).populate('chapter', 'name').populate('subject', 'name');
          return updatedSet;
        })
      );
  
      res.json(updatedQuestionSets);
    } catch (error) {
      res.status(500).json({ message: 'Error updating question sets', error: error.message });
    }
  });

// GET /api/questions/:id - Get a specific question set
questionRouter.get('/:id', async (req, res) => {
  try {
    const questionSet = await Question.findById(req.params.id)
      .populate('chapter', 'name')
      .populate('subject', 'name');
    if (!questionSet) {
      return res.status(404).json({ message: 'Question set not found' });
    }
    res.json(questionSet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question set', error: error.message });
  }
});

// PUT /api/questions/:id - Update a question set (Admin and Teacher only)
questionRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Admin or Teacher only.' });
    }
    const { content, chapter, subject, questions } = req.body;
    const updatedQuestionSet = await Question.findByIdAndUpdate(
      req.params.id,
      { content, chapter, subject, questions },
      { new: true, runValidators: true }
    ).populate('chapter', 'name').populate('subject', 'name');
    if (!updatedQuestionSet) {
      return res.status(404).json({ message: 'Question set not found' });
    }
    res.json(updatedQuestionSet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating question set', error: error.message });
  }
});

// DELETE /api/questions/:id - Delete a question set (Admin only)
questionRouter.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedQuestionSet = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestionSet) {
      return res.status(404).json({ message: 'Question set not found' });
    }
    res.json({ message: 'Question set deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question set', error: error.message });
  }
});

// GET /api/questions/chapter/:chapterId - Get question sets by chapter
questionRouter.get('/chapter/:chapterId', async (req, res) => {
  try {
    const questionSets = await Question.find({ chapter: req.params.chapterId })
      .populate('chapter', 'name')
      .populate('subject', 'name');
    res.json(questionSets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question sets by chapter', error: error.message });
  }
});

// GET /api/questions/subject/:subjectId - Get question sets by subject
questionRouter.get('/subject/:subjectId', async (req, res) => {
  try {
    const questionSets = await Question.find({ subject: req.params.subjectId })
      .populate('chapter', 'name')
      .populate('subject', 'name');
    res.json(questionSets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question sets by subject', error: error.message });
  }
});

// GET /api/questions/subject/:subjectId - Get all questions by subject
questionRouter.get('/subject/:subjectId', async (req, res) => {
    try {
      const { subjectId } = req.params;
      
      // Kiểm tra xem subjectId có hợp lệ không
      if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({ message: 'Invalid subject ID' });
      }
  
      const questions = await Question.find({ subject: subjectId })
        .populate('chapter', 'name')
        .populate('subject', 'name');
  
      if (questions.length === 0) {
        return res.status(404).json({ message: 'No questions found for this subject' });
      }
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions by subject', error: error.message });
    }
  });


export default questionRouter;