const express = require('express');
const router = express.Router();

const {
  createRatings,
  deleteRating,
  updateRating,
  getGameRatingsDoneByPlayer,
  getRatingsReceivedByPlayer,
} = require('../../services/ratings/rating-service');
const { verifyToken, verifyPermissions } = require('../../common/middlewares/auth-middleware');

router.post('/ratings', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    let ratings = await createRatings(req.body);
    return res.status(201).send(ratings);
  } catch (err) {
    return next(err);
  }
});

router.put('/ratings/:ratingId', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { ratingId } = req.params;
    let newRating = await updateRating(ratingId, req.body);
    return res.status(200).send(newRating);
  } catch (err) {
    return next(err);
  }
});

router.delete('/ratings/:ratingId', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { ratingId } = req.params;
    let result = await deleteRating(ratingId);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
});

router.get('/games/:gameId/ratings', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { gameId } = req.params;
    const { qualifier } = req.query;
    let ratings = await getGameRatingsDoneByPlayer(gameId, qualifier);
    return res.status(200).send(ratings);
  } catch (err) {
    return next(err);
  }
});

router.get(
  '/users/:userId/ratings/received',
  verifyToken,
  verifyPermissions(['player']),
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      let ratings = await getRatingsReceivedByPlayer(userId);
      return res.status(200).send(ratings);
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
