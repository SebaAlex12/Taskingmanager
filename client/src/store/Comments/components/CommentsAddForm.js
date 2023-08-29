import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { addComment } from "../actions";
import { updateTask } from "../../Tasks/actions";
import { addUserHistory } from "../../UsersHistory/actions";

import { StyledCommentAddForm } from "../styles/StyledCommentAddForm";

const CommentsAddForm = (props) => {

  const { taskId } = props;

  const dispatch = useDispatch();
  const [ description, setDescription ] = useState('');
  const loggedUser = useSelector( state => state.users.logged_user );
  
  const onChangeTextImagesArea = (event) => {
      setDescription(event.target.value);
  }

  const addComment = (event) => {
    event.preventDefault();  
    console.log('description',description);

    const data = {
      taskId: taskId,
      userId: loggedUser._id,
      createdBy: loggedUser.name,
      description,
    };

    // dispatch(addComment(data));

    // addUserHistory({
    //   userId: loggedUser._id,
    //   userName: loggedUser.name,
    //   taskCreatedBy: taskCreatedBy,
    //   taskProjectName: taskProjectName,
    //   taskTitle: taskTitle,
    //   event: "dodany komentarz do zadania",
    //   createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    // });

  }

  return(
      <StyledCommentAddForm>
        <div className="comment-add-form-box">
          <form action="">
            <div className="form-group">
              <textarea
                onInput={onChangeTextImagesArea}
                type="text"
                name="description"
                value={description}
                className="form-control"
                rows="5"
                placeholder="Dodaj komentarz"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                onClick={addComment}
                className="btn btn-primary pull-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledCommentAddForm>
    )
}

export default CommentsAddForm;

// class CommentsAddForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       description: "",
//     };
//     this.retrieveImageFromClipboardAsBase64 = this.retrieveImageFromClipboardAsBase64.bind(
//       this
//     );
//     this.attachimageDataBase64toWindow(this);
//   }
//   onChangeInput = (event) => {
//     this.setState({
//       ...this.state,
//       [event.currentTarget.name]: event.currentTarget.value,
//     });
//   };
//   onChangeTextImagesArea = () => {
//     this.setState({
//       description: document.getElementById("mixTextImagesArea").innerHTML,
//     });
//   };
//   addHandler = (event) => {
//     const {
//       addComment,
//       taskId,
//       taskCreatedBy,
//       taskProjectName,
//       taskTitle,
//       responsiblePerson,
//       loggedUser,
//       updateTask,
//       addUserHistory,
//     } = this.props;

//     const description = document.getElementById("mixTextImagesArea").innerHTML;

//     const data = {
//       taskId: taskId,
//       userId: loggedUser._id,
//       createdBy: loggedUser.name,
//       description,
//     };

//     const responsiblePersonLastComment =
//       loggedUser.name === responsiblePerson ? true : false;

//     event.preventDefault();

//     addComment(data);
//     addUserHistory({
//       userId: loggedUser._id,
//       userName: loggedUser.name,
//       taskCreatedBy: taskCreatedBy,
//       taskProjectName: taskProjectName,
//       taskTitle: taskTitle,
//       event: "dodany komentarz do zadania",
//       createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
//     });

//     // document.getElementById("mixTextImagesArea").innerHTML = "";
//     updateTask({
//       _id: taskId,
//       responsiblePersonLastComment: responsiblePersonLastComment,
//     });
//   };
  

//   render() {
//     return (

//     );
//   }
// }



// const debugBase64 = (base64URL) => {
//   var win = window.open();
//   win.document.write(
//     '<iframe src="' +
//       base64URL +
//       '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
//   );
// }
// const retrieveImageFromClipboardAsBase64 = (pasteEvent, callback, imageFormat) => {
//   if (pasteEvent.clipboardData === false) {
//     if (typeof callback === "function") {
//       callback(undefined);
//     }
//   }

//   var items = pasteEvent.clipboardData.items;

//   if (items === undefined) {
//     if (typeof callback == "function") {
//       callback(undefined);
//     }
//   }

//   for (var i = 0; i < items.length; i++) {
//       if (items[i].type.indexOf("image") === -1) continue;
//       let blob = items[i].getAsFile();
//       let mycanvas = document.createElement("canvas");
//       let ctx = mycanvas.getContext("2d");
//       let img = new Image();
//       img.onload = function () {
//         mycanvas.width = this.width;
//         mycanvas.height = this.height;
//         ctx.drawImage(img, 0, 0);
//         if (typeof callback == "function") {
//           callback(mycanvas.toDataURL(imageFormat || "image/png"));
//         }
//       };
//       let URLObj = window.URL || window.webkitURL;
//       img.src = URLObj.createObjectURL(blob);
//     }
//   }
//   const Base64ToImage = (base64img, callback) => {
//     let img = new Image();
//     img.onload = function () {
//       callback(img);
//     };
//     img.src = base64img;
//   }
//   const attachimageDataBase64toWindow = (obj) => {
//     window.addEventListener(
//       "paste",
//       function (e) {
//         obj.retrieveImageFromClipboardAsBase64(e, function (imageDataBase64) {
//           if (imageDataBase64) {
//               obj.Base64ToImage(imageDataBase64, function (img) {
//               document.getElementById("mixTextImagesArea").appendChild(img);
//             });
//           }
//         });
//       },
//       false
//     );
//   };