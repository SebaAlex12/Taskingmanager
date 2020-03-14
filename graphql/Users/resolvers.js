const User = require("../../models/User");

//user authorization
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  fetchUsers: async function({ userInput }) {
    const users = await User.find(userInput, null, { sort: { name: 1 } });
    return users;
  },
  fetchUsersByLoggedUserProjects: async function({ projects }) {
    const list = projects.split(",");
    const pregmatch = list.map(item => new RegExp(item));
    const users = await User.find().or([
      {
        projects: {
          $in: pregmatch
        }
      }
    ]);
    return users;
  },
  createUser: async function({ userInput }, req) {
    // if (!userInput.name || !userInput.email || !userInput.password) {
    //   const err = new Error("You left input fields epmty");
    //   throw err;
    // }

    const mailExists = await User.findOne({ email: userInput.email });

    if (mailExists) {
      return {
        errors: [
          {
            path: "Dodawanie użytkownika",
            message: "Istnieje już email o podanej nazwie"
          }
        ]
      };
    }

    const userNameExists = await User.findOne({ name: userInput.name });

    if (userNameExists) {
      return {
        errors: [
          {
            path: "Dodawanie użytkownika",
            message: "Istnieje już użytkownik o podanej nazwie"
          }
        ]
      };
    }

    const salt = bcrypt.genSaltSync(14);
    const hash = bcrypt.hashSync(userInput.password, salt);

    const user = new User({
      name: userInput.name,
      email: userInput.email,
      password: hash,
      status: userInput.status,
      company: userInput.company,
      projects: userInput.projects,
      users: userInput.users,
      createdAt: userInput.createdAt
    });
    // console.log("user", userInput);

    try {
      const storedUser = await user.save();
      return { ...storedUser._doc, _id: storedUser._id.toString() };
    } catch (e) {
      return {
        errors: [
          {
            path: "dodawanie użytkownika",
            message: e
          }
        ]
      };
    }
  },
  loginUser: async function({ email, password }) {
    if (!email || !password) {
      return {
        errors: [
          {
            path: "Logowanie użytkownika",
            message: "Email lub hasło nie zostało wprowadzone"
          }
        ]
      };
    }

    const userData = await User.findOne({ email: email });

    if (!userData) {
      return {
        errors: [
          {
            path: "Logowanie użytkownika",
            message: "Użytkownik nie istnieje"
          }
        ]
      };
    }

    const pass = await bcrypt.compare(password, userData.password);

    if (!pass) {
      return {
        errors: [
          {
            path: "Logowanie użytkownika",
            message: "Podałeś niepoprawne hasło"
          }
        ]
      };
    }
    // console.log("resolverlogin", userData);
    const token = await jwt.sign(
      {
        _id: userData._id.toString(),
        name: userData.name,
        email: userData.email,
        status: userData.status,
        company: userData.company ? userData.company : "",
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
      return {
        errors: [
          {
            path: "Aktualizacja danych użytkownika",
            message: "Pozostawiłeś nazwę lub email pusty"
          }
        ]
      };
    }
    const _id = userInput._id;
    const user = await User.findOne({ _id });

    const data = {
      name: userInput.name,
      email: userInput.email,
      password: user.password,
      status: userInput.status,
      company: userInput.company ? userInput.company : "",
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

    try {
      user.overwrite(data);
      const storedUser = await user.save();
      return { ...storedUser._doc, _id: storedUser._id.toString() };
    } catch (e) {
      return {
        errors: [
          {
            path: "Aktualizacja danych użytkownika",
            message: e
          }
        ]
      };
    }
  }
};
