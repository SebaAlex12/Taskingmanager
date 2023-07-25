const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  paymentNumber: {
    type: String,
    required: [true, "Numer płatności jest wymagany"]
  },
  paymentMonth: {
    type: String,
    required: [true, "Miesiąc płatności jest wymagany"]
  },
  paymentYear: {
    type: String,
    required: [true, "Rok płatności jest wymagany"]
  },
  paymentType: {
    type: String,
    required: [true, "Rodzaj płatności jest wymagany"]
  },
  paymentCycle: {
    type: String,
    required: [true, "Rodzaj płatności jest wymagany"]
  },
  companyName: {
    type: String,
    required: [true, "Nazwa firmy jest wymagana"]
  },
  contractorName: {
    type: String,
    required: [true, "Nazwa kontrahenta jest wymagana"]
  },
  companyAddress: {
    type: String,
    required: [true, "Adres firmy jest wymagany"]
  },
  contractorAddress: {
    type: String,
    required: [true, "Adres kontrahenta jest wymagany"]
  },
  companyNIP: {
    type: String,
    required: [true, "NIP firmy jest wymagany"]
  },
  contractorNIP: {
    type: String,
    required: [true, "NIP kontrahenta jest wymagany"]
  },
  companyWebsite: {
    type: String
  },
  companyPhone: {
    type: String
  },
  contractorPhone: {
    type: String
  },
  companyMail: {
    type: String
  },
  contractorMail: {
    type: String
  },
  companyBankName: {
    type: String,
    required: [true, "Nazwa banku firmy jest wymagana"]
  },
  companyBankAcount: {
    type: String,
    required: [true, "Numer konta firmy jest wymagany"]
  },
  description: {
    type: String
  },
  netValue: {
    type: String
  },
  grossValue: {
    type: String
  },
  status: {
    type: String,
    required: [true, "Status jest wymagany"]
  },
  paymentMethod: {
    type: String
  },
  termAt: {
    type: String
  },
  createdAt: {
    type: String,
    required: [true, "Data utworzenia jest wymagana"]
  }
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
