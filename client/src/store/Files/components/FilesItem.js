import React from "react";
// import "../photos.scss";
// const Circle = require("../Photos.module.scss");

function FilesItem({ imageUrl, lightboxPhotosHandler }) {
  const arr = imageUrl.split("/");
  // console.log("array", arr);
  const miniLink = [arr[1], arr[2], arr[3], "mini", arr[4]].join("/");
  return (
    <div className="photo-card col-lg-1 phtos-list-item">
      <figure className="figure">
        <div
          className="image"
          data-title="Image caption"
          // onClick={lightboxPhotosHandler}
        >
          <img src={miniLink} className="figure-img img-fluid rounded" alt="" />
        </div>
        <figcaption className="figure-caption text-right" />
      </figure>
    </div>
  );
}

export default FilesItem;
