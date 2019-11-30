module.exports = {
  ...require("./Users/resolvers"),
  ...require("./Tasks/resolvers"),
  ...require("./Comments/resolvers"),
  ...require("./Projects/resolvers")
};
