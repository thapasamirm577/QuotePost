import { useContext } from 'react';
import { commentContext } from '../../store/context';
import classes from './CommentItem.module.css';

const CommentItem = (props) => {

  const commentCtx = useContext(commentContext);

  return (
    <li className={classes.item}>
      <div>
        <strong>&#128128; {props.commenter}</strong>
        <button
          onClick={()=>commentCtx.dispatch1({
            type: "deleteComment",
            payload: props.id,
          })}
          className={classes.delete__comment}
        >
          {" "}
          &#10006; <div className={classes.delete}>Delete</div>
        </button>
      </div>
      <p>-{props.text}</p>
    </li>
  );
};

export default CommentItem;
