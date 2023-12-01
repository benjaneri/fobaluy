const { DatabaseException } = require('../../../common/exceptions/exceptions');
const User = require('../../models//users/user-model');
const Record = require('../../models/records/record-model');

const addUser = async function (newUser) {
  try {
    newUser.record = {
      maxRating: 0,
      minRating: 0,
      avgRating: 0,
      gamesPlayed: 0,
    };

    const user = await User.create(newUser, {
      include: [{ model: Record, as: 'record' }],
    });

    return user;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const deleteUserDb = async function (userId) {
  try {
    const deleteResult = await User.destroy({ where: { id: userId } });
    return 'User deleted successfully';
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getUserDb = async function (email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getUserByUsername = async function (username) {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getUserByIdDb = async function (id) {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const updatePasswordDb = async function (userId, newPassword) {
  try {
    const user = await User.findOne({ where: { id: userId } });
    const updatedUser = await user.update({ password: newPassword });
    return updatedUser;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

module.exports = { addUser, deleteUserDb, getUserDb, getUserByUsername, getUserByIdDb, updatePasswordDb };
