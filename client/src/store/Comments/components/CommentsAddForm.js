import React, { Component } from "react";
import { connect } from "react-redux";

import { addComment } from "../actions";
import { updateTask } from "../../Tasks/actions";
import { StyledCommentAddForm } from "../styles/StyledCommentAddForm";

class CommentsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
    this.retrieveImageFromClipboardAsBase64 = this.retrieveImageFromClipboardAsBase64.bind(
      this
    );
    this.attachimageDataBase64toWindow(this);
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  onChangeTextImagesArea = () => {
    this.setState({
      description: document.getElementById("mixTextImagesArea").innerHTML
    });
  };
  addHandler = event => {
    const {
      addComment,
      taskId,
      responsiblePerson,
      loggedUser,
      updateTask
    } = this.props;

    const description = document.getElementById("mixTextImagesArea").innerHTML;

    const data = {
      taskId: taskId,
      userId: loggedUser._id,
      createdBy: loggedUser.name,
      description
    };

    const responsiblePersonLastComment =
      loggedUser.name === responsiblePerson ? true : false;

    event.preventDefault();

    const response = addComment(data);
    // document.getElementById("mixTextImagesArea").innerHTML = "";
    updateTask({
      _id: taskId,
      responsiblePersonLastComment: responsiblePersonLastComment
    });
  };
  debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
      '<iframe src="' +
        base64URL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  }
  retrieveImageFromClipboardAsBase64(pasteEvent, callback, imageFormat) {
    if (pasteEvent.clipboardData == false) {
      if (typeof callback == "function") {
        callback(undefined);
      }
    }

    var items = pasteEvent.clipboardData.items;

    if (items == undefined) {
      if (typeof callback == "function") {
        callback(undefined);
      }
    }

    for (var i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf("image") == -1) continue;
      // Retrieve image on clipboard as blob
      var blob = items[i].getAsFile();

      // Create an abstract canvas and get context
      var mycanvas = document.createElement("canvas");
      var ctx = mycanvas.getContext("2d");

      // Create an image
      var img = new Image();

      // Once the image loads, render the img on the canvas
      img.onload = function() {
        // Update dimensions of the canvas with the dimensions of the image
        mycanvas.width = this.width;
        mycanvas.height = this.height;
        // Draw the image
        ctx.drawImage(img, 0, 0);

        // Execute callback with the base64 URI of the image
        if (typeof callback == "function") {
          callback(mycanvas.toDataURL(imageFormat || "image/png"));
        }
      };

      // Crossbrowser support for URL
      var URLObj = window.URL || window.webkitURL;

      // Creates a DOMString containing a URL representing the object given in the parameter
      // namely the original Blob
      img.src = URLObj.createObjectURL(blob);
    }
  }
  Base64ToImage(base64img, callback) {
    var img = new Image();
    img.onload = function() {
      callback(img);
    };
    img.src = base64img;
  }

  attachimageDataBase64toWindow = obj => {
    window.addEventListener(
      "paste",
      function(e) {
        // console.log("paste");
        // Handle the event
        obj.retrieveImageFromClipboardAsBase64(e, function(imageDataBase64) {
          // If there's an image, open it in the browser as a new window :)
          if (imageDataBase64) {
            // data:image/png;base64,iVBORw0KGgoAAAAN......
            // window.open(imageDataBase64);
            // obj.debugBase64(imageDataBase64);
            obj.Base64ToImage(imageDataBase64, function(img) {
              // document.getElementById('main').appendChild(img);
              // var log = "w=" + img.width + " h=" + img.height;
              // document.getElementById('log').value = log;
              // var el = document.getElementById("mixTextImagesArea");
              // console.log("element img", img);
              document.getElementById("mixTextImagesArea").appendChild(img);
            });
          }
        });
      },
      false
    );
  };

  render() {
    return (
      <StyledCommentAddForm>
        <div className="comment-add-form-box">
          <form action="">
            <div className="form-group">
              <div
                id="mixTextImagesArea"
                contentEditable="true"
                onInput={this.onChangeTextImagesArea}
                type="text"
                name="description"
                className="form-control"
                rows="5"
                placeholder="Dodaj komentarz"
                required
              ></div>
            </div>
            <div className="form-group">
              <input
                onClick={this.addHandler}
                className="btn btn-primary pull-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledCommentAddForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {
  addComment,
  updateTask
})(CommentsAddForm);
