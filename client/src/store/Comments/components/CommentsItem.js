import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

class CommentsItem extends Component {
  constructor(props) {
    super(props);
    // const { item } = this.props;
    // this.retriveImageFromBase64(description);
    // let description = this.retriveImageFromBase64(item.description);
    // console.log("constructor desc", description);
    this.state = {
      toggleDescriptionMore: false
    };
  }
  // componentDidMount() {
  //   document.getElementById("mixTextImagesAreaEditor").appendChild(image);
  // }
  // retriveImageFromBase64 = imageBase64 => {
  //   var image = new Image();
  //   image.onload = function() {
  //     console.log(image.width); // image is loaded and we have image width
  //   };
  //   image.src = imageBase64;
  //   console.log("retrive image", image.outerHTML);
  //   return image.outerHTML;
  // };
  // stringToHTMLElement = str => {
  //   var dom = document.createElement("div");
  //   dom.innerHTML = str;
  //   return dom;
  // };
  // stringToHTML = str => {
  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(str, "text/html");
  //   return doc.body;
  // };

  render() {
    const { item, responsiblePerson } = this.props;
    const { toggleDescriptionMore } = this.state;
    const charts = 50;
    // let description = "";
    // console.log("item user", item);
    // document.querySelector(".description").innerHTML = item.description;
    // console.log(document.querySelector(".description"));

    // console.log("render desc", item.description);
    // console.log("object[]", this.stringToHTML(item.description));
    // console.log("created element", this.stringToHTMLElement(item.description));
    // let element = React.createElement("div", {}, item.description);
    // element.innerHTML = item.description;
    const isActive =
      item.createdBy === responsiblePerson
        ? "list-group-item creator"
        : "list-group-item";

    const isDisabled =
      item.description.length < charts
        ? "glyphicon glyphicon-edit disabled"
        : "glyphicon glyphicon-edit";

    return (
      <li className={isActive}>
        <div className="date">
          {moment(new Date(item.createdAt))
            .locale("de")
            .format("LLLL")}
        </div>
        <div className="creator-name">{item.createdBy}</div>
        <div className="content-box">
          <div className="details">
            <i
              className={isDisabled}
              onClick={() =>
                this.setState({
                  toggleDescriptionMore: !toggleDescriptionMore
                })
              }
            ></i>
          </div>
          {toggleDescriptionMore ? (
            <div className="description">
              {ReactHtmlParser(item.description)}
            </div>
          ) : (
            <div className="short-description">
              {ReactHtmlParser(item.description)}
            </div>
          )}
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {})(CommentsItem);
