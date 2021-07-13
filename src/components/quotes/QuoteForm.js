import React, { useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';


import Card from '../UI/Card'
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {

  const [isEntering, setIsEntering] = useState(false);
  const [validateAuthor, setValidateAuthor] = useState(false);
  const [validateText, setValidateText] = useState(false);


  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value.trim();
    const enteredText = textInputRef.current.value.trim();
    const id = Math.random()*Math.pow(10,20);

    // submit Validation
    if( enteredAuthor.length < 3){
      setValidateAuthor(true);
      return;
    }else{
      setValidateAuthor(false)
    }
    if(enteredText.length < 10){
      setValidateText(true);
      return;
    }else{
      setValidateText(false);
    }

    props.onAddQuote({ id: id, author: enteredAuthor, text: enteredText });
    
  }

  const finishEnteringHandler = ()=>{
    setIsEntering(false);
  }

  const formFocusHandler = ()=>{
    setIsEntering(true);
  }

  return (
    <React.Fragment>
      <Prompt
        when={isEntering}
        message={() =>
          "Are you sure you want to leave this page? Your Entire data will lost :("
        }
      />

      <Card>
        <form
          className={classes.form}
          onFocus={formFocusHandler}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          {validateAuthor && (
            <p className={classes.noValidation}>
              Author name must be greater or equal to 3
            </p>
          )}
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          {validateText && (
            <p className={classes.noValidation}>
              Author name must be greater or equal to 10
            </p>
          )}

          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default QuoteForm;
