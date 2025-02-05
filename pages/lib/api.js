// lib/api.js
import axios from 'axios';

const API_URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL_USERS);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchPostsByUser  = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_POSTS}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

