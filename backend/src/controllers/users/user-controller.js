const express = require('express');
const router = express.Router();

const { createPlayer, deletePlayer, updatePassword } = require('../../services/users/user-service');
const { verifyToken, verifyPermissions } = require('../../common/middlewares/auth-middleware');

router.post('/signup', async function (req, res, next) {
  try {
    let user = await createPlayer(req.body);
    return res.status(201).send(user);
  } catch (err) {
    return next(err);
  }
});

router.delete('/users/:userId', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { userId } = req.params;
    let deleteResult = await deletePlayer(userId);
    return res.status(200).send(deleteResult);
  } catch (err) {
    return next(err);
  }
});

router.put('/users/:userId/password', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { userId } = req.params;
    const { newPassword, actualPassword } = req.body;
    await updatePassword(userId, newPassword, actualPassword);
    return res.status(200).send('Password updated successfully');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;