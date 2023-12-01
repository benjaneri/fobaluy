const { ElementNotFoundException } = require('../../common/exceptions/exceptions');

const { getUserById } = require('../users/user-service');
const { getUserLevel } = require('../levels/level-service');
const { addProfile, updateProfileDb, getProfileByUserId } = require('../../data-access/repositories/profiles/profile-repository');
const { validateProfile } = require('./profile-validator');

const createProfile = async function (userId, profile) {
  validateProfile(profile);

  let user = await getUserById(userId);
  if (!user) {
    throw new ElementNotFoundException(`Unable to assign user profile, user with id ${userId} not found`);
  }

  let existsProfile = await existsProfileByUserId(userId);
  if (existsProfile) {
    throw new ElementNotFoundException(`Unable to assign user profile, user with id ${userId} already has a profile`);
  }

  profile.userId = userId;
  let addedProfile = await addProfile(profile);
  return addedProfile;
};

const updateProfile = async function (userId, newProfile) {
  validateProfile(newProfile);

  let existsProfile = await existsProfileByUserId(userId);
  if (!existsProfile) {
    throw new ElementNotFoundException(`Unable to update user profile, user with id ${userId} not found`);
  }

  let udpatedProfile = await updateProfileDb(userId, newProfile);
  return udpatedProfile;
};

const getProfile = async function (userId) {
  let profile = await getProfileByUserId(userId);
  let level = await getUserLevel(userId);
  let profileInfo = { ...profile, level: level };
  return profileInfo;
};

const existsProfileByUserId = async function (userId) {
  let profile = await getProfileByUserId(userId);
  return profile ? true : false;
};

module.exports = { createProfile, updateProfile, getProfile };
