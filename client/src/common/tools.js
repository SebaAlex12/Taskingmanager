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

  console.log("firstErr",firstErrors);
  console.log("secondErr",secondErrors);

      // compare two arrays by the required format
      if(Array.isArray(firstErrors) !== true || Array.isArray(secondErrors) !== true){
        console.log("one is not array");
          return false;
      }

      // if(firstErrors.length == 0 && secondErrors.length == 0){
      //   return false;
      // }

      if(firstErrors.length !== secondErrors.length){
        console.log("first err not length the same");
        return false;
      }else{
        counter = firstErrors.length;
        
      }
      console.log("length are the same",counter);
      for(let i = 0; counter > i; i++){
        console.log("firstErrors[i].path.length",firstErrors[i].path.length);
        console.log("secondErrors[i].path.length",secondErrors[i].path);

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
