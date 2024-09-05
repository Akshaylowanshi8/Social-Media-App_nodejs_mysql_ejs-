'use strict';
const {
  Model
} = require('sequelize');;
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Post.hasMany( models.Comments, {
        foreignKey: 'postId', // Foreign key in Post model
        as: 'Comment' // Alias for the association
      });
    }
  }
  Post.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    data: DataTypes.STRING,
    Description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};