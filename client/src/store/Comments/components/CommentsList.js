import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


import { StyledCommentList } from "../styles/StyledCommentList";
// import { fetchComments } from './../actions';
import CommentsItem from "./CommentsItem";

const CommentsList = ({taskId, responsiblePerson}) => {
    const [ comments, setComments] = useState(false);

    console.log('comments list render...');

    // const dispatch = useDispatch();
    // const data = useSelector(state => state.comments.comments);
    const selectedComments = useSelector(state=> state.comments.comments);
    console.log('selectedComments',selectedComments);


    
    // useEffect(() => {
    //   console.log('comments array',data);
    //     setComments(data);
    // },[data])
    
    useEffect(() => {
      // dispatch(fetchComments({taskId}));

      if(selectedComments.length > 0){
          // if(data[0].taskId === taskId){
            setComments(selectedComments);
          // }
      }
      console.log('use effect comments');
    },[comments]);

    const commentsContent = selectedComments.length > 0
      ? selectedComments.map((comment) => {
          return (
            <CommentsItem
              item={comment}
              key={comment._id}
              responsiblePerson={responsiblePerson}
            />
          );
        })
      : "loading...";

    return (
      <StyledCommentList>
        <ul className="comments-list-box list-group">{commentsContent}</ul>
      </StyledCommentList>
    );
}

export default CommentsList;

// class CommentsList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   componentDidMount() {
//     const { fetchComments, taskId } = this.props;
//     const data = {
//       taskId,
//     };
//     fetchComments(data);
//   }
//   sortArray(array, property, direction) {
//     direction = direction || 1;
//     array.sort(function compare(a, b) {
//       let comparison = 0;
//       if (a[property] > b[property]) {
//         comparison = 1 * direction;
//       } else if (a[property] < b[property]) {
//         comparison = -1 * direction;
//       }
//       return comparison;
//     });
//     return array;
//   }
//   sortItems = (items, column, direction) => {
//     if (direction === "asc") {
//       this.sortArray(items, column);
//     }
//     if (direction === "desc") {
//       this.sortArray(items, column, -1);
//     }
//     return items;
//   };
//   render() {
//     const { comments, responsiblePerson } = this.props;
//     const commentItems = comments
//       ? this.sortItems(comments, "createdAt", "desc")
//       : null;

//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     comments: state.comments.comments,
//   };
// };

// export default connect(mapStateToProps, { fetchComments })(CommentsList);
