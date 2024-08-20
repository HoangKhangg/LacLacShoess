import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken, isTeacher } from '../middlewares/auth.js';


const userRouter = express.Router();

// POST /api/users - Create a new user
userRouter.post('/', async (req, res) => {
  try {
    const { username, mssv, password, role, email, fullName } = req.body;

    // Kiểm tra xem username hoặc email đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const newUser = new User({
      mssv,
      username,
      password: hashedPassword,
      role,
      email,
      fullName
    });

    // Lưu user vào database
    const savedUser = await newUser.save();

    // Trả về user đã tạo (không bao gồm password)
    res.status(201).json({
      id: savedUser._id,
      mssv: savedUser.mssv,
      username: savedUser.username,
      role: savedUser.role,
      email: savedUser.email,
      fullName: savedUser.fullName
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
    console.log(error)  }
});

// POST /api/users/login - User login
userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm user theo username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Kiểm tra password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } 
    );

    // Trả về token và thông tin user
    res.json({
      token,
      user: {
        id: user._id,
        mssv: user.mssv,
        username: user.username,
        role: user.role,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// POST /api/users/create-student - Create a new student (Teacher only)
userRouter.post('/create-student', verifyToken, isTeacher, async (req, res) => {
  try {
    const { username, mssv, password, email, fullName } = req.body;

    // Kiểm tra xem username hoặc email đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới với role 'student'
    const newUser = new User({
      mssv,
      username,
      password: hashedPassword,
      role: 'student',
      email,
      fullName
    });

    // Lưu user vào database
    const savedUser = await newUser.save();

    // Trả về user đã tạo (không bao gồm password)
    res.status(201).json({
      id: savedUser._id,
      mssv: savedUser.mssv,
      username: savedUser.username,
      role: savedUser.role,
      email: savedUser.email,
      fullName: savedUser.fullName
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error: error.message });
    console.log(error);
  }
});

export default userRouter;