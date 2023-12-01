import axios from 'axios';
import { getKey } from '../../common/session-info';
import errorHandler from '../errors/error-handler';

const getRecords = async (amount) => {
  const token = await getKey('token');
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/records/top?amount=${amount}`, {
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

const getRecord = async (userId) => {
  const token = await getKey('token');
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/records`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

const getRecordsByRegion = async (amount) => {
  const token = await getKey('token');
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/records/top-by-region?amount=${amount}`, {
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

const getRecordsByLevel = async (amount) => {
  const token = await getKey('token');
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/records/top-by-level?amount=${amount}`, {
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

module.exports = { getRecords, getRecord, getRecordsByRegion, getRecordsByLevel };
