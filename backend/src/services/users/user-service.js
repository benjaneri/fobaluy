const bcrypt = require('bcrypt');

const { ElementAlreadyExists, ElementNotFoundException, ElementInvalidException } = require('../../common/exceptions/exceptions');
const { addUser, getUserDb, getUserByIdDb, getUserByUsername, deleteUserDb, updatePasswordDb } = require('../../data-access/repositories/users/user-repository');

const validateUser = require('./user-validator');

const createPlayer = async function (newUser) {
  validateUser(newUser);

  const existsGamePlayer = await getUser(newUser.email);
  const existsGamePlayerByUsername = await getUserByUsername(newUser.username);

  if (existsGamePlayer) throw new ElementAlreadyExists('User with the same email already exists');
  if (existsGamePlayerByUsername) throw new ElementAlreadyExists('User with the same username already exists');

  newUser.password = await bcrypt.hash(newUser.password, 10);
  let user = await addUser(newUser);

  return user;
};

const deletePlayer = async function (userId) {
  let exists = await existsUserById(userId);
  if (!exists) {
    throw new ElementNotFoundException('User supposed to be deleted does not exist');
  }

  let deleteResult = await deleteUserDb(userId);
  return deleteResult;
};

const getUser = async function (email) {
  let user = await getUserDb(email);
  return user;
};

const getUserById = async function (id) {
  let user = await getUserByIdDb(id);
  return user;
};

const existsUserById = async function (id) {
  let user = await getUserById(id);
  return user !== null;
};

const updatePassword = async function (userId, newPassword, actualPassword) {
  if (!newPassword || !actualPassword) {
    throw new ElementInvalidException(`New password and actual password are required`);
  }

  let user = await getUserById(userId);
  if (!user) {
    throw new ElementNotFoundException(`User with id ${userId} not found`);
  }

  let isPasswordValid = await bcrypt.compare(actualPassword, user.password);
  if (!isPasswordValid) {
    throw new ElementInvalidException(`Player credentials are invalid`);
  }

  newPassword = await bcrypt.hash(newPassword, 10);
  await updatePasswordDb(userId, newPassword);
};

module.exports = {
  createPlayer,
  getUser,
  getUserById,
  existsUserById,
  deletePlayer,
  updatePassword,
};
