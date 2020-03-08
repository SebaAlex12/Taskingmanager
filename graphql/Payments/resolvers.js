const Payment = require("../../models/Payment");
const tools = require("../../utils/tools");

module.exports = {
  fetchPayments: async function({ paymentInput }) {
    let params = {};
    params.paymentType = paymentInput.paymentType;

    let payment = await Payment.find(params);
    return payment;
  },
  fetchNotUsedPatterns: async function({ month, year }) {
    let params = {};
    console.log("resolver month", month);
    console.log("resolver year", year);
    // params.paymentType = paymentInput.paymentType;

    let payment = await Payment.find(params);
    return payment;
  },
  fetchLastInsertInvoice: async function() {
    let payment = await Payment.findOne({ paymentType: "Faktura" }, null, {
      sort: { paymentNumber: -1 }
    });
    return payment;
  },
  fetchLastInsertPattern: async function() {
    let payment = await Payment.findOne({ paymentType: "Wzór" }, null, {
      sort: { paymentNumber: -1 }
    });
    return payment;
  },
  addPayment: async function({ paymentInput }, req) {
    // const result = await Payment.findOne({
    //   paymentNumber: paymentInput.paymentNumber
    // });
    // if (result) {
    //   throw {
    //     errors: [
    //       { path: "name", message: "Istnieje już płatność o podanym numerze" }
    //     ]
    //   };
    // }
    // console.log("resover", paymentInput);
    const payment = new Payment({
      paymentNumber: paymentInput.paymentNumber,
      paymentMonth: paymentInput.paymentMonth,
      paymentYear: paymentInput.paymentYear,
      paymentType: paymentInput.paymentType,
      paymentCycle: paymentInput.paymentCycle,
      companyName: paymentInput.companyName,
      contractorName: paymentInput.contractorName,
      companyAddress: paymentInput.companyAddress,
      contractorAddress: paymentInput.contractorAddress,
      companyNIP: paymentInput.companyNIP,
      contractorNIP: paymentInput.contractorNIP,
      companyWebsite: paymentInput.companyWebsite,
      companyPhone: paymentInput.companyPhone,
      contractorPhone: paymentInput.contractorPhone,
      companyMail: paymentInput.companyMail,
      contractorMail: paymentInput.contractorMail,
      companyBankName: paymentInput.companyBankName,
      companyBankAcount: paymentInput.companyBankAcount,
      description: paymentInput.description,
      netValue: paymentInput.netValue,
      grossValue: paymentInput.grossValue,
      status: paymentInput.status,
      paymentMethod: paymentInput.paymentMethod,
      termAt: paymentInput.termAt,
      createdAt: paymentInput.createdAt
    });

    try {
      const storedPayment = await payment.save();
      return { ...storedPayment._doc, _id: storedPayment._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updatePayment: async function({ paymentInput }, req) {
    const _id = paymentInput._id;
    const payment = await Payment.findOne({ _id });
    // console.log("payment input", paymentInput);

    const data = {
      _id: paymentInput._id,
      paymentNumber: paymentInput.paymentNumber
        ? paymentInput.paymentNumber
        : payment.paymentNumber,
      paymentMonth: paymentInput.paymentMonth
        ? paymentInput.paymentMonth
        : payment.paymentMonth,
      paymentYear: paymentInput.paymentYear
        ? paymentInput.paymentYear
        : payment.paymentYear,
      paymentType: paymentInput.paymentType
        ? paymentInput.paymentType
        : payment.paymentType,
      paymentCycle: paymentInput.paymentCycle
        ? paymentInput.paymentCycle
        : payment.paymentCycle,
      companyName: paymentInput.companyName
        ? paymentInput.companyName
        : payment.companyName,
      contractorName: paymentInput.contractorName
        ? paymentInput.contractorName
        : payment.contractorName,
      companyAddress: paymentInput.companyAddress
        ? paymentInput.companyAddress
        : payment.companyAddress,
      contractorAddress: paymentInput.contractorAddress
        ? paymentInput.contractorAddress
        : payment.contractorAddress,
      companyNIP: paymentInput.companyNIP
        ? paymentInput.companyNIP
        : payment.companyNIP,
      contractorNIP: paymentInput.contractorNIP
        ? paymentInput.contractorNIP
        : payment.contractorNIP,
      companyWebsite: paymentInput.companyWebsite
        ? paymentInput.companyWebsite
        : payment.companyWebsite,
      companyPhone: paymentInput.companyPhone
        ? paymentInput.companyPhone
        : payment.companyPhone,
      contractorPhone: paymentInput.contractorPhone
        ? paymentInput.contractorPhone
        : payment.contractorPhone,
      companyMail: paymentInput.companyMail
        ? paymentInput.companyMail
        : payment.companyMail,
      contractorMail: paymentInput.contractorMail
        ? paymentInput.contractorMail
        : payment.contractorMail,
      companyBankName: paymentInput.companyBankName
        ? paymentInput.companyBankName
        : payment.companyBankName,
      companyBankAcount: paymentInput.companyBankAcount
        ? paymentInput.companyBankAcount
        : payment.companyBankAcount,
      description: paymentInput.description
        ? paymentInput.description
        : payment.description,
      netValue: paymentInput.netValue
        ? paymentInput.netValue
        : payment.netValue,
      grossValue: paymentInput.grossValue
        ? paymentInput.grossValue
        : payment.grossValue,
      status: paymentInput.status ? paymentInput.status : payment.status,
      paymentMethod: paymentInput.paymentMethod
        ? paymentInput.paymentMethod
        : payment.paymentMethod,
      termAt: paymentInput.termAt ? paymentInput.termAt : payment.termAt,
      createdAt: paymentInput.createdAt
        ? paymentInput.createdAt
        : payment.createdAt
    };
    try {
      payment.overwrite(data);
      const storedPayment = await payment.save();
      return {
        ...storedPayment._doc,
        _id: storedPayment._id.toString()
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removePayment: async function({ paymentId }) {
    try {
      await Payment.deleteOne({ _id: paymentId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: paymentId };
  }
};
