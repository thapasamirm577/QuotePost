import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import { quoteContext } from '../store/context';

const NewQuote = () => {
    const history = useHistory();
    const quoteCtx = useContext(quoteContext);
     
    const addQuoteHandler = quoteData =>{
        console.log(quoteData);

        quoteCtx.dispatch( {type: "Add", payload: quoteData});
        history.push('/quotes')

    }
    return <QuoteForm onAddQuote={addQuoteHandler} />
}

export default NewQuote
