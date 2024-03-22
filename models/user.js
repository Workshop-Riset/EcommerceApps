'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {foreignKey: 'UserId'})
      User.hasMany(models.Order)
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    // isLogin : DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(user) {
        user.password
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};