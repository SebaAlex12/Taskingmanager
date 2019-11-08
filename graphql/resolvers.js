module.exports = {
  ...require("./Albums/resolvers"),
  ...require("./Users/resolvers"),
  ...require("./Tasks/resolvers"),
  ...require("./Projects/resolvers")
};
