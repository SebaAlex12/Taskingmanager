import {
  FETCHING_PROJECTS,
  ADDING_PROJECT,
  REMOVING_PROJECT,
  UPDATING_PROJECT
} from "./types";

export const fetchProjects = () => ({
  type: FETCHING_PROJECTS
});
export const addProject = data => ({
  type: ADDING_PROJECT,
  data
});
export const updateProject = data => ({
  type: UPDATING_PROJECT,
  data
});
export const removeProject = projectId => ({
  type: REMOVING_PROJECT,
  projectId
});
