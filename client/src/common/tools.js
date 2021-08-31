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
export const compareErrors = (firstErrors,secondErrors) => {
  let counter = null;

      // compare two arrays by the required format
      if(Array.isArray(firstErrors) !== true || Array.isArray(secondErrors) !== true){
          return false;
      }

      if(firstErrors.length !== secondErrors.length){
        return false;
      }else{
        counter = firstErrors.length;
      }

      for(let i = 0; counter > i; i++){
          if(firstErrors[i].path.length !== secondErrors[i].path.length 
            || firstErrors[i].message.length !== secondErrors[i].message.length){
              return false;
          }
      }

  return true;
}
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
