const { DatabaseException } = require('../../../common/exceptions/exceptions');
const Rating = require('../../models/ratings/rating-model');
const Game = require('../../models/games/game-model');
const User = require('../../models/users/user-model');

const addRating = async (rating) => {
  try {
    let newRating = await Rating.create(rating);
    return newRating;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const updateRatingDb = async (ratingId, newRating) => {
  try {
    let rating = await Rating.findOne({ where: { id: ratingId } });
    let updatedRating = await rating.update(newRating);
    return updatedRating;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const deleteRatingDb = async (ratingId) => {
  try {
    let rating = await Rating.findOne({ where: { id: ratingId } });
    await rating.destroy();
    return 'Rating deleted successfully!';
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getRatingById = async (ratingId) => {
  try {
    let rating = await Rating.findOne({ where: { id: ratingId } });
    return rating;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getRating = async (playerQualified, playerQualifier, gameId) => {
  try {
    let rating = await Rating.findOne({
      where: { playerQualified, playerQualifier, gameId },
    });
    return rating;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getGameRatingsDoneByPlayerDb = async (gameId, userId) => {
  try {
    let ratings = await Rating.findAll({
      where: { gameId, playerQualifier: userId },
      include: [
        {
          model: Game,
        },
        {
          model: User,
          as: 'qualified',
          attributes: ['username', 'id'],
        },
      ],
    });
    return ratings;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getRatingsReceivedByPlayerDb = async (userId) => {
  try {
    let ratings = await Rating.findAll({
      where: { playerQualified: userId },
      include: [
        {
          model: Game,
        },
        {
          model: User,
          as: 'qualifier',
          attributes: ['username', 'id'],
        },
      ],
    });
    return ratings;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

module.exports = {
  addRating,
  updateRatingDb,
  deleteRatingDb,
  getRatingById,
  getRating,
  getGameRatingsDoneByPlayerDb,
  getRatingsReceivedByPlayerDb,
};
