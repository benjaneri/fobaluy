const express = require('express');
const router = express.Router();

const {
  createGame,
  updateGame,
  deleteGame,
  getAllGames,
  getAllGamesByUserId,
  addGamePlayer,
  removeGamePlayer,
} = require('../../services/games/game-service');
const { verifyToken, verifyPermissions } = require('../../common/middlewares/auth-middleware');

router.post('/games', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    let game = await createGame(req.body);
    return res.status(201).send(game);
  } catch (err) {
    return next(err);
  }
});

router.put('/games/:gameId', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { gameId } = req.params;
    let newGame = await updateGame(gameId, req.body);
    return res.status(200).send(newGame);
  } catch (err) {
    return next(err);
  }
});

router.delete('/games/:gameId', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { gameId } = req.params;
    let result = await deleteGame(gameId);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
});

router.get('/games', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { active, courtName, level, playersAmount } = req.query;
    let filters = { active, courtName, level, playersAmount, userEmail: req.userEmail };
    let games = await getAllGames(filters);
    return res.status(200).send(games);
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/games/:gameId/players/:playerId',
  verifyToken,
  verifyPermissions(['player']),
  async function (req, res, next) {
    try {
      const { gameId, playerId } = req.params;
      await addGamePlayer(gameId, playerId);
      return res.status(201).send(`Player ${playerId} added successfully`);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/games/:gameId/players/:playerId',
  verifyToken,
  verifyPermissions(['player']),
  async function (req, res, next) {
    try {
      const { gameId, playerId } = req.params;
      await removeGamePlayer(gameId, playerId);
      return res.status(200).send(`Player ${playerId} removed successfully`);
    } catch (err) {
      return next(err);
    }
  },
);

router.get('/users/:userId/games', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { userId } = req.params;
    const { active, courtName, level, playersAmount } = req.query;
    let filters = { active, courtName, level, playersAmount };
    let games = await getAllGamesByUserId(userId, filters);
    return res.status(200).send(games);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
