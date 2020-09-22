const Catalog = require("../../models/Catalog");
const tools = require("../../utils/tools");

module.exports = {
  fetchCatalogs: async function () {
    const catalogs = await Catalog.find();
    return catalogs;
  },
  addCatalog: async function ({ catalogInput }, req) {
    const catalog = new Catalog({
      title: catalogInput.title,
      description: catalogInput.description,
      url: catalogInput.url,
      rank: catalogInput.rank,
      status: catalogInput.status,
      createdAt: catalogInput.createdAt,
    });
    try {
      const storedCatalog = await catalog.save();
      return { ...storedCatalog._doc, _id: storedCatalog._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateCatalog: async function ({ catalogInput }, req) {
    const _id = catalogInput._id;
    const catalog = await Catalog.findOne({ _id });
    // console.log("catalog input", catalogInput);

    const data = {
      _id: catalogInput._id,
      title: catalogInput.title !== "" ? catalogInput.title : catalog.title,
      description:
        catalogInput.description !== ""
          ? catalogInput.description
          : catalog.description,
      url: catalogInput.url !== "" ? catalogInput.url : catalog.url,
      rank: catalogInput.rank !== "" ? catalogInput.rank : catalog.rank,
      status: catalogInput.status !== "" ? catalogInput.status : catalog.status,
      createdAt:
        catalogInput.createdAt !== ""
          ? catalogInput.createdAt
          : catalog.createdAt,
    };
    try {
      catalog.overwrite(data);
      const storedCatalog = await catalog.save();
      return {
        ...storedCatalog._doc,
        _id: storedCatalog._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeCatalog: async function ({ catalogId }) {
    try {
      await Catalog.deleteOne({ _id: catalogId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: catalogId };
  },
};
