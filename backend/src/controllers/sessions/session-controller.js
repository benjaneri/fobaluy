const express = require('express');
const router = express.Router();

const { loginUser, logoutUser } = require('../../services/sessions/session-service');

router.post('/login', async function (req, res, next) {
  try {
    let loginInfo = await loginUser(req.body);
    return res.status(200).json(loginInfo);
  } catch (err) {
    return next(err);
  }
});

router.post('/logout', async function (req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    await logoutUser(token);
    res.clearCookie('token');
    return res.status(200).send('User logged out');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
