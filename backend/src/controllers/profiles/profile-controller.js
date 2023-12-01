const express = require('express');
const router = express.Router();

const { createProfile, updateProfile, getProfile } = require('../../services/profiles/profile-service');
const { verifyToken, verifyPermissions } = require('../../common/middlewares/auth-middleware');

router.post('/users/:userId/profiles', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  const { userId } = req.params;
  try {
    let profile = await createProfile(userId, req.body);
    return res.status(201).send(profile);
  } catch (err) {
    return next(err);
  }
});

router.put('/users/:id/profiles', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  const { id } = req.params;
  try {
    let updatedProfile = await updateProfile(id, req.body);
    return res.status(200).send(updatedProfile);
  } catch (err) {
    return next(err);
  }
});

router.get('/users/:userId/profiles', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  const { userId } = req.params;
  try {
    let profile = await getProfile(userId);
    return res.status(200).send(profile);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
