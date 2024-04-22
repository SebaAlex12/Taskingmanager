import styled from "styled-components";

export const StyledCommentList = styled.div`
  .comments-list-box {
    float: left;
    padding: 0px 15px;
    width: 33.3%;
    height: 210px;
    overflow-y: scroll;
    padding-right:5px;
  }
  .comments-list-box li {
    background-color: #fff;
    border-color: 1px solid #ccc;
    color: red;
    text-align: left;
  }
  .comments-list-box li.creator {
    color: green;
    border-color: 1px solid #ccc;
  }
  .comments-list-box li .date,
  .comments-list-box li .creator-name {
    color: #333;
    font-size: 10px;
    font-weight: bold;
  }
  .comments-list-box li .date {
    float: left;
  }
  .comments-list-box li .details {
    float: right;
  }
  .comments-list-box li .comment-item-box {
    clear: both;
  }
  .comments-list-box li .creator-name {
    float: right;
  }
  .comments-list-box li .details .disabled {
    cursor: auto;
    opacity: 0.5;
  }
  .comments-list-box li .description img,
  .comments-list-box li .short-description img {
    width: 100%;
    height: auto;
  }
  .comments-list-box li .short-description {
    height: 50px;
    overflow: hidden;
  }
`;
