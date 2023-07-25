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
  },
  stringToBoolean: function(val) {
    var a = {
      true: true,
      false: false
    };
    return a[val];
  },
  isEmpty: function(value) {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    ) {
      return false;
    } else {
      return true;
    }
  }
};
