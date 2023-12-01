import axios from 'axios';
import { getKey } from '../../common/session-info';
import errorHandler from '../errors/error-handler';

const postProfile = async (profile, userId) => {
  const token = await getKey('token');
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/profiles`, profile, {
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

const putProfile = async (profile, userId) => {
  const token = await getKey('token');
  try {
    const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/profiles`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    errorHandler(error);
    return error.response.data;
  }
};

const getProfile = async (userId) => {
  console.log(userId);
  const token = await getKey('token');
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

module.exports = { postProfile, putProfile, getProfile };
