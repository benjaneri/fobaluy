import axios from 'axios';
import { getKey } from '../../common/session-info';
import errorHandler from '../errors/error-handler';

const postLogin = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, { email, password });
    return response;
  } catch (error) {
    return error;
  }
};

const postLogout = async () => {
  const token = await getKey('token');
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

const postSignup = async (user) => {
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/signup`, user);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const deleteUser = async (userId) => {
  const token = await getKey('token');
  try {
    const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

const putPassword = async (userId, newInfo) => {
  const token = await getKey('token');
  try {
    const response = await axios.put(
      `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/password`,
      newInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    errorHandler(error);
    return error.response.data;
  }
};

const isUserLoggedIn = async () => {
  const token = await getKey('token');
  const userId = await getKey('userId');
  return token && userId ? true : false;
};

module.exports = { postLogin, postLogout, postSignup, deleteUser, putPassword, isUserLoggedIn };
