import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  mssv:{
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

// Mongoose tự động tạo trường _id, tương đương với id trong yêu cầu của bạn

const User = mongoose.model('User', userSchema);

export default User;