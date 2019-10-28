module.exports = (sequelize, DataTypes) => {
  const Time = sequelize.define('time', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    since: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {}
  )

  Time.associate = (models) => {
    Time.belongsTo(models.user, { foreignKey: 'userId' })
  }

  return Time
}
