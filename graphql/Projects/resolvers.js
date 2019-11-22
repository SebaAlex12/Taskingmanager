const Project = require("../../models/Project");
const crypt = require("../../utils/crypt");

module.exports = {
  fetchProjects: async function() {
    let projects = await Project.find(null, null, { sort: { name: 1 } });
    // console.log("projects resolver", projects);
    projects = projects.map(project => {
      if (project.cms && project.cms.length == 65) {
        project.cms = crypt.decrypt(project.cms);
      }
      if (project.ftp && project.ftp.length == 65) {
        project.ftp = crypt.decrypt(project.ftp);
      }
      if (project.panel && project.panel.length == 65) {
        project.panel = crypt.decrypt(project.panel);
      }
      return project;
    });
    return projects;
  },
  addProject: async function({ projectInput }, req) {
    const result = await Project.findOne({ name: projectInput.name });
    if (result) {
      // const error = new Error("Project already exists");
      const error = "Project already exists";
      throw error;
    }

    const project = new Project({
      name: projectInput.name,
      description: projectInput.description,
      cms: crypt.encrypt(projectInput.cms),
      ftp: crypt.encrypt(projectInput.ftp),
      panel: crypt.encrypt(projectInput.panel)
    });
    const storedProject = await project.save();

    return { ...storedProject._doc, _id: storedProject._id.toString() };
  },
  updateProject: async function({ projectInput }, req) {
    const _id = projectInput._id;
    const project = await Project.findOne({ _id });
    // console.log("project input", projectInput);

    const data = {
      _id: projectInput._id,
      name: projectInput.name !== "" ? projectInput.name : project.name,
      description:
        projectInput.description !== ""
          ? projectInput.description
          : project.description,
      cms:
        projectInput.cms !== "" ? crypt.encrypt(projectInput.cms) : project.cms,
      ftp:
        projectInput.ftp !== "" ? crypt.encrypt(projectInput.ftp) : project.ftp,
      panel:
        projectInput.panel !== ""
          ? crypt.encrypt(projectInput.panel)
          : project.panel
    };
    // console.log("project resolver", data);
    project.overwrite(data);
    const storedProject = await project.save();
    // console.log("stored project", storedProject);
    return { ...storedProject._doc, _id: storedProject._id.toString() };
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
