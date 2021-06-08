
const { fetchMysqlProducts, fetchMysqlCategories, fetchMysqlCategoriesParentId } = require("./mysql");

const { 
    insertProduct, 
    insertCategory, 
    fetchAllProducts,
    customizeProducts, 
    getProductById, 
    getCategoryById 
  } = require("../mysql_target");
const { isParenthesizedTypeNode } = require("typescript");

  module.exports = {
        getImports: async function(){

            const imports = {
                "categories":false,
                "products":false
            };

        if(imports["categories"]){
            const result1 = await fetchMysqlCategories();
            if(result1){
                result1.forEach(item = async(item) => {

                    try{
                        let parentId = await fetchMysqlCategoriesParentId(item["category_id"]);

                        if(parentId){
                            parentId = parentId.map(item => ({...item}));

                            let data = {
                                id: item["category_id"],
                                parentId: parentId[0]["category_parent_id"] === 0 ? -1 : parentId[0]["category_parent_id"],
                                name: item["category_name"] 
                            }
        
                            // console.log("data", data);
            
                            try{
                                     let response = await insertCategory(data);
                                     if(response){
                                       console.log("category hass been added");
                                     }
                            }catch(error){
                                    console.log("error",error);
                                    errors.push({
                                      id: item["id"],
                                      error: error
                                    });
                            }
                        }
                    }catch(error){
                        console.log("error",error);
                    }

                });
            }
        }

        if(imports["products"]){
            const result2 = await fetchMysqlProducts();
            if(result2){
                result2.forEach(item = async(item) => {
 
                 let data = {
                     id: item["product_id"],
                     categoryId: 1,
                     name: item["product_name"],
                     description1: item["product_s_desc"],
                     description2: item["product_desc"],
                     price: 0,
                     photo: item["product_full_image"],
                     tags: ""
                   }
 
                   try{
                       let response = await insertProduct(data);
                       if(response){
                           console.log("data",data);
                         console.log("product hass been added");
                       }
                   }catch(error){
                       console.log("error",error);
                       errors.push({
                         id: productDetails["id"],
                         error: error
                       });
                   }
 
                 });
            }
        }
        }
  }