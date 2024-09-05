'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany( models.Post, {
        foreignKey: 'userId', // Foreign key in Post model
        as: 'posts' // Alias for the association
      });
      User.hasMany( models.Comments, {
        foreignKey: 'userId', // Foreign key in Post model
        as: 'Comment' // Alias for the association
      });
    }
  }
  User.init({
  name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};