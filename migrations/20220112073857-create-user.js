"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nik: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tempat_lahir: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tanggal_lahir: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      alamat: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      agama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status_perkawinan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pekerjaan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      foto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
