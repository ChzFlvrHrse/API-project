'use strict';

const { Validator } = require('sequelize')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(
        models.Image,
        { foreignKey: 'imageableId', onDelete: 'CASCADE', hooks: true }
      ),
      Event.belongsTo(
        models.Group,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true }
      ),
      Event.belongsTo(
        models.Venue,
        { foreignKey: 'venueId', onDelete: 'CASCADE', hooks: true }
      ),
      Event.hasMany(
        models.Attendance,
        { foreignKey: 'eventId' }
      )
    }
  }
  Event.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    venueId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Venues',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 500]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validData(value) {
          if (value !== "Online" && value !== "In person") {
            throw new Error("Type must be Online or In person")
          }
        }
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {

      // }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numAttending: {
      type : DataTypes.INTEGER
    },
    previewImage: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
