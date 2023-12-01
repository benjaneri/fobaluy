const express = require('express');
const router = express.Router();

const { getUserLevel } = require('../../services/levels/level-service');
const { verifyToken, verifyPermissions } = require('../../common/middlewares/auth-middleware');

router.get('/users/:userId/level', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
    const { userId } = req.params;
    try {
        let level = await getUserLevel(userId);
        return res.status(201).send(level);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;