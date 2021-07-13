import React, { useState } from 'react';
import EditModal, { DeleteModal } from '../../Modal/Modal';
import classes from './HighlightedQuote.module.css';

const HighlightedQuote = (props) => {
  const [edit, setEdit] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(false);

  const handleEditModal=()=>{
    setEdit(false);
  }

  const handleDeleteModal =()=>{
    setDeleteInfo(false);
  }
  
  return (
    <React.Fragment>
      {edit && (
        <EditModal
          title="Edit Quote"
          quoteId={props.id}
          onConfirm={handleEditModal}
        />
      )}
      {deleteInfo && (
        <DeleteModal
          title="Delete Quote"
          quoteId={props.id}
          onConfirm={handleDeleteModal}
        />
      )}

      <figure className={classes.quote}>
        <section className={classes.action}>
          <button onClick={() => setEdit(true)}>
            {" "}
            &#9997; <div className={classes.edit}>Edit</div>
          </button>
          <button onClick={() => setDeleteInfo(true)}>
            {" "}
            &#10006; <div className={classes.delete}>Delete</div>
          </button>
        </section>
        <p>{props.text}</p>
        <div className={classes.figcaption}>
          <span style={{ fontSize: "1.5rem" }}>&#128128;</span> {props.author}
        </div>
      </figure>
    </React.Fragment>
  );
};

export default HighlightedQuote;
