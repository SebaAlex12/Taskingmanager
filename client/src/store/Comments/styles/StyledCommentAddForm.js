import styled from "styled-components";

export const StyledCommentAddForm = styled.div`
  .comment-add-form-box {
  }
  .comment-add-form-box textarea {
    width:33%;
    height: 210px;
  }
  .comment-add-form-box input[type="submit"] {
    margin-top: -52px;
    margin-right: 3px;
    position: relative;
  }
  #mixTextImagesArea {
    width: 445px;
    height: 205px;
    border: 1px solid #ddd;
    overflow-y: auto;
    text-align: left;
  }
  #mixTextImagesArea img {
    width: 100%;
    height: auto;
  }
`;
