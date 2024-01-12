// import important parts of sequelize library
const { Model, DataTypes, INTEGER } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: [10, 2], //Specifies that the value should be a decimal with up to 10 digits in total, and 2 digits after the decimal point
          msg: 'Price must be a valid decimal value'
        },
      },
      stock:{
        type: INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
          isNumeric: {
            msg: 'Stock must be a numeric value',
          },
        },
  
      },
      category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        refences:{
          model: 'category',
          key: 'id'
        }
      }
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);
module.exports = Product;
