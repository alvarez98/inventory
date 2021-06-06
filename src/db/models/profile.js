'use strict'

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    gender: DataTypes.ENUM('FEMALE', 'MALE'),
    dni: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    birthday: DataTypes.DATE,
    address: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  })
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    })
  }
  Profile.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }
  return Profile
}
