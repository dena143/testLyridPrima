"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      nik: DataTypes.BIGINT,
      nama: DataTypes.STRING,
      user_name: DataTypes.STRING,
      password: DataTypes.STRING,
      tempat_lahir: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATEONLY,
      alamat: DataTypes.STRING,
      agama: DataTypes.STRING,
      status_perkawinan: DataTypes.STRING,
      pekerjaan: DataTypes.STRING,
      foto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      paranoid: true,
      timestamps: true,
    }
  );
  return user;
};
