const { DataTypes } = require('sequelize');
const sequelize = require('../../database-config');

const Rating = sequelize.define('Rating', {
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  playerQualified: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  playerQualifier: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  played: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Ratings table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = Rating;
