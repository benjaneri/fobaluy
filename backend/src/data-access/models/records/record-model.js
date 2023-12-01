const { DataTypes } = require('sequelize');
const sequelize = require('../../database-config');

const Record = sequelize.define('Record', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxRating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  minRating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  avgRating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  gamesPlayed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Records table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = Record;
