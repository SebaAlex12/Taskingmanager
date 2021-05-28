
const axios = require("axios");
const apiToken = require("../config/keys").importApiToken;

module.exports = {
    fetchApiCategories: async function(){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/categories?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
            console.log("errors",errors);
          }
    },
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
    fetchApiProductDetailsById: async function(id){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/products/${id}?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
              return console.log("errors",errors);
          }
    },
    fetchApiProductCharacteristicById: async function(id){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/products/${id}/characteristics?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
              return console.log("errors",errors);
          }
    },
    fetchApiProductPricesById: async function(id){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/products/${id}/price?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
              return console.log("errors",errors);
          }
    },
    fetchApiProductCategoriesById: async function(id){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/products/${id}/categories?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
              return console.log("errors",errors);
          }
    },
    fetchApiProductPhotosById: async function(id){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/products/${id}/fotos?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
              return console.log("errors",errors);
          }
    },
    fetchApiCategoriesById: async function(id){
        try{
            const res = await axios.get(`http://mega-com.pl/api/v1/categories/${id}?token=${apiToken}`);
            if(res){
              return res.data;
            }
          }catch(errors){
              return console.log("errors",errors);
          }  
    }
}