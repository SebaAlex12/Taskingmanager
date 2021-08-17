const mysql = require("mysql");
const mysql_db = require("../../config/out_db_config.js");
const mysql_pool = mysql.createPool(mysql_db);

const { 
    fetchMysqlProducts, 
    fetchMysqlCategories, 
    fetchMysqlProductRelationships 
} = require("./mysql");


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
        console.log("get imports started");
        const imports = {
                "categories":false,
                "products":false,
                "products-categories-relations":true
        };
        if(imports["categories"]){
            const result1 = await fetchMysqlCategories();
            if(result1){
                console.log("categories",result1);
                result1.forEach(item = async(item) => {
                    try{
                            let data = {
                                        id: item["term_id"],
                                        parentId: item["parent"] === 0 ? -1 : item["parent"],
                                        name: item["name"],
                                        filename: item["slug"]
                            }

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
                });
            }
        }
        if(imports["products"]){
            try{
                const result2 = await fetchMysqlProducts();
                if(result2){
                    result2.forEach(item = async(item) => {
    
                     let data = {
                         id: item["ID"],
                         categoryId: 131,
                         name: item["post_title"],
                         description1: item["post_excerpt"],
                         description2: item["post_excerpt"],
                         price: 0,
                         fileName: item["post_name"],
                         photo: item["post_name"] + ".jpg",
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
            }catch(error){
                console.log("error",error);
            }
        }
        if(imports["products-categories-relations"]){

            try{
                const result3 = await fetchAllProducts();
                if(result3){
                    result3.forEach(async(product) => {
                        let termTaxonomyIds = null;

                        termTaxonomyIds = await fetchMysqlProductRelationships(product.id);
                        // termTaxonomyIds = termTaxonomyIds.map(categoryId => ({...categoryId}));
                       
                        if(termTaxonomyIds){
                                // check all categories id by term taxonomy ids in wp_term_taxonomy
                            let termCategoryIds = await Promise.all(
                                    termTaxonomyIds.map(async(row) => {
                                        const sql = `SELECT * FROM wp_term_taxonomy WHERE term_taxonomy_id = ${row.term_taxonomy_id}`;
                                        return new Promise((resolve,reject) => {
                                            mysql_pool.query(sql,(error,elements) => {
                                                if(error) return reject(error);
                                                resolve(elements);
                                            });
                                        })
                                    })
                            );
                                    
                            if(termCategoryIds){
                                termCategoryIds = termCategoryIds.flat(1);
                                // console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
                                // console.log("product id:",product.id);
                                // console.log("termCategoryIds",termCategoryIds);
                                try{
                                        const termCategoriesLoop = async() => {
                                            let firstElementAdded = false; // set first category default if false
                                            for(let index = 0; index < termCategoryIds.length; index++){
                                                console.log(firstElementAdded);
                                                console.log("category id: ",termCategoryIds[index]["term_id"]);
                                                if(termCategoryIds[index]["term_id"] !== 2){
                                                    console.log("first element and boolean:",firstElementAdded);
                                                    if(firstElementAdded === false){
                                                            const newItem = {
                                                                ...product,
                                                                "id_kategorii":termCategoryIds[index]["term_id"] 
                                                            }
                                                            // console.log("product update", newItem);
                                                            const result = await updateProductById(product.id,newItem);
                                                            firstElementAdded = true;
                                                            if(result){
                                                                console.log(result);
                                                            }
                                                    }else{
                                                        const result = await insertCategoryProductRelation(termCategoryIds[index]["term_id"], product.id);
                                                        
                                                        if(result){
                                                            console.log("category product relation hass been added");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        termCategoriesLoop();
                                }catch(error){
                                        console.log("error",error);
                                        errors.push({
                                        id: product["id"],
                                        error: error
                                        });
                                }
                                console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyy");
                            }
                        }
                    })
            }
            }catch(error){
                console.log("fetch products error:",error);
            }
        }
    }
}