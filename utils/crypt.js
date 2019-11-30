const crypto = require("crypto");
let key = require("../config/keys").secretOrKeyDecrypt;
key = key.toString("hex").slice(0, 32);
const IV_LENGTH = 16; // For AES, this is always 16

module.exports = {
  encrypt: function(text) {
    // let iv = crypto.randomBytes(IV_LENGTH);
    // let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    // let encrypted = cipher.update(text);
    // encrypted = Buffer.concat([encrypted, cipher.final()]);
    // return iv.toString("hex") + ":" + encrypted.toString("hex");

    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  },
  decrypt: function(text) {
    // console.log("deeecrypted");
    // let textParts = text.split(":");
    // let iv = Buffer.from(textParts.shift(), "hex");
    // let encryptedText = Buffer.from(textParts.join(":"), "hex");
    // let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    // let decrypted = decipher.update(encryptedText);
    // decrypted = Buffer.concat([decrypted, decipher.final()]);
    // return decrypted.toString();

    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let cipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = cipher.update(encryptedText, "hex", "utf8");
    decrypted += cipher.final("utf8");

    return decrypted;
  }
};
