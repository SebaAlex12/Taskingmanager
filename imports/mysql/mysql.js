const mysql = require("mysql");

const mysql_db = require("../../config/out_db_config.js");
const mysql_pool = mysql.createPool(mysql_db);

const fetchMysqlProducts = async() => {
    // const sql = "SELECT * FROM jos_vm_product LEFT JOIN jos_vm_product_category_xref ON jos_vm_product.product_id = jos_vm_product_category_xref.product_id LIMIT 2";
    const sql = "SELECT * FROM jos_vm_product";
    return new Promise((resolve,reject) => {
        mysql_pool.query(sql,(error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const fetchMysqlCategories = async() => {
    // const sql = "SELECT * FROM jos_vm_category LEFT JOIN jos_vm_category_xref ON jos_vm_category.category_id = jos_vm_category_xref.category_parent_id";
    const sql = "SELECT * FROM jos_vm_category";
    return new Promise((resolve,reject) => {
        mysql_pool.query(sql,(error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        })
    }) 
}

const fetchMysqlCategoriesParentId = async(id) => {
    const sql = `SELECT category_parent_id FROM jos_vm_category_xref WHERE category_child_id = ${id}`;
    return new Promise((resolve,reject) => {
        mysql_pool.query(sql,(error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        })
    }) 
}

module.exports = {
    fetchMysqlProducts,
    fetchMysqlCategories,
    fetchMysqlCategoriesParentId
}