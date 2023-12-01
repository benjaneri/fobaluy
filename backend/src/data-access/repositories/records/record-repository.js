const { DatabaseException } = require('../../../common/exceptions/exceptions');

const Record = require('../../models/records/record-model');
const User = require('../../models//users/user-model');
const Profile = require('../../models//profiles/profile-model');

const getRecordDb = async (userId) => {
  try {
    let record = await Record.findOne({ where: { userId } });
    return record;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const updateRecordDb = async (userId, newRecord) => {
  try {
    let record = await Record.findOne({ where: { userId } });
    let updatedRecord = await record.update(newRecord);
    return updatedRecord;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getAllTopRecordsDb = async (amount) => {
  try {
    let topAmount = parseInt(amount);
    let topRatings = await Record.findAll({
      order: [['avgRating', 'DESC']],
      limit: topAmount,
      include: [
        {
          model: User,
          include: [
            {
              model: Profile,
              as: 'profile',
            },
          ],
          as: 'user',
        },
      ],
    });
    return topRatings;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getTopRecordsByRegionDb = async (amount, region) => {
  try {
    let topAmount = parseInt(amount);
    let topRatings = await Record.findAll({
      order: [['avgRating', 'DESC']],
      limit: topAmount,
      include: [
        {
          model: User,
          include: [
            {
              model: Profile,
              as: 'profile',
            },
          ],
          as: 'user',
        },
      ],
    });

    topRatings = topRatings.filter((record) => {
      return record.user.profile?.region === region;
    });

    return topRatings;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

module.exports = { getRecordDb, updateRecordDb, getAllTopRecordsDb, getTopRecordsByRegionDb };
