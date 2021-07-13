import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} id={comment.id} commenter={comment.commenter} text={comment.commentText} />
      ))}
    </ul>
  );
};

export default CommentsList;
