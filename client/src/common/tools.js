export const mapReverse = (array, fn) => {
  return array.reduceRight(function (result, el) {
    result.push(fn(el));
    return result;
  }, []);
};
export const sortArray = (array, property, direction) => {
  direction = direction || 1;
  array.sort(function compare(a, b) {
    let comparison = 0;
    if (a[property] > b[property]) {
      comparison = 1 * direction;
    } else if (a[property] < b[property]) {
      comparison = -1 * direction;
    }
    return comparison;
  });
  return array;
};

export const formatErrors = (e) => {
  let err = [];
  let i = 0;

  for (var errName in e.errors) {
    err[i++] = {
      path: e.errors[errName].path,
      message: e.errors[errName].message
    };
  }
  return err;
}
