module.exports = {
  formatErrors: function(e) {
    let err = [];
    let i = 0;

    for (var errName in e.errors) {
      err[i++] = {
        path: e.errors[errName].path,
        message: e.errors[errName].message
      };
    }
    return err;
    // if (e instanceof Task.sequelize.ValidationError) {
    //   return e.errors.map(x => {
    //     _.pick(x, ["path", "message"]);
    //   });
    // }
    // return [{ path: "name", message: "something went wrong" }];
  }
};
