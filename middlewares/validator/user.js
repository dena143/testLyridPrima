const path = require("path");
const crypto = require("crypto");
const validator = require("validator");
const { promisify } = require("util");
const cloudinary = require("cloudinary").v2;

const { user } = require("../../models");
const { encodePin } = require("../../utils/bcrypt");

cloudinary.config({
  cloud_name: "drta3xh4e",
  api_key: process.env.SECRET_KEY_CLOUDINARY,
  api_secret: process.env.SECRET_API_CLOUDINARY,
});

exports.createUserValidators = async (req, res, next) => {
  try {
    const errors = [];

    if (validator.isEmpty(req.body.nik, { ignore_whitespace: true })) {
      errors.push("Please input the Name!");
    }

    if (validator.isEmpty(req.body.user_name, { ignore_whitespace: true })) {
      errors.push("Please input the user name!");
    }

    const findUser = await user.findOne({
      where: { user_name: req.body.user_name },
    });

    if (findUser) {
      errors.push("Username is not available!");
    }

    if (
      !validator.isStrongPassword(req.body.password, [
        {
          minLength: 10,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          maxLength: 20,
        },
      ])
    ) {
      errors.push(
        "password must include lowercase: min 1, uppercase: min 1, numbers: min 1, symbol: min 1, and length: min 10 characters & max 20 characters."
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      errors.push("password and confirm password didn't match!");
    }

    if (validator.isEmpty(req.body.nama, { ignore_whitespace: true })) {
      errors.push("Please input the Name!");
    }

    if (validator.isEmpty(req.body.tempat_lahir, { ignore_whitespace: true })) {
      errors.push("Please input the Your birthday place!");
    }

    if (!validator.isDate(req.body.tanggal_lahir)) {
      errors.push("Please input date correctly!");
    }

    if (validator.isEmpty(req.body.alamat, { ignore_whitespace: true })) {
      errors.push("Please input the address!");
    }

    if (validator.isEmpty(req.body.agama, { ignore_whitespace: true })) {
      errors.push("Please input your religion!");
    }

    if (
      validator.isEmpty(req.body.status_perkawinan, { ignore_whitespace: true })
    ) {
      errors.push("Please input status perkawinan!");
    }

    if (validator.isEmpty(req.body.pekerjaan, { ignore_whitespace: true })) {
      errors.push("Please input your jobs!");
    }

    if (req.files) {
      const file = req.files.foto;

      if (!file.mimetype.startsWith("image")) {
        errors.push("File must be an image");
      }

      if (file.size > 1000000) {
        errors.push("Image must be less than 1MB");
      }

      let fileName = crypto.randomBytes(16).toString("hex");

      file.name = `${fileName}${path.parse(file.name).ext}`;

      const move = promisify(file.mv);

      await move(`./public/images/users/${file.name}`);

      const foto = await cloudinary.uploader
        .upload(`./public/images/users/${file.name}`)
        .then((result) => {
          return result.secure_url;
        });

      req.body.foto = foto;
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.upadateUserValidator = async (req, res, next) => {
  try {
    const errors = [];
    if (req.body.user_name) {
      if (validator.isEmpty(req.body.user_name, { ignore_whitespace: true })) {
        errors.push("Please input the user name!");
      }

      const findUser = await user.findOne({
        where: { user_name: req.body.user_name },
      });

      if (findUser) {
        errors.push("Username is not available!");
      }
    }

    if (req.body.password) {
      if (
        !validator.isStrongPassword(req.body.password, [
          {
            minLength: 10,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            maxLength: 20,
          },
        ])
      ) {
        errors.push(
          "password must include lowercase: min 1, uppercase: min 1, numbers: min 1, symbol: min 1, and length: min 10 characters & max 20 characters."
        );
      }

      if (req.body.password !== req.body.confirmPassword) {
        errors.push("password and confirm password didn't match!");
      }

      req.body.password = encodePin(req.body.password);
    }

    if (req.body.nama) {
      if (validator.isEmpty(req.body.nama, { ignore_whitespace: true })) {
        errors.push("Please input the Name!");
      }
    }

    if (req.body.tempat_lahir) {
      if (
        validator.isEmpty(req.body.tempat_lahir, { ignore_whitespace: true })
      ) {
        errors.push("Please input the Your birthday place!");
      }
    }

    if (req.body.tanggal_lahir) {
      if (!validator.isDate(req.body.tanggal_lahir)) {
        errors.push("Please input date correctly!");
      }
    }

    if (req.body.alamat) {
      if (validator.isEmpty(req.body.alamat, { ignore_whitespace: true })) {
        errors.push("Please input the address!");
      }
    }

    if (req.body.agama) {
      if (validator.isEmpty(req.body.agama, { ignore_whitespace: true })) {
        errors.push("Please input your religion!");
      }
    }
    if (req.body.status_perkawinan) {
      if (
        validator.isEmpty(req.body.status_perkawinan, {
          ignore_whitespace: true,
        })
      ) {
        errors.push("Please input status perkawinan!");
      }
    }

    if (req.body.pekerjaan) {
      if (validator.isEmpty(req.body.pekerjaan, { ignore_whitespace: true })) {
        errors.push("Please input your jobs!");
      }
    }

    if (req.files) {
      const file = req.files.foto;

      if (!file.mimetype.startsWith("image")) {
        errors.push("File must be an image");
      }

      if (file.size > 1000000) {
        errors.push("Image must be less than 1MB");
      }

      let fileName = crypto.randomBytes(16).toString("hex");

      file.name = `${fileName}${path.parse(file.name).ext}`;

      const move = promisify(file.mv);

      await move(`./public/images/users/${file.name}`);

      const foto = await cloudinary.uploader
        .upload(`./public/images/users/${file.name}`)
        .then((result) => {
          return result.secure_url;
        });

      req.body.foto = foto;
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    next();
  } catch (error) {
    next(error);
  }
};
