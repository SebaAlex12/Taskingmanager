import { FETCHING_FILES, ADDING_FILE, REMOVING_FILE } from "./types";

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

/*
export const addFiles = albumId => {
  return async () => {
    // const presentDate = new Date();
    const multifiles = document.getElementById("file-select");
    const files = multifiles.files;
    const formData = new FormData();

    const dest = "albums-" + albumId;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i].name);
    }

    await axios
      .post(`/upload-files/${dest}`, formData)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  };
};

export const removeFiles = links => {
  return async () => {
    await axios
      .post(`/delete-files/`, { links: links })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };
};
*/
