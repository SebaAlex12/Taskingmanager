const mysql = require("mysql");

const mysql_db = require("../config/db_config.js");
const mysql_connect = mysql.createConnection(mysql_db);

module.exports = {
    insertProduct: async function(product){
        //  insert products to mysql database
        mysql_connect.connect(function(err) {
            if (err) throw err;
            const sql = "INSERT INTO produkty (id_kategorii, nazwa) VALUES (3, 'Blue Village 1')";
            mysql_connect.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted, ID: " + result.insertId);
            });
        });
    }
}