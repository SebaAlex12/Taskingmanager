const Project = require("../../models/Project");

module.exports = {
  fetchProjects: async function() {
    const projects = await Project.find();
    return projects;
  },
  addProject: async function({ projectInput }, req) {
    const project = new Project({
      name: projectInput.name,
      description: projectInput.description
    });

    const storedProject = await project.save();

    return { ...storedProject._doc, _id: storedProject._id.toString() };
  },
  updateProject: async function({ projectInput }, req) {
    const _id = projectInput._id;
    const project = await Project.findOne({ _id });
    console.log("project input", projectInput);
    const data = {
      _id: projectInput.id,
      name: projectInput.name !== "" ? projectInput.name : project.name,
      description:
        projectInput.description !== ""
          ? projectInput.description
          : project.description
    };

    project.overwrite(data);
    const storedProject = await project.save();

    return { ...storedProject._doc, _id: storedProject._id };
  },
  removeProject: async function({ projectId }) {
    try {
      await Project.deleteOne({ _id: projectId });
    } catch (err) {
      const error = new Error(err);
      throw error;
    }
    return { _id: projectId };
  }
};
