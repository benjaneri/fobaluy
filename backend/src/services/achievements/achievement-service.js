const Achievement = require('./achievement-list');
const achievement = new Achievement();

const Records = require('../../services/records/record-service');
const Games = require('../../services/games/game-service');

const {
    getMyRatesAmount,
    getMyRatingsAmount,
    getMy5StarRatingsAmount,
} = require('../../data-access/repositories/achievements/achievement-repository');

const getAchievements = async (userId) => {
    const achievements = [];

    const playedGamesCount = await getPlayedGamesCount(userId);
    if (playedGamesCount) achievements.push(playedGamesCount);

    const createdGamesCount = await getCreatedGamesCount(userId);
    if (createdGamesCount) achievements.push(createdGamesCount);

    const ratesCount = await getRatingsIDidToOtherPlayersCount(userId);
    if (ratesCount) achievements.push(ratesCount);

    const myRatings = await getRatingsIGotFromOtherPlayersCount(userId);
    if (myRatings) achievements.push(myRatings);

    const my5StarRatingsCount = await get5StartRatingsPlayerGotCount(userId);
    if (my5StarRatingsCount) achievements.push(my5StarRatingsCount);

    const avgRatingAbove10Games = await getMyAvgRatingAboveWith10GamesPlayedOrMore(userId);
    if (avgRatingAbove10Games) achievements.push(avgRatingAbove10Games);

    return achievements;
};

const getPlayedGamesCount = async (userId) => {
    let ach = [];
    let record = await Records.getRecord(userId);
    let playedGames = await record.gamesPlayed;
    if (playedGames >= 1) ach.push(achievement.PLAY_1_GAME);
    if (playedGames >= 5) ach.push(achievement.PLAY_5_GAMES);
    if (playedGames >= 10) ach.push(achievement.PLAY_10_GAMES);
    if (playedGames >= 20) ach.push(achievement.PLAY_20_GAMES);
    return ach;
};

const getCreatedGamesCount = async (userId) => {
    let ach = [];
    let createdGames = (await Games.getAllGamesByUserId(userId)).length;
    if (createdGames >= 1) ach.push(achievement.CREATE_1_GAME);
    if (createdGames >= 5) ach.push(achievement.CREATE_5_GAMES);
    if (createdGames >= 10) ach.push(achievement.CREATE_10_GAMES);
    if (createdGames >= 20) ach.push(achievement.CREATE_20_GAMES);
    return ach;
};

const getRatingsIDidToOtherPlayersCount = async (userId) => {
    let ach = [];
    let myRates = await getMyRatesAmount(userId);
    if (myRates >= 1) ach.push(achievement.RATE_PLAYER);
    if (myRates >= 5) ach.push(achievement.RATE_5_PLAYERS);
    if (myRates >= 10) ach.push(achievement.RATE_10_PLAYERS);
    if (myRates >= 20) ach.push(achievement.RATE_20_PLAYERS);
    return ach;
}

const getRatingsIGotFromOtherPlayersCount = async (userId) => {
    let ach = [];
    let rates = await getMyRatingsAmount(userId);
    if (rates > 0) ach.push(achievement.GET_RATED);
    return ach;
}

const get5StartRatingsPlayerGotCount = async (userId) => {
    let ach = [];
    let my5StarRates = await getMy5StarRatingsAmount(userId);
    if (my5StarRates >= 5) ach.push(achievement.GET_5_STAR_RATED_5_TIMES);
    if (my5StarRates >= 10) ach.push(achievement.GET_5_STAR_RATED_10_TIMES);
    return ach;
}

const getMyAvgRatingAboveWith10GamesPlayedOrMore = async (userId) => {
    let ach = [];
    let ratesAmount = await getRatingsIGotFromOtherPlayersCount(userId);
    let averageRating = await Records.getRecord(userId).averageRating;
    if (ratesAmount >= 10 && averageRating >= 4) ach.push(achievement.GOOD_BEHAVIOUR);
    return ach;
}

module.exports = { 
    getAchievements, 
    get5StartRatingsPlayerGotCount, 
    getMyAvgRatingAboveWith10GamesPlayedOrMore,
};