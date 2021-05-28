const { 
  fetchApiCategories,
  fetchApiProducts, 
  fetchApiProductDetailsById,
  fetchApiProductCharacteristicById,
  fetchApiProductPricesById, 
  fetchApiProductCategoriesById,
  fetchApiProductPhotosById,
  fetchApiCategoriesById
} = require("./api");

const { insertProduct } = require("./mysql");

module.exports = {
  getImports: async function(){
    const products = await fetchApiProducts();
    const categories = await fetchApiCategories();
    const productsRangeBegin = 10;
    const productsRangeEnd = 11;
    const categoriesRangeBegin = 10;
    const categoriesRangeEnd = 11;

    if(categories){
      // console.log("categories",categories);
      let counter = 0;
      for (const item of categories){
        if(counter >= categoriesRangeBegin && counter <= categoriesRangeEnd){
          // console.log("category basic", item);

          //get category details
          const categoryDetails = await fetchApiCategoriesById(item["id"]);
          if(categoryDetails){
            console.log("category details",categoryDetails);
          }
          console.log("counter",counter);
        }
        counter++;
      }
    }
  
    if(products){
      let counter = 0;
        for (const item of products) {
              if(counter >= productsRangeBegin && counter <= productsRangeEnd){
                // console.log("product basic", item);
  
                // get product details
                const productDetails = await fetchApiProductDetailsById(item["id"]);
                if(productDetails){
                  console.log("product details",productDetails);
                }              
  
                // get product characteristic data
                 const productCharacteristic = await fetchApiProductCharacteristicById(item["id"]);
                if(productCharacteristic){
                  console.log("product characteristic",productCharacteristic);
                }
  
                // get product prices data
                const productPrices = await fetchApiProductPricesById(item["id"]);
                if(productPrices){
                  console.log("product prices",productPrices);
                }
  
                //get product categories data
                const productCategories = await fetchApiProductCategoriesById(item["id"]);
                if(productCategories){
                  console.log("product categories",productCategories);
                }
  
                //get product photos data
                const productPhotos = await fetchApiProductPhotosById(item["id"]);
                if(productPhotos){
                  console.log("product photos",productPhotos);
                }


  
                console.log("counter",counter);
              }
              counter++;
         }
    }
  }
}