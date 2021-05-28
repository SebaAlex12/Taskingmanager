const mysql = require("mysql");

const mysql_db = require("../config/db_config.js");
const mysql_connect = mysql.createConnection(mysql_db);

mysql_connect.connect(function(err) {
    if (err) throw err;
});

module.exports = {
    insertProduct: async function({id,categoryId,name,description1,description2,price,photo,tags}){
        //  insert product to mysql database

        let fileName = name.replace(" ","-");
        fileName = fileName.replace(" ","-");


            const sql = `INSERT INTO produkty (
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
            // console.log("sql",sql);
            mysql_connect.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted, ID: " + result.insertId);
            });
    },
    insertCategory: async function({id,parentId,name}){
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
                  //  console.log("sql",sql);
                mysql_connect.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted, ID: " + result.insertId);
                });  
    }
}