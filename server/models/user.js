'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
      User.belongsTo(models.Organization)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "email is required"
        },
        isEmail: {
          msg: "email is invalid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "password is required"
        }
      }
    },
    OrganizationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Organization",
        key: "id"
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, option) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};