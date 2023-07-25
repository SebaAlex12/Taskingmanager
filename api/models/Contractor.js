const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nazwa kontrahenta jest wymagana"]
  },
  address: {
    type: String,
    required: [true, "Adres kontrahenta jest wymagany"]
  },
  NIP: {
    type: String
  },
  KRS: {
    type: String
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
  description: {
    type: String
  }
});

module.exports = Contractor = mongoose.model("contractor", ContractorSchema);
