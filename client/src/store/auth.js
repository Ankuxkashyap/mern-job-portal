import {create }from 'zustand';
import axios from '../api/axios';

const useAuthStore = create((set) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return {
    user: storedUser || null,
    isAuthenticated: !!storedUser,

    login: async (email, password) => {
      try {
        const response = await axios.post('/auth/login', { email, password });
        set({ user: response.data, isAuthenticated: true });
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    logout: async () => {
      try {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    },

    register: async (name, email, password) => {
      try {
        const response = await axios.post('/auth/register', { name, email, password });
        set({ user: response.data, isAuthenticated: true });
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },

  roleSelect: async (role) => {
    try {
      const res = await axios.post('/auth/role-selection', { role });
      set({ user: res.data });
      return res.data;
    } catch (err) {
      console.error('Role selection failed: ', err);
      return { success: false };
    }
  }
  };
});

export default useAuthStore;