module.exports = {
  ...require("./Users/resolvers"),
  ...require("./Tasks/resolvers"),
  ...require("./Comments/resolvers"),
  ...require("./Mails/resolvers"),
  ...require("./Messengers/resolvers"),
  ...require("./Projects/resolvers")
};
