'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    formattedPrice() {
      return this.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      });
    }
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.Order, { through: models.OrderDetail });
      Product.hasMany(models.OrderDetail)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name is required'
        },
        notNull: {
          msg: {
            name: 'name is required'
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description is required'
        },
        notNull: {
          msg: 'description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'price is required'
        },
        min: {
          args: 1,
          msg: 'Minimum price value is 1'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'stock is required'
        },
        min: {
          args: 1,
          msg: 'min input number 1'
        }
      }
    },
    imgSrc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image source is required'
        },
        notNull: {
          msg: 'Image source is required'
        },
        len: {
          args: [1, 150],
          msg: 'Image source must be between 1 and 150 characters'
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};