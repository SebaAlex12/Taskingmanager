const axios = require("axios");
const mysql = require("mysql");

const mysql_db = require("../config/db_config.js");
const mysql_connect = mysql.createConnection(mysql_db);

const apiToken = require("../config/keys").importApiToken;

module.exports = {
    fetchApiProducts: async function(){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/products?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
            console.log("errors",errors);
          }
    },
    fetchApiProductById: async function(id){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/products/${id}?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
            console.log("errors",errors);
          }
    },
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