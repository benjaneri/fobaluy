const { ElementInvalidException, ElementNotFoundException } = require('../../common/exceptions/exceptions');
const {
  throwExceptionIfCeroOrLess,
  throwExeptionIfEmptyString,
} = require('../../common/validations/string-validator');

const { existsGame } = require('../games/game-service');
const { existsUserById } = require('../users/user-service');

const validateRatings = async (ratings) => {
  if (!Array.isArray(ratings)) {
    throw new ElementInvalidException('Ratings must be an array');
  }

  const validationPromises = ratings.map(async (rating) => {
    await validateRating(rating);
  });

  await Promise.all(validationPromises);
};

const validateRating = async (rating) => {
  await validateGame(rating.gameId);
  await validatePlayers(rating.playerQualified, rating.playerQualifier);
  validateRatingScore(rating.rating);
  validatePlayed(rating.played);
};

const validateGame = async (gameId) => {
  if (!gameId) {
    throw new ElementInvalidException('GameId must be provided');
  }
  let exists = await existsGame(gameId);
  if (!exists) {
    throw new ElementNotFoundException('GameId does not exist');
  }
};

const validatePlayers = async (playerQualified, playerQualifier) => {
  if (!playerQualified || !playerQualifier) {
    throw new ElementInvalidException('Players must be provided');
  }
  if (playerQualified === playerQualifier) {
    throw new ElementInvalidException('You cannot rate yourself');
  }
  let existsPlayerQualified = await existsUserById(playerQualified);
  let existsPlayerQualifier = await existsUserById(playerQualifier);
  if (!existsPlayerQualified || !existsPlayerQualifier) {
    throw new ElementNotFoundException('Players do not exist');
  }
};

const validateRatingScore = (rating) => {
  throwExeptionIfEmptyString(rating, 'Rating must be provided');
  throwExceptionIfCeroOrLess(rating, 'Rating must be greater than 0');
};

const validatePlayed = (played) => {
  if (!played instanceof Boolean) {
    throw new ElementInvalidException('Played must be a boolean');
  }
  throwExeptionIfEmptyString(played, 'Played must be provided');
};

module.exports = { validateRatings, validateRating };
