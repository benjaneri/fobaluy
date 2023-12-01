const { DatabaseException } = require('../../../common/exceptions/exceptions');

const Profile = require('../../models//profiles/profile-model');

const addProfile = async function (newProfile) {
  try {
    let profile = await Profile.create(newProfile);
    return profile;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const updateProfileDb = async function (userId, newProfile) {
  try {
    let profile = await Profile.findOne({ where: { userId } });
    let updatedProfile = await profile.update(newProfile);
    return updatedProfile;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getProfileByUserId = async function (userId) {
  try {
    let profile = await Profile.findOne({ where: { userId } });
    return profile;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

module.exports = { addProfile, updateProfileDb, getProfileByUserId };
