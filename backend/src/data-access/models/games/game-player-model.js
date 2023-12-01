const { DataTypes } = require('sequelize');
const sequelize = require('../../database-config');

const User = require('../users/user-model');
const Game = require('./game-model');

const GamePlayer = sequelize.define('GamePlayer', {
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Game.belongsToMany(User, { through: GamePlayer, foreignKey: 'gameId', as: 'players' });
GamePlayer.belongsTo(Game, { foreignKey: 'gameId' });
User.belongsToMany(Game, { through: GamePlayer, foreignKey: 'playerId', as: 'games' });

sequelize
  .sync()
  .then(() => {
    console.log('GamePlayer table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = GamePlayer;
