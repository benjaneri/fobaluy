const { DatabaseException } = require('../../../common/exceptions/exceptions');

const Rating = require('../../models/ratings/rating-model');

const getMyRatesAmount = async function (userId) {
    try {
        const myRates = await Rating.findAll({
            where: {
                playerQualifier: userId,
            },
        });
        return myRates.length;
    } catch (err) {
        throw new DatabaseException('Database error: ' + err);
    }
};

const getMyRatingsAmount = async function (userId) {
    try {
        const myRates = await Rating.findAll({
            where: {
                playerQualified: userId,
            },
        });
        return myRates.length;
    } catch (err) {
        throw new DatabaseException('Database error: ' + err);
    }
};

const getMy5StarRatingsAmount = async function (userId) {
    try {
        const my5StarRates = await Rating.findAll({
            where: {
                playerQualified: userId,
                rating: 5,
            },
        });
        return my5StarRates.length;
    } catch (err) {
        throw new DatabaseException('Database error: ' + err);
    }
};

module.exports = { getMyRatesAmount, getMyRatingsAmount, getMy5StarRatingsAmount};