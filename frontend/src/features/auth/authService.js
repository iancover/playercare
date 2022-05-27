// HTTP client
import axios from 'axios';

// proxy: URL
const API_URL = '/api/users/';

// POST user /api/users/, store local & return user
const registerUser = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// POST user /api/users/login/, store local & return user
const loginUser = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// Remove from localStorage to logout
const logoutUser = async () => localStorage.removeItem('user');

const authService = {
  registerUser,
  loginUser,
  logoutUser,
};

export default authService;
