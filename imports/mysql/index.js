
const { fetchMysqlProducts, fetchMysqlCategories, fetchMysqlCategoriesParentId, fetchMysqlProductCategoryId } = require("./mysql");

const { 
    insertProduct, 
    insertCategory, 
    updateProductById,
    fetchAllProducts,
    insertCategoryProductRelation,
    customizeProducts,
    customizeCategories, 
    getProductById, 
    getCategoryById 
  } = require("../mysql_target");

  module.exports = {
        getImports: async function(){

        // change inserted data
        // const custCat = await customizeCategories();
        // const custProd = await customizeProducts();


        const imports = {
                "categories":false,
                "products":false,
                "products-categories-relations":true
        };

        if(imports["products-categories-relations"]){

            try{
                const result3 = await fetchAllProducts();
                if(result3){
                    result3.forEach(async(product) => {
                        let categoriesId = await fetchMysqlProductCategoryId(product.id);
                        categoriesId = categoriesId.map(categoryId => ({...categoryId}));
                        if(categoriesId){
                            try{
                                console.log("categories ids",categoriesId);
                                console.log("product.id_kategorii",product.id_kategorii);
                                console.log("category id",categoriesId[0].category_id);
                                // console.log("product",product);

                                categoriesId.forEach(category = async(category) => {

                                    if(category.category_id == categoriesId[0].category_id){
                                            const newItem = {
                                                ...product,
                                                "id_kategorii":category.category_id
                                            }
                                            // console.log("newItem",newItem);
                                            const result = await updateProductById(product.id,newItem);
                                            if(result){
                                                console.log("product has been updated",result);
                                            }
                                    }else{
                                        const result = await insertCategoryProductRelation(category.category_id, product.id);
                                        if(result){
                                            console.log("category product relation hass been added", result);
                                        }
                                    }
                                })
                            }catch(error){
                                    console.log("error",error);
                                    errors.push({
                                    id: product["id"],
                                    error: error
                                    });
                            }
                        }
                    })
            }
            }catch(error){
                console.log("fetch products error:",error);
            }
        }
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