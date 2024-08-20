import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Thêm dòng này
import userRouter from './routers/userRouter.js';
import classRouter from './routers/classRouter.js';
import subjectRouter from './routers/subjectRouter.js';
import chapterRouter from './routers/chapterRouter.js';
import questionRouter from './routers/questionRouter.js';
import examRouter from './routers/examRouter.js';
import examProgressRouter from './routers/ExamProgressRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

// Thêm middleware cors
app.use(cors({
  origin: 'http://localhost:3000', // Địa chỉ của frontend React
  credentials: true // Cho phép gửi cookies nếu cần
}));

app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Định nghĩa routes
app.get('/', (req, res) => {
  res.send('Welcome to the REST API server');
});

app.use('/api/users', userRouter);
app.use('/api/classes', classRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/chapter', chapterRouter);
app.use('/api/questions', questionRouter);
app.use('/api/exams', examRouter);
app.use('/api/examProgress', examProgressRouter);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});