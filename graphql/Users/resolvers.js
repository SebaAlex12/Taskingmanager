const User = require("../../models/User");

//user authorization
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  fetchUsers: async function() {
    const users = await User.find();
    return users;
  },
  createUser: async function({ userInput }, req) {
    if (!userInput.name || !userInput.email || !userInput.password) {
      const err = new Error("You left input fields epmty");
      throw err;
    }

    const userExists = await User.findOne({ email: userInput.email });

    if (userExists) {
      const err = new Error("User email already exists");
      throw err;
    }

    const userNameExists = await User.findOne({ name: userInput.name });

    if (userNameExists) {
      const err = new Error("User name already exists");
      throw err;
    }

    const salt = bcrypt.genSaltSync(14);
    const hash = bcrypt.hashSync(userInput.password, salt);

    const user = new User({
      name: userInput.name,
      email: userInput.email,
      password: hash,
      status: userInput.status,
      projects: userInput.projects,
      users: userInput.users,
      createdAt: userInput.createdAt
    });
    // console.log("user", userInput);
    const storedUser = await user.save();

    return { ...storedUser._doc, _id: storedUser._id.toString() };
  },
  loginUser: async function({ email, password }) {
    if (!email || !password) {
      const err = new Error("You left input fields epmty");
      throw err;
    }

    const userData = await User.findOne({ email: email });

    if (!userData) {
      const err = new Error("User does not exists");
      throw err;
    }

    const pass = await bcrypt.compare(password, userData.password);

    if (!pass) {
      const err = new Error("Password incorrect");
      throw err;
    }
    // console.log("resolverlogin", userData);
    const token = await jwt.sign(
      {
        _id: userData._id.toString(),
        name: userData.name,
        email: userData.email,
        status: userData.status,
        projects: userData.projects ? userData.projects : "",
        users: userData.users ? userData.users : "",
        createdAt: userData.createdAt,
        tokenCreatedAt: new Date(),
        logged: true
      },
      require("../../config/keys").secretOrKeyOk,
      {
        expiresIn: "1h"
      }
    );

    // console.log("user doc", userData._doc);

    return { ...userData._doc, _id: userData._id.toString(), token: token };
  },
  updateUser: async function({ userInput }, req) {
    // console.log("user input", userInput);
    if (!userInput.name || !userInput.email) {
      const err = new Error("You left input fields epmty");
      throw err;
    }
    const _id = userInput._id;
    const user = await User.findOne({ _id });

    const data = {
      name: userInput.name,
      email: userInput.email,
      password: user.password,
      status: userInput.status,
      projects: userInput.projects ? userInput.projects : "",
      users: userInput.users ? userInput.users : ""
    };
    // console.log("pass", userInput.password.length);
    if (userInput.password.length > 0) {
      const salt = bcrypt.genSaltSync(14);
      const hash = bcrypt.hashSync(userInput.password, salt);
      data.password = hash;
    }

    // console.log("data push", data);
    user.overwrite(data);
    const storedUser = await user.save();

    return { ...storedUser._doc, _id: storedUser._id.toString() };
  }
};
