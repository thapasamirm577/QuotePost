import { useContext, useState } from 'react';


import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { commentContext } from '../../store/context';
import CommentsList from './CommentsList';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const commentCtx = useContext(commentContext);
  
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  const addComment = comment =>{
    commentCtx.dispatch1({ type: "addComment", payload: comment});

  }  

  const comment = commentCtx.state1.filter(commnet => commnet.quoteId === props.quoteId);
  
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {/* Comments here */}
      { comment && <CommentsList comments={comment} /> }

      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}

      {isAddingComment && (
        <NewCommentForm onAddComment={addComment} onIsAddingComment={setIsAddingComment} quoteId={props.quoteId} />
      )}

    </section>
  );
};

export default Comments;
