const fs = require("fs");

// imports data from api: http://mega-com.pl/information/index?information=resellerapi to mysql database

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

const { 
  insertProduct, 
  insertCategory, 
  fetchAllProducts,
  customizeProducts, 
  getProductById, 
  getCategoryById 
} = require("../mysql_target");

module.exports = {
  getImports: async function(){

    // fix imported products
    // customizeProducts();

    const imports = {
      "categories":false,
      "products":false
    };

    let categories = [];
    const categoriesRangeBegin = 0;
    const categoriesRangeEnd = 150;

    let products = [];
    const productsRangeBegin = 0;
    const productsRangeEnd = 3000;

    if(imports["categories"]){
      categories = await fetchApiCategories();
      console.log("categories lunching");
    }

    if(imports["products"]){
      products = await fetchApiProducts();
      console.log("products lunching");
    }

    if(categories.length > 0){
      let errors = [];
      let counter = 0;

      for (const item of categories){
        if(counter >= categoriesRangeBegin && counter <= categoriesRangeEnd){

          let dbCategory = await getCategoryById(item["id"]);

              if(dbCategory.length === 0){

                console.log("adding category ...");

                //get category details
                const categoryDetails = await fetchApiCategoriesById(item["id"]);
                if(categoryDetails){

                  const data = {
                    id: categoryDetails["id"],
                    parentId: categoryDetails["1"],
                    name: categoryDetails["name"] 
                  }

                  try{
                        const response = await insertCategory(data);
                        if(response){
                          console.log("category hass been added");
                        }
                    }catch(error){
                        console.log("error",error);
                        errors.push({
                          id: categoryDetails["id"],
                          error: error
                        });
                    }
                }
                console.log("counter",counter);
            }
        }
        counter++;
      }

      // write errors to file
      fs.writeFileSync('imports/api/logs/categories.json', JSON.stringify(errors));
      console.log("categories number",categories.length);
    }
  
    if(products.length > 0){
      let errors = [];
      let counter = 0;

        for (const item of products) {
              if(counter >= productsRangeBegin && counter <= productsRangeEnd){

                let dbProduct = await getProductById(item["id"]);

                if(dbProduct.length === 0){

                          console.log("adding product ...");
            
                          // get product details
                          const productDetails = await fetchApiProductDetailsById(item["id"]);
                          if(productDetails){
                            console.log("product details",productDetails);
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

                            try{
                                const response = await insertProduct(data);
                                if(response){
                                  console.log("product hass been added");
                                }
                            }catch(error){
                                console.log("error",error);
                                errors.push({
                                  id: productDetails["id"],
                                  error: error
                                });
                            }
                          }
                          console.log("counter",counter);
                  }
            }
              counter++;
         }

         // write errors to file
          fs.writeFileSync('imports/api/logs/products.json', JSON.stringify(errors));

          console.log("products number",products.length);
    }
  }
}