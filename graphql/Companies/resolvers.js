const Company = require("../../models/Company");
const tools = require("../../utils/tools");

module.exports = {
  fetchCompanies: async function() {
    let companies = await Company.find(null, null, { sort: { name: 1 } });
    return companies;
  },
  addCompany: async function({ companyInput }, req) {
    const result = await Company.findOne({ name: companyInput.name });
    if (result) {
      throw {
        errors: [
          { path: "name", message: "Istnieje już firma o podanej nazwie" }
        ]
      };
    }

    const company = new Company({
      name: companyInput.name,
      address: companyInput.address,
      NIP: companyInput.NIP,
      website: companyInput.website,
      phone: companyInput.phone,
      fax: companyInput.fax,
      mail: companyInput.mail,
      bankName: companyInput.bankName,
      bankAcount: companyInput.bankAcount,
      description: companyInput.description
    });

    try {
      const storedCompany = await company.save();
      return { ...storedCompany._doc, _id: storedCompany._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateCompany: async function({ companyInput }, req) {
    const _id = companyInput._id;
    const company = await Company.findOne({ _id });

    const data = {
      _id: companyInput._id,
      name: companyInput.name ? companyInput.name : company.name,
      address: companyInput.address ? companyInput.address : company.address,
      NIP: companyInput.NIP ? companyInput.NIP : company.NIP,
      website: companyInput.website ? companyInput.website : company.website,
      phone: companyInput.phone ? companyInput.phone : company.phone,
      fax: companyInput.fax ? companyInput.fax : company.fax,
      mail: companyInput.mail ? companyInput.mail : company.mail,
      bankName: companyInput.bankName
        ? companyInput.bankName
        : company.bankName,
      bankAcount: companyInput.bankAcount
        ? companyInput.bankAcount
        : company.bankAcount,
      description: companyInput.description
        ? companyInput.description
        : company.description
    };

    try {
      company.overwrite(data);
      const storedCompany = await company.save();
      return {
        ...storedCompany._doc,
        _id: storedCompany._id.toString()
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeCompany: async function({ companyId }) {
    try {
      await Company.deleteOne({ _id: companyId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: companyId };
  }
};
