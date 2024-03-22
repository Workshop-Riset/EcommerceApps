'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async searchByName(search){
      try {
        let categories
        if(!search){
          categories = await Category.findAll();
        }else{
          categories = await Category.findAll({
            where: {
              name : {
                [Op.iLike]: `%${search}%`
              } 
            }
          })
        }
        return categories
      } catch (error) {
        throw error
      }
    }
    static associate(models) {
      // define association here
      Category.hasMany(models.Product)
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};