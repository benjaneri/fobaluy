import axios from 'axios';
import { getKey } from '../../common/session-info';
import errorHandler from '../errors/error-handler';

const postGame = async (game) => {
  const token = await getKey('token');
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/games`, game, {
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

const getGames = async (active, playersAmount, courtName, level) => {
  const token = await getKey('token');
  let condition = '';
  condition += active === undefined ? '' : `active=${active}&`;
  condition += playersAmount === undefined ? '' : `playersAmount=${playersAmount}&`;
  condition += courtName === undefined ? '' : `courtName=${courtName}&`;
  condition += level === undefined ? '' : `level=${level}&`;
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/games?${condition}`, {
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

const getUserGames = async (userId, active) => {
  const token = await getKey('token');
  const condition = active === undefined ? '' : `?active=${active}`;
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/games${condition}`, {
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

const putGame = async (gameId, game) => {
  const token = await getKey('token');
  try {
    const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/games/${gameId}`, game, {
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

const deleteGame = async (gameId) => {
  const token = await getKey('token');
  try {
    const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/games/${gameId}`, {
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

const joinGame = async (gameId, userId) => {
  const token = await getKey('token');
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/games/${gameId}/players/${userId}`,
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

const leaveGame = async (gameId, userId) => {
  const token = await getKey('token');
  try {
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_URL}/games/${gameId}/players/${userId}`,
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

const isUserGamePlayer = (game, userId) => {
  return game.players.some((player) => player.id == userId);
};

module.exports = {
  postGame,
  getGames,
  getUserGames,
  putGame,
  deleteGame,
  joinGame,
  leaveGame,
  isUserGamePlayer,
};
