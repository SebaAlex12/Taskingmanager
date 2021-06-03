const mysql = require("mysql");

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
function insertCategory({id,parentId,name}){
         //  insert category to mysql database

        parentId = parentId == 1 || parentId == null ? -1 : parentId;
        const fileName = name;
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
function fetchAllProducts(){
    const sql = `SELECT id FROM produkty`;
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
    const sql = `UPDATE produkty SET nazwa_pliku = ? WHERE id = ${id}`;
   
    return new Promise((resolve, reject) => {
        mysql_pool.query(sql, [params["nazwa_pliku"]], (error, elements)=>{
            if(error){
                return reject(error);
            }
            // console.log("elements",elements);
            return resolve(`Product with id: ${id} has been updated`);
        })
    });
    
}
function insertProduct({id,categoryId,name,description1,description2,price,photo,tags}){
    //  insert product to mysql database

    let fileName = name.replace(" ","-");
    fileName = fileName.replace(" ","-");

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
            "${description1}",
            "${description2}",
            ${id},
            1,
            0,
            ${price},
            "${photo}",
            "${tags}"
        )`;

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
function customizeProducts(){
    const sql = "SELECT id, nazwa_pliku FROM produkty LIMIT 2700";

    mysql_connect.query(sql, function (err, result) {
        if (err) throw err;

        const products = result.map(item=> ({...item}));

        products.forEach( product = async(product) => {

            let update = false;
            let newData = { ...product };

            if(product["nazwa_pliku"].indexOf(' ') >= 0){
                console.log("Filename has got white spaces: ", product["nazwa_pliku"]);

                const search = " "; 
                const replacer = new RegExp(search, 'g');

                newData["nazwa_pliku"] = product["nazwa_pliku"].replace(replacer,"-");
                update = true;
            }

            if(update){
                console.log("newData to update", newData);
                try{
                    const response = await updateProductById(product.id, newData);
                    console.log(response);
                }catch(errors){
                    console.log("errors", errors);
                }
            }
        });

    }); 
}

module.exports = {
    getCategoryById,
    insertCategory,
    fetchAllProducts,
    getProductById,
    updateProductById,
    insertProduct,
    customizeProducts
}