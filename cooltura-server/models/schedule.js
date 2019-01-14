module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    days: {
      type: DataTypes.STRING,
    },
    hour: {
      type: DataTypes.INTEGER,
    },
    minute: {
      type: DataTypes.INTEGER,
    },
    delay_to_off: {
      type: DataTypes.INTEGER,
    },
    delay_to_off_unit: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
    }
  })

  return Schedule;
}