import axios from 'axios';
import { API_URL } from '../config';
import { GetUserLogin } from './components/services';

export const createAxiosInstance = async () => {
  try {
    const cookies = await GetUserLogin.isAuthenticate();
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": cookies
      }
    });
    return instance;
  } catch (error) {
    console.error("Error creating Axios instance:", error);
    throw error;
  }
};