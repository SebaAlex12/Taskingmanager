const Contractor = require("../../models/Contractor");
const tools = require("../../utils/tools");

module.exports = {
  fetchContractors: async function() {
    let contractors = await Contractor.find(null, null, { sort: { name: 1 } });
    return contractors;
  },
  addContractor: async function({ contractorInput }, req) {
    const result = await Contractor.findOne({ name: contractorInput.name });
    if (result) {
      throw {
        errors: [
          { path: "name", message: "Istnieje już kontrahent o podanej nazwie" }
        ]
      };
    }
    // console.log("add contractor");
    const contractor = new Contractor({
      name: contractorInput.name,
      address: contractorInput.address,
      NIP: contractorInput.NIP,
      KRS: contractorInput.KRS,
      website: contractorInput.website,
      phone: contractorInput.phone,
      fax: contractorInput.fax,
      mail: contractorInput.mail,
      description: contractorInput.description
    });

    try {
      const storedContractor = await contractor.save();
      return { ...storedContractor._doc, _id: storedContractor._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateContractor: async function({ contractorInput }, req) {
    const _id = contractorInput._id;
    const contractor = await Contractor.findOne({ _id });
    // console.log("contractor input", contractorInput);

    const data = {
      _id: contractorInput._id,
      name: contractorInput.name ? contractorInput.name : contractor.name,
      address: contractorInput.address
        ? contractorInput.address
        : contractor.address,
      NIP: contractorInput.NIP ? contractorInput.NIP : contractor.NIP,
      KRS: contractorInput.KRS ? contractorInput.KRS : contractor.KRS,
      website: contractorInput.website
        ? contractorInput.website
        : contractor.website,
      phone: contractorInput.phone ? contractorInput.phone : contractor.phone,
      fax: contractorInput.fax ? contractorInput.fax : contractor.fax,
      mail: contractorInput.mail ? contractorInput.mail : contractor.mail,
      description: contractorInput.description
        ? contractorInput.description
        : contractor.description
    };
    try {
      contractor.overwrite(data);
      const storedContractor = await contractor.save();
      return {
        ...storedContractor._doc,
        _id: storedContractor._id.toString()
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeCotractor: async function({ contractorId }) {
    try {
      await Cotractor.deleteOne({ _id: contractorId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: contractorId };
  }
};
