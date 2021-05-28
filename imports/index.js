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

const { insertProduct, insertCategory } = require("./mysql");

module.exports = {
  getImports: async function(){
    const products = await fetchApiProducts();
    const categories = await fetchApiCategories();
    const productsRangeBegin = 25;
    const productsRangeEnd = 2680;
    const categoriesRangeBegin = 0;
    const categoriesRangeEnd = 0;

    if(categories){
      // console.log("categories",categories);
      
      let counter = 0;
      for (const item of categories){
        if(counter >= categoriesRangeBegin && counter <= categoriesRangeEnd){
          // console.log("category basic", item);

          //get category details
          const categoryDetails = await fetchApiCategoriesById(item["id"]);
          if(categoryDetails){

            const data = {
              id: categoryDetails["id"],
              parentId: categoryDetails["1"],
              name: categoryDetails["name"] 
            }
            // const response = await insertCategory(data);
          }
          console.log("counter",counter);
        }
        counter++;
      }
      console.log("categories number",categories.length);
    }
  
    if(products){
      
      let counter = 0;
        for (const item of products) {
              if(counter >= productsRangeBegin && counter <= productsRangeEnd){
                // console.log("product basic", item);
  
                // get product details
                const productDetails = await fetchApiProductDetailsById(item["id"]);
                if(productDetails){
                  // console.log("product details",productDetails);
                }              
  
                // get product characteristic data
                 const productCharacteristic = await fetchApiProductCharacteristicById(item["id"]);
                if(productCharacteristic){
                  // console.log("product characteristic",productCharacteristic);
                }
  
                // get product prices data
                const productPrices = await fetchApiProductPricesById(item["id"]);
                if(productPrices){
                  // console.log("product prices",productPrices);
                }
  
                //get product categories data
                const productCategories = await fetchApiProductCategoriesById(item["id"]);
                if(productCategories){
                  // console.log("product categories",productCategories);
                }
  
                //get product photos data
                const productPhotos = await fetchApiProductPhotosById(item["id"]);
                if(productPhotos){
                  // console.log("product photos",productPhotos);
                }


                if(productDetails && productCharacteristic && productPrices && productCategories && productPhotos){
                  
                  const printers = productCharacteristic.filter(element => element.name == "Drukarki" && element)
                  .map((element) => element.value)
                  .join(", ");

                  const descriptions = productCharacteristic.filter((element) => {
                      if(element.name == "Opis krótki" || element.name == "Opis długi"){
                        return element;
                      }
                  });
                  
                  const data = {
                    id: productDetails["id"],
                    categoryId: productCategories[0]["id"],
                    name: productDetails["name"],
                    description1: descriptions[0] ? descriptions[0]["value"] : "",
                    description2: descriptions[1] ? descriptions[1]["value"] : "",
                    price: productPrices["brutto"],
                    photo: productPhotos[0] ? productPhotos[0]["file"] : "",
                    tags: printers
                  }
                  // console.log("data",data);
                  const response = await insertProduct(data);
                }
  
                console.log("counter",counter);
              }
              counter++;
         }
         console.log("products number",products.length);
    }
  }
}