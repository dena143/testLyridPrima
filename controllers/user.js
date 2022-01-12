// Test User API
const { user } = require("../models");
const { encodePin, compare } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

class Users {
  static async signUp(req, res, next) {
    try {
      const {
        nik,
        user_name,
        password,
        nama,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        agama,
        status_perkawinan,
        pekerjaan,
        foto,
      } = req.body;

      const hashPwd = encodePin(password);

      const createUser = await user.create({
        nik,
        user_name,
        password: hashPwd,
        nama,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        agama,
        status_perkawinan,
        pekerjaan,
        foto,
      });

      const dataUser = await user.findOne({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
        where: { id: createUser.id },
      });

      const payload = { data: dataUser.dataValues };
      const token = generateToken(payload);

      return res.status(201).json({
        status: 201,
        token,
        dataUser,
        message: ["Your account has been created"],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserDetail(req, res, next) {
    try {
      const id = req.loginUser.data.id;
      const userData = await user.findOne({
        attributes: {
          exclude: ["password"],
        },
        where: {
          id,
        },
      });

      res.status(200).json({
        status: 200,
        data: userData,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async signIn(req, res, next) {
    try {
      const user_name = req.body.user_name;
      const password = req.body.password;
      const dataUser = await user.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        where: {
          user_name,
        },
      });

      if (!dataUser) {
        return res.status(401).json({
          status: 401,
          message: "Please signup first!",
        });
      }

      const hashPass = dataUser.password;
      const compareResult = compare(password, hashPass);

      if (dataUser.user_name && !compareResult) {
        return res.status(400).json({
          status: 400,
          message: "Please input username / password correctly!",
        });
      }

      delete dataUser.dataValues.password;

      const payload = { data: dataUser.dataValues };
      const token = generateToken(payload);
      return res.status(200).json({
        status: 200,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileUser(req, res, next) {
    try {
      await user.update(req.body, { where: { id: req.loginUser.data.id } });

      const data = await user.findOne({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
        where: { id: req.loginUser.data.id },
      });
      return res.status(201).json({
        status: 201,
        data,
        message: ["Your profil has been updated!"],
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await user.destroy({ where: { id: req.loginUser.data.id } });

      return res.status(200).json({
        status: 200,
        message: ["Your account has been deleted!"],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Users;
