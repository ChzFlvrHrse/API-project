'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendee.belongsTo(
        models.User,
        { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true }
      ),
      Attendee.belongsTo(
        models.Event,
        { foreignKey: 'eventId', onDelete: 'CASCADE', hooks: true }
      )
    }
  }
  Attendee.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
