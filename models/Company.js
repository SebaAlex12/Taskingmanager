const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, "Nazwa firmy jest wymagana"]
  },
  address: {
    type: String,
    required: [true, "Adres firmy jest wymagany"]
  },
  NIP: {
    type: String,
    required: [true, "NIP firmy jest wymagany"]
  },
  website: {
    type: String
  },
  phone: {
    type: String
  },
  fax: {
    type: String
  },
  mail: {
    type: String
  },
  bankName: {
    type: String,
    required: [true, "Nazwa banku firmy jest wymagana"]
  },
  bankAcount: {
    type: String,
    required: [true, "Numer konta firmy jest wymagany"]
  },
  description: {
    type: String
  }
});

module.exports = Company = mongoose.model("company", CompanySchema);
