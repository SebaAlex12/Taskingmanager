module.exports = {
  ...require("./Users/resolvers"),
  ...require("./UsersHistory/resolvers"),
  ...require("./Payments/resolvers"),
  ...require("./Companies/resolvers"),
  ...require("./Contractors/resolvers"),
  ...require("./Settings/resolvers"),
  ...require("./Tasks/resolvers"),
  ...require("./Comments/resolvers"),
  ...require("./Mails/resolvers"),
  ...require("./Messengers/resolvers"),
  ...require("./Projects/resolvers"),
};
