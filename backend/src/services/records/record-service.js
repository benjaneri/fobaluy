const {
  updateRecordDb,
  getRecordDb,
  getAllTopRecordsDb,
  getTopRecordsByRegionDb,
} = require('../../data-access/repositories/records/record-repository');
const { validateTopAmount } = require('./record-validator');
const { getMyRatingsAmount } = require('../../data-access/repositories/achievements/achievement-repository');
const { getUser } = require('../users/user-service');
const { getProfileByUserId } = require('../../data-access/repositories/profiles/profile-repository');
const { getUserLevel } = require('../levels/level-service');

const updateRecord = async (userId, newRating) => {
  const actualRecord = await getRecord(userId);
  let amountOfGamesPlayerHasBeenRated = await getMyRatingsAmount(userId);
  if (actualRecord.minRating === 0) actualRecord.minRating = newRating;
  const newRecord = {
    maxRating: Math.max(actualRecord.maxRating, newRating),
    minRating: Math.min(actualRecord.minRating, newRating),
    avgRating:
      (actualRecord.avgRating * amountOfGamesPlayerHasBeenRated + newRating) / (amountOfGamesPlayerHasBeenRated + 1),
    gamesPlayed: actualRecord.gamesPlayed,
  };
  const updatedRecord = await updateRecordDb(userId, newRecord);
  return updatedRecord;
};

const updateGamesPlayed = async (userId) => {
  const actualRecord = await getRecord(userId);
  const newRecord = {
    maxRating: actualRecord.maxRating,
    minRating: actualRecord.minRating,
    avgRating: actualRecord.avgRating,
    gamesPlayed: actualRecord.gamesPlayed + 1,
  };
  const updatedRecord = await updateRecordDb(userId, newRecord);
  return updatedRecord;
};

const getRecord = async (userId) => {
  const record = await getRecordDb(userId);
  return record;
};

const getTopRecordsByRegion = async (amount, userEmail) => {
  validateTopAmount(amount);

  let user = await getUser(userEmail);
  let userProfile = await getProfileByUserId(user.id);
  let region = userProfile.region;

  let topRatings = await getTopRecordsByRegionDb(amount, region);
  return topRatings;
};

const getTopRecordsByLevel = async (amount) => {
  validateTopAmount(amount);

  let topRatings = await getAllTopRecordsDb(amount);
  for (let i = 0; i < topRatings.length; i++) {
    let user = topRatings[i].user;
    let level = await getUserLevel(user.id);
    topRatings[i].level = level;
  }

  topRatings.sort((a, b) => {
    return b.level - a.level;
  });

  return topRatings;
};

const getAllTopRecords = async (amount) => {
  validateTopAmount(amount);

  let topRatings = await getAllTopRecordsDb(amount);
  return topRatings;
};

module.exports = {
  updateRecord,
  getRecord,
  updateGamesPlayed,
  getTopRecordsByRegion,
  getTopRecordsByLevel,
  getAllTopRecords,
};
