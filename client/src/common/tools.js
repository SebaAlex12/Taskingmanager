export const mapReverse = (array, fn) => {
  return array.reduceRight(function(result, el) {
    result.push(fn(el));
    return result;
  }, []);
};
