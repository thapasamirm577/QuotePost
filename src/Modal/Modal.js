import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { quoteContext } from '../store/context';

import Button from './Button';
import classes from './Modal.module.css';

const BackDrop = props =>{
    return <div className={classes.backdrop} onClick={props.onConfirm} />

}

const EditModalOverlay = props =>{

    const quoteCtx = useContext(quoteContext);
   
    const [validateAuthor, setValidateAuthor] = useState(false);
    const [validateText, setValidateText] = useState(false);
  
    const [data, setData] = useState({
        id:"",
        author:"",
        text:"", 
    });
  
    const editQuote = quoteCtx.state.find(quote=> quote.id === props.quoteId);
  
    useEffect(()=>{
        setData(prevState=>{
            return {...prevState, ...editQuote} 
        });
    },[editQuote]);
  
    const handleChange = e =>{
        setData(prevState=>{
            return { ...prevState, [e.target.name]: e.target.value}
        })
    }

    function editFormHandler(event) {
        event.preventDefault();
    
        // submit Validation
        if ( data.author.trim().length < 3) {
          setValidateAuthor(true);
          return;
        } else {
          setValidateAuthor(false);
        }
    
        if ( data.text.trim().length < 10) {
          setValidateText(true);
          return;
        } else {
          setValidateText(false);
        }

        quoteCtx.dispatch({ 
            type: "Edit", 
            payload: { id: editQuote.id, data: data } 
        });
        props.onConfirm();

    }

    return (
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <form
            className={classes.form}
            onSubmit={editFormHandler}
          >

            <div className={classes.control}>
              <label htmlFor="author">Author</label>
              <input type="text" id="author" name="author" onChange={handleChange} value={data.author} />
            </div>
            {validateAuthor && (
              <p className={classes.noValidation}>
                Author name is not valid (greater than 3)
              </p>
            )}
            <div className={classes.control}>
              <label htmlFor="text">Text</label>
              <textarea id="text" rows="5" name="text" onChange={handleChange} value={data.text}></textarea>
            </div>
            {validateText && (
              <p className={classes.noValidation}>
                Quote is not valid (greater than 10)
              </p>
            )}

            <div className={classes.actions}>
              <Button type= "submit" className="btn">
                Add Quote
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
}

const EditModal = (props) => {
  return (
    <React.Fragment>
        { ReactDOM.createPortal(
            <BackDrop onConfirm={props.onConfirm} />, 
            document.getElementById("backdrop-root")) 
        }

        {
            ReactDOM.createPortal(
                <EditModalOverlay 
                    title={props.title} 
                    onConfirm={props.onConfirm} 
                    quoteId={props.quoteId}
                />, 
                document.getElementById("modal-root")
            )
        }
    
    </React.Fragment>
  );
};

export default EditModal;

//  -----------------------delete quote section--------------------
const DeleteModalOverlay = props=>{
    const history = useHistory();
    
    const deleteQuoteCtx = useContext(quoteContext);

    const deleteFormHanlder = e =>{
        e.preventDefault();

        deleteQuoteCtx.dispatch({ type: "Delete", payload: props.quoteId});
        props.onConfirm();
        history.push("/quotes");

    }

    return (
        <div className={classes.modal}>
          <header className={classes.header}>
            <h2>{props.title}</h2>
          </header>
          <div className={classes.content}> 
            <p style={{fontSize: "1.3rem"}}>Are you sure to delete?</p>
            <form onSubmit={deleteFormHanlder} className={classes.delete_form}>
                <Button onClick={props.onConfirm}>
                    Cancel
                </Button>
                <button type="submit" className={classes['delete-btn']}>
                    Delete
                </button>
            </form>
          </div>
        </div>
      );

}


export const DeleteModal = props =>{
    return(
        <React.Fragment>
             { ReactDOM.createPortal(
            <BackDrop onConfirm={props.onConfirm} />, 
            document.getElementById("backdrop-root")) 
        }

        {
            ReactDOM.createPortal(
                <DeleteModalOverlay 
                    title={props.title} 
                    onConfirm={props.onConfirm} 
                    quoteId={props.quoteId}
                />, 
                document.getElementById("modal-root")
            )
        }
        </React.Fragment>
    )
}