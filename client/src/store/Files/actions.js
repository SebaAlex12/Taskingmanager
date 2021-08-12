import { FETCHING_FILES, ADDING_FILE } from "./types";

export const fetchFiles = () => ({
  type: FETCHING_FILES
});
export const addFiles = data => ({
  type: ADDING_FILE,
  data
});
// export const removeFile = projectId => ({
//   type: REMOVING_FILE,
//   projectId
// });
