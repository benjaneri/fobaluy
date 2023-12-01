const { ElementNotFoundException } = require('../../common/exceptions/exceptions');

const { updateRecord } = require('../records/record-service');
const { validateRatings, validateRating } = require('./rating-validator');
const {
  addRating,
  deleteRatingDb,
  getRatingById,
  getRating,
  updateRatingDb,
  getGameRatingsDoneByPlayerDb,
  getRatingsReceivedByPlayerDb,
} = require('../../data-access/repositories/ratings/rating-repository');

const createRatings = async (ratings) => {
  await validateRatings(ratings);

  let newRatings = await Promise.all(
    ratings.map(async (rating) => {
      const exists = await existsRating(rating.playerQualified, rating.playerQualifier, rating.gameId);
      if (exists) {
        throw new ElementNotFoundException(`You have already rated this player in this game`);
      }
      await updateRecord(rating.playerQualified, rating.rating);
      return await addRating(rating);
    }),
  );

  return newRatings;
};

const getGameRatingsDoneByPlayer = async (gameId, userId) => {
  return await getGameRatingsDoneByPlayerDb(gameId, userId);
};

const getRatingsReceivedByPlayer = async (userId) => {
  return await getRatingsReceivedByPlayerDb(userId);
};

const updateRating = async (ratingId, rating) => {
  await validateRating(rating);

  const existsRating = await existsRatingById(ratingId);
  if (!existsRating) {
    throw new ElementNotFoundException(`Unable to update rating, rating with id ${ratingId} not found`);
  }

  return await updateRatingDb(ratingId, rating);
};

const deleteRating = async (ratingId) => {
  const existsRating = await existsRatingById(ratingId);
  if (!existsRating) {
    throw new ElementNotFoundException(`Unable to delete rating, rating with id ${ratingId} not found`);
  }
  return await deleteRatingDb(ratingId);
};

const existsRatingById = async (ratingId) => {
  let rating = await getRatingById(ratingId);
  return rating ? true : false;
};

const existsRating = async (playerQualified, playerQualifier, gameId) => {
  let rating = await getRating(playerQualified, playerQualifier, gameId);
  return rating ? true : false;
};

module.exports = {
  createRatings,
  deleteRating,
  existsRatingById,
  updateRating,
  getGameRatingsDoneByPlayer,
  getRatingsReceivedByPlayer,
};
