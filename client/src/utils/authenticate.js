import axios from 'axios';

export const handleLogin = async (email, password) => {
  try {
    const res = await axios.post('/api/users/login', { email, password });
    if (res.data.success) {
      console.log(res);
      return { success: true };
    } else {
      console.log(res);
      return { success: false, message: 'Invalid credentials' };
    }
  } catch (err) {
    console.log(err.response);
    return { success: false, message: 'Invalid credentials' };
  }
};

export const handleRegister = async (email, password) => {
  try {
    const res = await axios.post('/api/users/register', { email, password });
    if (res.data.success) {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  } catch (err) {
    return { success: false, message: 'Invalid credentials' };
  }
};
