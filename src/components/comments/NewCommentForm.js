import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const commenterRef = useRef();

  const [validateCommenter, setValidateCommenter] = useState(false);
  const [validateCommentText, setValidateCommentText] = useState(false);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // send comment
    const commenter = commenterRef.current.value.trim();
    const commentText = commentTextRef.current.value.trim();

    //submit validation
    if( commenter.length < 3){
      setValidateCommenter(true);
      return;
    }else{
      setValidateCommenter(false);
    }

    if( !commentText ){
      setValidateCommentText(true);
      return;
    }else{
      setValidateCommentText(false);
    }

    const comment = { 
      id: Date.now(), 
      quoteId: props.quoteId, 
      commenter: commenter, 
      commentText: commentText,
    }
    props.onAddComment(comment);

    props.onIsAddingComment(false);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="commenter">Your Name</label>
        <input type="text" name="commenter" ref={commenterRef} />
        {validateCommenter && (
          <p className={classes.noValidation}>
            Name must be greater or equal to 3
          </p>
        )}

        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
        {validateCommentText && (
          <p className={classes.noValidation}>Comment should not be empty</p>
        )}
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
