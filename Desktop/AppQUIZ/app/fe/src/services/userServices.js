import api from './API.js';

export const loginService = async (username, password) => {
  try {
    const response = await api.post('/api/users/login', {
      username,
      password
    });

    if (response.data.token) {
      // Lưu token vào localStorage
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // Lỗi từ server
      throw new Error(error.response.data.message || 'Đăng nhập thất bại');
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      throw new Error('Không thể kết nối đến server');
    } else {
      // Lỗi khi thiết lập request
      throw new Error('Có lỗi xảy ra, vui lòng thử lại');
    }
  }
};