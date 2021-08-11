const mysql = require("mysql");
const mysql_db = require("../../config/out_db_config.js");
const mysql_pool = mysql.createPool(mysql_db);

const fetchMysqlCategories = async() => {
    const sql = "SELECT * FROM wp_terms LEFT JOIN wp_term_taxonomy ON wp_terms.term_id = wp_term_taxonomy.term_id WHERE wp_term_taxonomy.taxonomy = 'product_cat'";
    return new Promise((resolve,reject) => {
        mysql_pool.query(sql,(error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        })
    }) 
}

const fetchMysqlProducts = async() => {
    const sql = "SELECT * FROM wp_posts WHERE post_type = 'product'";
    return new Promise((resolve,reject) => {
        mysql_pool.query(sql,(error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        })
    })     
}

const fetchMysqlProductRelationships = async(productId) => {
    const sql = `SELECT term_taxonomy_id FROM wp_term_relationships WHERE object_id = ${productId}`;
    return new Promise((resolve,reject) => {
        mysql_pool.query(sql,(error, elements) => {
            if(error){
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

// const fetchMysqlProductCategoryId = async(productId) => {
//     const sql = `SELECT term_taxonomy_id FROM wp_term_relationships WHERE object_id = ${productId}`;

//     return await new Promise((resolve,reject) => {
//         try{
//             mysql_connect.query(sql, async(err, result) => {
//                 if(err) throw err;
    
//                 const rows = result.map(item => ({...item}));

//                 const subQueryPromise = async(row) => {
//                     return new Promise((subQueryResolve, subQueryReject) => {
//                         const sql2 = `SELECT * FROM wp_term_taxonomy WHERE term_taxonomy_id = ${row.term_taxonomy_id} AND taxonomy = "product_cat"`;
//                         try{
//                             mysql_connect.query(sql2, function(err, result2){
//                                 if(err) subQueryReject(err);
//                                 subQueryResolve(result2);
//                             });
//                             return subQueryResolve(row);
//                         }catch(errors){
//                             console.log("errors",errors);
//                         }    
//                     });
//                 }

//                 const func = async(row) => {
//                         console.log("rowwww",row);
//                         let el = row;
//                         return new Promise((resolve,reject) => {
//                             try{
//                                     return setTimeout(() => { 
//                                         return resolve(el);
//                                     },3000);
//                                 }catch(errors){
//                                         return reject("errors",errors);
//                                 }
//                         });
//                 }
    
//                 asyncLoop = async(rows) => {
//                         const catIds = await rows.map(async row => {
//                             // return new Promise(async(resolve,reject) => {
//                             //     try{
//                                     let ids = await func(row);
//                                     console.log("asyncLoop");
//                                     // let response = await subQueryPromise(row);
//                                     // console.log("response count",response.length);
//                                     if(ids){
//                                             console.log("ids cccyy",ids);
//                                             // return resolve(row);
//                                             return ids;
//                                             // return resolve("miki mouse");
//                                     }
//                                 // }catch(errors){
//                                 //     console.log("errors",errors);
//                                 // }
//                             // });
//                         })

//                         return catIds;
//                 }

//                 try{
//                     const ids = await asyncLoop(rows);
//                     if(ids){
//                         console.log("resolve",ids);
//                         resolve(ids);
//                     }
//                 }catch(errors){
//                     console.log("errors",errors);
//                 }

//             })
//         }catch(errors){
//             console.log("errors",errors);
//         };
//     });
// }

module.exports = {
    fetchMysqlProducts,
    fetchMysqlCategories,
    fetchMysqlProductRelationships
}