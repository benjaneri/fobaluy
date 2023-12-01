const { DataTypes } = require('sequelize');
const sequelize = require('../../database-config');

const Profile = require('../profiles/profile-model');
const Rating = require('../ratings/rating-model');
const Record = require('../records/record-model');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'player',
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Record, { foreignKey: 'userId', as: 'record'}, { onDelete: 'cascade' });
Record.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' }, { onDelete: 'cascade' });
Profile.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Rating, { foreignKey: 'playerQualified', as: 'ratings' });
Rating.belongsTo(User, { foreignKey: 'playerQualified', as: 'qualified' });

User.hasMany(Rating, { foreignKey: 'playerQualifier', as: 'ratingsGiven' });
Rating.belongsTo(User, { foreignKey: 'playerQualifier', as: 'qualifier' });

sequelize
  .sync()
  .then(() => {
    console.log('Users table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = User;
