import React, { useState } from "react";
import moment from "moment/min/moment-with-locales";
// import ReactHtmlParser from "react-html-parser";

const CommentsItem = ({item}) => {

  const [ toggleDescriptionMore,setToggleDescriptionMore ] = useState(false);

  const responsiblePerson = false;
  const charts = 500;

  const isActive =
  item.createdBy === responsiblePerson
    ? "list-group-item creator"
    : "list-group-item";

const isDisabled =
  item.description.length < charts
    ? "glyphicon glyphicon-edit disabled"
    : "glyphicon glyphicon-edit";

  return(
<li className={isActive}>
        <div className="date">
          {moment(new Date(item.createdAt)).locale("pl").format("LLLL")}
        </div>
        <div className="creator-name">{item.createdBy}</div>
        <div className="comment-item-box">
          <div className="details">
            <i
              className={isDisabled}
              onClick={() =>
                setToggleDescriptionMore({
                  toggleDescriptionMore: !toggleDescriptionMore,
                })
              }
            ></i>
          </div>
          {toggleDescriptionMore ? (
            <div className="description">
              {/* {ReactHtmlParser(item.description)} */}
              {item.description}
            </div>
          ) : (
            <div className="short-description">
              {/* {ReactHtmlParser(item.description)} */}
              {item.description}
            </div>
          )}
        </div>
      </li>
  )
}
export default CommentsItem;