'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(
        models.User,
        { foreignKey: 'organizerId', onDelete: 'CASCADE', hooks: true }
      ),
      Group.hasMany(
        models.Image,
        { foreignKey: 'imageableId', onDelete: 'CASCADE', hooks: true }
      ),
      Group.hasMany(
        models.Venue,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true }
      ),
      Group.hasMany(
        models.Event,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true }
      ),
      Group.belongsToMany(
        models.User,
        { through: 'Membership' }
      )
    }
  }
  Group.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    organizerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group'
  });
  return Group;
};
