const Project = require("../../models/Project");
const crypt = require("../../utils/crypt");
const tools = require("../../utils/tools");

module.exports = {
  fetchProjects: async function() {
    let projects = await Project.find(null, null, { sort: { name: 1 } });
    // console.log("projects resolver", projects);
    projects = projects.map(project => {
      if (project.description && project.description.length > 1) {
        project.description = crypt.decrypt(project.description);
      }
      if (project.cms && project.cms.length > 1) {
        project.cms = crypt.decrypt(project.cms);
      }
      if (project.ftp && project.ftp.length > 1) {
        project.ftp = crypt.decrypt(project.ftp);
      }
      if (project.panel && project.panel.length > 1) {
        project.panel = crypt.decrypt(project.panel);
      }
      return project;
    });
    return projects;
  },
  fetchProjectsByLoggedUserProjects: async function({ projects }) {
    const list = projects.split(",");
    const pregmatch = list.map(item => new RegExp(item));

    let prj = await Project.find().or([
      {
        name: {
          $in: pregmatch
        }
      }
    ]);

    // find(null, null, { sort: { name: 1 } });
    // console.log("projects resolver", projects);
    prj = prj.map(project => {
      if (project.description && project.description.length > 1) {
        project.description = crypt.decrypt(project.description);
      }
      if (project.cms && project.cms.length > 1) {
        project.cms = crypt.decrypt(project.cms);
      }
      if (project.ftp && project.ftp.length > 1) {
        project.ftp = crypt.decrypt(project.ftp);
      }
      if (project.panel && project.panel.length > 1) {
        project.panel = crypt.decrypt(project.panel);
      }
      return project;
    });
    return prj;
  },
  addProject: async function({ projectInput }, req) {
    const result = await Project.findOne({ name: projectInput.name });
    if (result) {
      throw {
        errors: [
          { path: "name", message: "Istnieje już projekt o podanej nazwie" }
        ]
      };
    }
    // console.log("add project");
    const data = {
      name: projectInput.name,
      description:
        projectInput.description && projectInput.description.length > 1
          ? crypt.encrypt(projectInput.description)
          : projectInput.description,
      cms:
        projectInput.cms && projectInput.cms.length > 1
          ? crypt.encrypt(projectInput.cms)
          : projectInput.cms,
      ftp:
        projectInput.ftp && projectInput.ftp.length > 1
          ? crypt.encrypt(projectInput.ftp)
          : projectInput.ftp,
      panel:
        projectInput.panel && projectInput.panel.length > 1
          ? crypt.encrypt(projectInput.panel)
          : projectInput.panel
    };

    const project = new Project(data);
    try {
      const storedProject = await project.save();
      return {
        ...storedProject._doc,
        _id: storedProject._id.toString(),
        description:
          storedProject.description && storedProject.description.length > 1
            ? crypt.decrypt(storedProject.description)
            : storedProject.description,
        cms:
          storedProject.cms && storedProject.cms.length > 1
            ? crypt.decrypt(storedProject.cms)
            : storedProject.cms,
        ftp:
          storedProject.ftp && storedProject.ftp.length > 1
            ? crypt.decrypt(storedProject.ftp)
            : storedProject.ftp,
        panel:
          storedProject.panel && storedProject.panel.length > 1
            ? crypt.decrypt(storedProject.panel)
            : storedProject.panel
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateProject: async function({ projectInput }, req) {
    const _id = projectInput._id;
    const project = await Project.findOne({ _id });
    // console.log("project input", projectInput);

    const data = {
      _id: projectInput._id,
      name: projectInput.name !== "" ? projectInput.name : project.name,
      description:
        projectInput.description.length > 1
          ? crypt.encrypt(projectInput.description)
          : projectInput.description,
      cms:
        projectInput.cms.length > 1
          ? crypt.encrypt(projectInput.cms)
          : projectInput.cms,
      ftp:
        projectInput.ftp.length > 1
          ? crypt.encrypt(projectInput.ftp)
          : projectInput.ftp,
      panel:
        projectInput.panel.length > 1
          ? crypt.encrypt(projectInput.panel)
          : projectInput.panel
    };
    try {
      project.overwrite(data);
      const storedProject = await project.save();
      return {
        ...storedProject._doc,
        _id: storedProject._id.toString(),
        description:
          storedProject.description && storedProject.description.length > 1
            ? crypt.decrypt(storedProject.description)
            : storedProject.description,
        cms:
          storedProject.cms && storedProject.cms.length > 1
            ? crypt.decrypt(storedProject.cms)
            : storedProject.cms,
        ftp:
          storedProject.ftp && storedProject.ftp.length > 1
            ? crypt.decrypt(storedProject.ftp)
            : storedProject.ftp,
        panel:
          storedProject.panel && storedProject.panel.length > 1
            ? crypt.decrypt(storedProject.panel)
            : storedProject.panel
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  }
  // removeProject: async function({ projectId }) {
  //   try {
  //     await Project.deleteOne({ _id: projectId });
  //   } catch (err) {
  //     const error = new Error(err);
  //     throw error;
  //   }
  //   return { _id: projectId };
  // }
};
