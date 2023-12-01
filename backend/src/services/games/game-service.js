const { ElementNotFoundException } = require('../../common/exceptions/exceptions');

const {
  addGame,
  updateGameDb,
  deleteGameDb,
  getGameByIdDb,
  getGames,
  getGamesByUserId,
  addGamePlayerDb,
  getPlayersByGameId,
  getGamePlayer,
  deleteGamePlayerDb,
} = require('../../data-access/repositories/games/game-repository.js');
const { getProfileByUserId } = require('../../data-access/repositories/profiles/profile-repository');

const { updateGamesPlayed } = require('../records/record-service');
const { getUser } = require('../users/user-service');
const { validateGame, validatePlayer } = require('./game-validator');

const createGame = async function (newGame) {
  await validateGame(newGame);

  newGame.players.forEach((player) => {
    updateGamesPlayed(player.id);
  });

  let game = await addGame(newGame);
  return game;
};

const updateGame = async function (gameId, newGame) {
  await validateGame(newGame);

  let game = await getGameById(gameId);
  if (!game) {
    throw new ElementNotFoundException(`Game with id ${gameId} not found`);
  }

  const updatedGame = await updateGameDb(gameId, newGame);
  return updatedGame;
};

const deleteGame = async function (gameId) {
  let game = await getGameById(gameId);
  if (!game) {
    throw new ElementNotFoundException(`Game with id ${gameId} not found`);
  }

  const result = await deleteGameDb(gameId);
  return result;
};

const getGameById = async function (gameId) {
  return await getGameByIdDb(gameId);
};

const existsGame = async function (gameId) {
  let game = await getGameById(gameId);
  return game ? true : false;
};

const getAllGames = async function (filters) {
  let user = await getUser(filters.userEmail);
  let userProfile = await getProfileByUserId(user.id);
  filters.region = userProfile.region;
  filters.country = userProfile.country;

  return await getGames(filters);
};

const getAllGamesByUserId = async function (userId, filters) {
  return await getGamesByUserId(userId, filters);
};

const addGamePlayer = async function (gameId, userId) {
  await validatePlayer(userId);
  let gamePlayer = await getGamePlayer(gameId, userId);
  if (gamePlayer) {
    throw new ElementNotFoundException('Player already added to this game');
  }

  let game = await getGameById(gameId);
  if (!game) {
    throw new ElementNotFoundException('Game does not exist');
  }
  if (Date.now() > game.startDate) {
    throw new ElementNotFoundException('Game has already started');
  }

  let gamePlayers = await getPlayersByGameId(gameId);
  if (gamePlayers.length >= game.playersAmount) {
    throw new ElementNotFoundException('Game is full');
  }

  return await addGamePlayerDb(gameId, userId);
};

const removeGamePlayer = async function (gameId, userId) {
  let gamePlayer = await getGamePlayer(gameId, userId);
  if (!gamePlayer) {
    throw new ElementNotFoundException('Player is not in this game');
  }

  let game = await getGameById(gameId);
  if (Date.now() > game.startDate) {
    throw new ElementNotFoundException('Game has already started');
  }

  return await deleteGamePlayerDb(gameId, userId);
};

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  getGameById,
  existsGame,
  getAllGames,
  getAllGamesByUserId,
  addGamePlayer,
  removeGamePlayer,
};
