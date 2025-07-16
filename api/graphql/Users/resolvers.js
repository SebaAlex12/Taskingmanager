const User = require("../../models/User");

//user authorization
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateUserToken = (userData) => {
        const token = jwt.sign(
          {
            _id: userData._id.toString(),
            name: userData.name,
            email: userData.email,
            status: userData.status,
            company: userData.company ? userData.company : "",
            projects: userData.projects ? userData.projects : "",
            users: userData.users ? userData.users : "",
            lastActive: userData.lastActive ? userData.lastActive : "",
            createdAt: userData.createdAt,
            employer: userData.employer ? userData.employer : false,
            tokenCreatedAt: new Date(),
            logged: true,
          },
          require("../../config/keys").secretOrKeyOk,
          {
            expiresIn: "1h",
          }
        );

        return token;      
};

module.exports = {
  fetchUsers: async function ({ userInput }) {
    // console.log('userInput',userInput);
    // console.log('fetch users api');
    try{
      const users = await User.find(userInput, null, { sort: { name: 1 } });
      return users;
    }catch(error){
      console.log('users error',error);
    }
  },
  fetchUsersByLoggedUserProjects: async function ({ projects }) {
    const list = projects.split(",");
    const pregmatch = list.map((item) => new RegExp(item));
    const users = await User.find().or([
      {
        projects: {
          $in: pregmatch,
        },
      },
    ]);
    return users;
  },
  createUser: async function ({ userInput }, res) {
    // if (!userInput.name || !userInput.email || !userInput.password) {
    //   const err = new Error("You left input fields epmty");
    //   throw err;
    // }

    const mailExists = await User.findOne({ email: userInput.email });

    if (mailExists) {
      console.log("Istnieje już email o podanej nazwie");
      throw {
        errors: [
          { path: "name", message: "Istnieje już email o podanej nazwie" },
        ],
      };
    }

    const userNameExists = await User.findOne({ name: userInput.name });

    if (userNameExists) {
      console.log("Istnieje już użytkownik o podanej nazwie");
      throw {
        errors: [
          { path: "name", message: "Istnieje już użytkownik o podanej nazwie" },
        ],
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
      lastActive: userInput.lastActive,
      createdAt: userInput.createdAt,
    });

    try {
      const storedUser = await user.save();
      return { ...storedUser._doc, _id: storedUser._id.toString() };
    } catch (error) {
      console.log('error',error.toString);
      res.status(500).json({message:error});
    }
  },
  loginUser: async function ({ email, password }) {
    if (!email || !password) {
        console.log("Email lub hasło nie zostało wprowadzone");
        throw {
          errors: [
            { path: "Logowanie użytkownika", message: "Email lub hasło nie zostało wprowadzone" },
          ],
        };
    }

    const userData = await User.findOne({ email: email });

    if (!userData) {
      console.log("Użytkownik o podanym adresie email nie istnieje");
        throw {
          errors: [
            { path: "Logowanie użytkownika", message: "Użytkownik o podanym adresie email nie istnieje" },
          ],
      };
    }

    const pass = await bcrypt.compare(password, userData.password);

    if (!pass) {
      console.log("Użytkownik o podanym adresie email nie istnieje");
        throw {
          errors: [
            { path: "Logowanie użytkownika", message: "Podałeś niepoprawne hasło" },
          ],   
        };
    }
    try{
      if(userData){
          const token = generateUserToken(userData);
          return { ...userData._doc, _id: userData._id.toString(), token: token };
      }
    }catch(error){
        return { errors: tools.formatErrors(e) };
    }

    // const token = await jwt.sign(
    //   {
    //     _id: userData._id.toString(),
    //     name: userData.name,
    //     email: userData.email,
    //     status: userData.status,
    //     company: userData.company ? userData.company : "",
    //     projects: userData.projects ? userData.projects : "",
    //     users: userData.users ? userData.users : "",
    //     lastActive: userData.lastActive ? userData.lastActive : "",
    //     createdAt: userData.createdAt,
    //     tokenCreatedAt: new Date(),
    //     logged: true,
    //   },
    //   require("../../config/keys").secretOrKeyOk,
    //   {
    //     expiresIn: "1h",
    //   }
    // );
  },
  updateUser: async function ({ userInput }, req) {

    if (!userInput.name || !userInput.email) {
        console.log("Pozostawiłeś nazwę lub email pusty");
        throw {
          errors: [
            { path: "Aktualizacja danych użytkownika", message: "Pozostawiłeś nazwę lub email pusty" },
          ],   
        };
    }
    const _id = userInput._id;
    const user = await User.findOne({ _id });
    const data = {
      name: userInput.name,
      email: userInput.email,
      password: user.password,
      status: userInput.status,
      company: userInput.company ? userInput.company : "Blumoseo",
      projects: userInput.projects ? userInput.projects : "",
      users: userInput.users ? userInput.users : "",
      lastActive: userInput.lastActive ? userInput.lastActive : "",
    };
    if (userInput.password.length > 0) {
      const salt = bcrypt.genSaltSync(14);
      const hash = bcrypt.hashSync(userInput.password, salt);
      data.password = hash;
    }

    try {
      user.overwrite(data);
      const storedUser = await user.save();
      let token = null;
      if(userInput.generateToken === 'true'){
          token = generateUserToken(storedUser);
      }

      return { ...storedUser._doc, _id: storedUser._id.toString(), generateToken: token };
    } catch (e) {
      return {
        errors: [
          {
            path: "Aktualizacja danych użytkownika",
            message: e,
          },
        ],
      };
    }
  },
};
