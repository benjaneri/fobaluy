const { Op } = require('sequelize');
const { DatabaseException } = require('../../../common/exceptions/exceptions');

const Game = require('../../models/games/game-model');
const Player = require('../../models/users/user-model');
const GamePlayer = require('../../models/games/game-player-model');

const addGame = async function (newGame) {
  try {
    let game = await Game.create(newGame);

    for (let player of newGame.players) {
      let playerDb = await Player.findOne({ where: { id: player.id } });
      if (playerDb) {
        await GamePlayer.create({ gameId: game.id, playerId: player.id });
      }
    }

    return game;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const updateGameDb = async function (gameId, newGame) {
  try {
    let game = await Game.findOne({ where: { id: gameId } });
    let updatedGame = await game.update(newGame);

    // let previousPlayers = await GamePlayer.findAll({ where: { gameId } });
    // for (let previousPlayer of previousPlayers) {
    //   await previousPlayer.destroy();
    // }

    // for (let player of newGame.players) {
    //   let playerDb = await Player.findOne({ where: { id: player.id } });
    //   if (playerDb) {
    //     await GamePlayer.create({ gameId: updatedGame.id, playerId: player.id });
    //   }
    // }

    return updatedGame;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const deleteGameDb = async function (gameId) {
  try {
    let game = await Game.findOne({ where: { id: gameId } });
    if (!game) {
      throw new DatabaseException('Game not found');
    }

    let gamePlayers = await GamePlayer.findAll({ where: { gameId } });
    for (let gamePlayer of gamePlayers) {
      await gamePlayer.destroy();
    }

    await game.destroy();
    return 'Game deleted successfully!';
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getGameByIdDb = async function (gameId) {
  try {
    let game = await Game.findOne({
      where: { id: gameId },
    });
    return game;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getGames = async function (filters) {
  try {
    const whereCondition = {};
    if (filters.courtName) {
      const searchTerm = filters.courtName.toLowerCase();
      whereCondition.courtName = { [Op.like]: `%${searchTerm}%` };
    }
    if (filters.level) {
      whereCondition.level = filters.level;
    }
    if (filters.playersAmount) {
      whereCondition.playersAmount = filters.playersAmount;
    }
    if (filters.region) {
      whereCondition.region = filters.region;
    }
    if (filters.country) {
      whereCondition.country = filters.country;
    }

    const order = [['startDate', 'ASC']];

    let dateCondition = {};
    if (filters?.active !== undefined) {
      dateCondition =
        filters?.active == 'true' ? { startDate: { [Op.gt]: new Date() } } : { startDate: { [Op.lte]: new Date() } };
    }

    const games = await Game.findAll({
      where: { ...whereCondition, ...dateCondition },
      order,
      include: { model: Player, as: 'players' },
    });

    return games;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getGamesByUserId = async function (userId, filters) {
  try {
    const whereCondition = {};
    if (filters?.courtName) {
      whereCondition.courtName = filters.courtName;
    }
    if (filters?.level) {
      whereCondition.level = filters.level;
    }
    if (filters?.playersAmount) {
      whereCondition.playersAmount = filters.playersAmount;
    }

    let dateCondition = {};
    if (filters?.active !== undefined) {
      dateCondition =
        filters?.active == 'true' ? { startDate: { [Op.gt]: new Date() } } : { startDate: { [Op.lte]: new Date() } };
    }

    let games = await GamePlayer.findAll({
      where: { playerId: userId },
      include: [
        {
          model: Game,
          as: 'Game',
          where: { ...whereCondition, ...dateCondition },
          include: { model: Player, as: 'players' },
        },
      ],
      order: [[Game, 'startDate', 'ASC']],
    });
    games = games.map((game) => game.Game);
    return games;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getGamePlayer = async function (gameId, userId) {
  try {
    let gamePlayer = await GamePlayer.findOne({ where: { gameId, playerId: userId } });
    return gamePlayer;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const addGamePlayerDb = async function (gameId, userId) {
  try {
    const gamePlayer = await GamePlayer.create({ gameId, playerId: userId });
    return gamePlayer;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const deleteGamePlayerDb = async function (gameId, userId) {
  try {
    const gamePlayer = await GamePlayer.findOne({ where: { gameId, playerId: userId } });
    await gamePlayer.destroy();
    return 'Player is not assigned to this game anymore!';
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

const getPlayersByGameId = async function (gameId) {
  try {
    let gamePlayers = await GamePlayer.findAll({ where: { gameId } });
    return gamePlayers;
  } catch (err) {
    throw new DatabaseException('Database error: ' + err);
  }
};

module.exports = {
  addGame,
  updateGameDb,
  deleteGameDb,
  getGameByIdDb,
  getGames,
  getGamesByUserId,
  getGamePlayer,
  addGamePlayerDb,
  getPlayersByGameId,
  deleteGamePlayerDb,
};
