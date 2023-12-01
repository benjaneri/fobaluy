const express = require('express');
const router = express.Router();

const {
  getRecord,
  getTopRecordsByLevel,
  getTopRecordsByRegion,
  getAllTopRecords,
} = require('../../services/records/record-service');
const { verifyToken, verifyPermissions } = require('../../common/middlewares/auth-middleware');

router.get('/records/top-by-region', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { amount } = req.query;
    let top = await getTopRecordsByRegion(amount, req.userEmail);
    return res.status(200).send(top);
  } catch (err) {
    return next(err);
  }
});

router.get('/records/top-by-level', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { amount } = req.query;
    let top = await getTopRecordsByLevel(amount);
    return res.status(200).send(top);
  } catch (err) {
    return next(err);
  }
});

router.get('/records/top', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { amount } = req.query;
    let result = await getAllTopRecords(amount);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
});

router.get('/users/:userId/records', verifyToken, verifyPermissions(['player']), async function (req, res, next) {
  try {
    const { userId } = req.params;
    let result = await getRecord(userId);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
