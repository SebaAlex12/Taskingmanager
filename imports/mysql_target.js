const mysql = require("mysql");

// incomming data to database
const mysql_db = require("../config/db_config.js");
const mysql_connect = mysql.createConnection(mysql_db);
const mysql_pool = mysql.createPool(mysql_db);

mysql_connect.connect(function(err) {
    if (err) throw err;
});

//https://devdotcode.com/interact-with-mysql-database-using-async-await-promises-in-node-js/

function getCategoryById(id) {
    const sql = `SELECT id FROM kategorie WHERE id = ${id}`;
    return new Promise((resolve, reject)=>{
        mysql_pool.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
function updateCategoryById(id,params){
    const sql = `UPDATE kategorie SET nazwa_pliku = ? WHERE id = ${id}`;
   
    return new Promise((resolve, reject) => {
        mysql_pool.query(sql, [params["nazwa_pliku"]], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(`Category with id: ${id} has been updated`);
        })
    });
    
}
function insertCategory({id,parentId,name}){
         //  insert category to mysql database

        parentId = parentId == 1 || parentId == null ? -1 : parentId;
        const fileName = replaceSpecialChars(name);
        const deepNested = parentId == 1 ? -1 : 0;

            const sql = `INSERT INTO kategorie (
                id, parent, nazwa, nazwa_pliku, widocznosc, nr, g, title, description, keywords
                ) VALUES (
                    ${id},
                    ${parentId},
                    "${name}",
                    "${fileName}",
                    1,
                    ${id},
                    ${deepNested},
                    "${name}",
                    "${name}",
                    "${name}"
                )`;
            return new Promise((resolve, reject) => {
                mysql_pool.query(sql, function (error, result) {
                        // if (err) throw err;
                        if(error){
                           console.log("inserted category error", error);
                            return reject(error)
                        }
                        console.log("1 record inserted");
                        return resolve(result)
                    })
            })
}
function insertCategoryProductRelation(catId,prodId){
    const sql = `INSERT INTO produkty_kategorie (id_kategorii, id_produktu) VALUES (${catId}, ${prodId})`;
    return new Promise((resolve,reject) => {
        mysql_pool.query(sql, function(error, result){
            if(error){
                console.log("insert category product relation error", error);
                return reject(error);
            }
            console.log("1 record inserted");
            return resolve(result);
        })
    });
}
function fetchAllProducts(){
    const sql = `SELECT * FROM produkty LIMIT 5000`;
    return new Promise((resolve, reject) => {
        mysql_pool.query(sql, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    })
}
function getProductById(id) {
    const sql = `SELECT id FROM produkty WHERE id = ${id}`;
    return new Promise((resolve, reject)=>{
        mysql_pool.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
function updateProductById(id,params){
    const sql = `UPDATE produkty SET id_kategorii = ?, nazwa_pliku = ? WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
        mysql_pool.query(sql, [params["id_kategorii"],params["nazwa_pliku"]], (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(`Product with id: ${id} has been updated`);
        })
    });
    
}
function insertProduct(data){
    //  insert product to mysql database

    const {id,categoryId,name,description1,description2,price,photo,tags} = data;
    const fileName = replaceSpecialChars(name);

        const sql = `INSERT INTO produkty (
            id,
            id_kategorii, 
            nazwa,
            nazwa_pliku,
            opis,
            opis2,
            nr,
            widocznosc,
            widoczny_glowna,
            cena,
            img,
            tagi
        ) VALUES (
            ${id},
            ${categoryId}, 
            "${name}",
            "${fileName}",
            "${description1.replace(/['"]+/g, '')}",
            "${description2.replace(/['"]+/g, '')}",
            ${id},
            1,
            0,
            ${price},
            "${photo}",
            "${tags}"
        )`;

        // console.log("sql:",sql);

        return new Promise((resolve, reject) => {

            mysql_pool.query(sql, function (error, result) {
                    // if (err) throw err;
                    if(error){
                       console.log("inserted produkt error", error);
                        return reject(error)
                    }
                    console.log("1 record inserted");
                    return resolve(result)
                })
            }
        );
}
function customizeCategories(){
    const sql = "SELECT * FROM kategorie LIMIT 1000";
    mysql_connect.query(sql, function(err, result){
        if(err) throw err;

        const categories = result.map(item => ({...item}));

        categories.forEach( category = async(category) => {
            let newData = { ...category };
            newData["nazwa_pliku"] = replaceSpecialChars(category["nazwa_pliku"]);
            // console.log("newData to update", newData);

            try{
                const response = await updateCategoryById(category.id, newData);
                console.log(response);
            }catch(errors){
                console.log("errors", errors);
            }
        })
    })
}
function customizeProducts(){
    const sql = "SELECT id, nazwa_pliku FROM produkty LIMIT 2700";

    mysql_connect.query(sql, function (err, result) {
        if (err) throw err;

        const products = result.map(item=> ({...item}));

        products.forEach( category = async(product) => {
            let newData = { ...product };
            newData["nazwa_pliku"] = replaceSpecialChars(product["nazwa_pliku"]);
            try{
                // toDO update function has been changed need to be fixed newData has to be an array of all product params
                const response = await updateProductById(product.id, newData);
                console.log(response);
            }catch(errors){
                console.log("errors", errors);
            }
        })

    }); 
}

function replaceSpecialChars(str){
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
		.replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
		.replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
		.replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
        .toLowerCase();
}

module.exports = {
    getCategoryById,
    insertCategory,
    updateCategoryById,
    fetchAllProducts,
    getProductById,
    updateProductById,
    insertProduct,
    customizeProducts,
    customizeCategories,
    insertCategoryProductRelation
}