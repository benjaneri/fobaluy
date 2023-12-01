import axios from 'axios';
import { getKey } from '../../common/session-info';
import errorHandler from '../errors/error-handler';

const getUserAchievements = async (userId) => {
  const token = await getKey('token');
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/achievements`, {
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

module.exports = {
  getUserAchievements,
};
