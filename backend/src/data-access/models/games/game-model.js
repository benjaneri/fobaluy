const { DataTypes } = require('sequelize');
const sequelize = require('../../database-config');

const Rating = require('../ratings/rating-model');

const Game = sequelize.define('Game', {
  courtName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  playersAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Game.hasMany(Rating, { foreignKey: 'gameId', as: 'ratings' });
Rating.belongsTo(Game, { foreignKey: 'gameId' });

sequelize
  .sync()
  .then(() => {
    console.log('Games table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = Game;
