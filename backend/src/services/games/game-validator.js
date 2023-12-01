const {
  throwExeptionIfEmptyString,
  throwExceptionIfMinLength,
  throwExceptionIfCeroOrLess,
} = require('../../common/validations/string-validator');
const {
  throwExceptionIfDateInvalid,
  throwExceptionIfDateIsEarlierThanToday,
} = require('../../common/validations/date-validator');

const { LEVELS } = require('../../common/constants/constants');
const { ElementNotFoundException, ElementInvalidException } = require('../../common/exceptions/exceptions');
const { existsUserById } = require('../users/user-service');

const validateGame = async function (game) {
  validateCourtName(game.courtName);
  validateLocation(game.location);
  validateLevel(game.level);
  validatePlayersAmount(game.playersAmount);
  await validatePlayers(game.players);
  await validatePlayer(game.creatorId);
  validateDate(game.startDate);
  validateDuration(game.duration);
  validateCountry(game.country);
  validateRegion(game.region);
};

const validateCourtName = function (courtName) {
  throwExeptionIfEmptyString(courtName, 'Invalid court name for this game');
  throwExceptionIfMinLength(courtName, 1, 'Court name should be at least 1 character long');
};

const validateLocation = function (location) {
  throwExeptionIfEmptyString(location, 'Invalid location for this game');
  throwExceptionIfMinLength(location, 1, 'Location should be at least 1 character long');
};

const validateLevel = function (level) {
  if (level) {
    if (!LEVELS.includes(level)) {
      throwExeptionIfEmptyString('', 'Invalid level assigned');
    }
  } else {
    throwExeptionIfEmptyString('', 'A game level is required');
  }
};

const validatePlayersAmount = function (amount) {
  throwExceptionIfCeroOrLess(amount, 'Players amount should be higher than cero');
};

const validateDate = function (startDate) {
  throwExceptionIfDateInvalid(startDate, 'Invalid start date');
  throwExceptionIfDateIsEarlierThanToday(startDate, 'Start date should not be earlier than today');
};

const validateDuration = function (duration) {
  throwExceptionIfCeroOrLess(duration, 'Duration should be higher than cero');
};

const validatePlayers = async function (players) {
  if (!Array.isArray(players)) {
    throw new ElementInvalidException('Players must be an array');
  }
  await Promise.all(
    players.map(async (player) => {
      await validatePlayer(player.id);
    }),
  );
};

const validatePlayer = async function (playerId) {
  if (!playerId) {
    throw new ElementInvalidException('Player id must be provided');
  }
  let exists = await existsUserById(playerId);
  if (!exists) {
    throw new ElementNotFoundException('Player does not exist');
  }
};

const validateCountry = function (country) {
  throwExeptionIfEmptyString(country, 'Country is required');
}

const validateRegion = function (region) {
  throwExeptionIfEmptyString(region, 'Region is required');
}

module.exports = { validateGame, validatePlayer };
