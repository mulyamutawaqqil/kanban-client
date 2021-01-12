'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.Task)
      Organization.hasMany(models.User)
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      unique: {
        msg: "organization is already available"
      }
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};