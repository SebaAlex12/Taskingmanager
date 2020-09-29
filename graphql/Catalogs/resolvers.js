const Catalog = require("../../models/Catalog");
const tools = require("../../utils/tools");

module.exports = {
  fetchCatalogs: async function () {
    const catalogs = await Catalog.find();
    // console.log("catalogs", catalogs);
    return catalogs;
  },
  addCatalog: async function ({ catalogInput }, req) {
    const catalog = new Catalog({
      url: catalogInput.url,
      title: catalogInput.title,
      description: catalogInput.description,
      login: catalogInput.login,
      password: catalogInput.password,
      multicode: catalogInput.multicode,
      price: catalogInput.price,
      websites: catalogInput.websites,
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
      url: catalogInput.url !== "" ? catalogInput.url : catalog.url,
      title: catalogInput.title !== "" ? catalogInput.title : catalog.title,
      description:
        catalogInput.description !== ""
          ? catalogInput.description
          : catalog.description,
      login: catalogInput.login !== "" ? catalogInput.login : catalog.login,
      password:
        catalogInput.password !== "" ? catalogInput.password : catalog.password,
      multicode:
        catalogInput.multicode !== ""
          ? catalogInput.multicode
          : catalog.multicode,
      price: catalogInput.price !== "" ? catalogInput.price : catalog.price,
      websites:
        catalogInput.websites !== "" ? catalogInput.websites : catalog.websites,
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
