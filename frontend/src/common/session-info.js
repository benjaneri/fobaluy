import * as SecureStore from 'expo-secure-store';

const storeKey = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('Failed to store key:', error);
  }
};

const getKey = async (key) => {
  try {
    return SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Failed to get key:', error);
    return null;
  }
};

const deleteKey = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Failed to delete key:', error);
  }
};

const deleteAllKeys = async () => {
  try {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('userId');
  } catch (error) {
    console.error('Failed to delete keys:', error);
  }
};

export { storeKey, getKey, deleteKey, deleteAllKeys };
