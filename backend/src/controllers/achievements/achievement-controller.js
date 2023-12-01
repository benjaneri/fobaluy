const express = require('express');
const router = express.Router();

const { getAchievements } = require('../../services/achievements/achievement-service');
const { verifyToken, verifyPermissions } = require('../../common/middlewares/auth-middleware');

router.get('/users/:userId/achievements', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
    const { userId } = req.params;
    try {
        let achievements = await getAchievements(userId);
        return res.status(201).send(achievements);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;