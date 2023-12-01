import axios from 'axios';
import { getKey } from '../../common/session-info';
import errorHandler from '../errors/error-handler';

const getRatingsDoneByPlayerAndGame = async (playerId, gameId) => {
  const token = await getKey('token');
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/games/${gameId}/ratings?qualifier=${playerId}`,
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

const getRatingsReceivedByPlayer = async (playerId) => {
  const token = await getKey('token');
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/${playerId}/ratings/received`, {
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

const postRating = async (rating) => {
  const token = await getKey('token');
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/ratings`, [rating], {
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

module.exports = { getRatingsDoneByPlayerAndGame, getRatingsReceivedByPlayer, postRating };
