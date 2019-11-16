module.exports = {
  ...require("./Albums/resolvers"),
  ...require("./Users/resolvers"),
  ...require("./Tasks/resolvers"),
  ...require("./Comments/resolvers"),
  ...require("./Projects/resolvers")
};
