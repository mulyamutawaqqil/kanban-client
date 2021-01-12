'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
      Task.belongsTo(models.Organization)
    }
  };
  Task.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
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
    sequelize,
    modelName: 'Task',
  });
  return Task;
};