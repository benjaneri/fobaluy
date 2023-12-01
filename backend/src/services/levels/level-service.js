const { getRecordDb } = require('../../data-access/repositories/records/record-repository');

const getUserLevel = async (userId) => {
  let record = await getRecordDb(userId);
  let points = await record.gamesPlayed;
  let level = 1;
  if (points >= 3) level++;
  if (points >= 7) level++;
  if (points >= 12) level++;
  if (points >= 20) level++;
  if (points >= 30) level++;
  return level;
};

module.exports = {
  getUserLevel,
};
