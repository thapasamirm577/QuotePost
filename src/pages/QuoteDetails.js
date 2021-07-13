import React, { Fragment, lazy, useContext } from 'react';
import { useParams, Route, useHistory, Link, useRouteMatch } from 'react-router-dom';

const Comments = lazy(()=> import('../components/comments/Comments'));
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import { quoteContext } from '../store/context';

const DUMMY_QOUTES = [
    {id: "q1", author: "John", text: "Oh!! It's really fun"},
    {id: "q2", author: "Doe", text: "Nice to meet you"},
    {id: "q3", author: "Wangshi", text: "Is not it really fun?"},
    {id: "q4", author: "Kim", text: "Ohh yeah it's really!!"},
    {id: "q5", author: "Banku", text: "Thank you for your fun"},
];

const QuoteDetails = () => {
    const params = useParams();
    const history = useHistory();
    const match = useRouteMatch();

    const quoteCtx = useContext(quoteContext);
    
    const quote = quoteCtx.state.find((quote) => { 
        return quote.id.toString() === params.quoteId
      }
    );

    if(!quote){
      return <p>No Quote found</p>
    }

    return (
      <Fragment>
        <HighlightedQuote id={quote.id} text={quote.text} author={quote.author} />
        <Route path={match.path} exact>
            <div className="centered">
                <Link
                  to={`${match.url}/comments`}
                  className="btn--flat"
                >
                  Load Comment
                </Link>
            </div>
        </Route>
        <span style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
          {" "}
          &#8617; Back
        </span>

        <Route path={`${match.path}/comments`} exact>
          <Comments quoteId = {params.quoteId} />
        </Route>
      </Fragment>
    );
}

export default React.memo(QuoteDetails);
