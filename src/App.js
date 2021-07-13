import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import QuoteProvider from './store/context';

const NewQuote = lazy(()=> import('./pages/NewQuote'));
const AllQuotes = lazy(()=> import('./pages/AllQuotes'));
const QuoteDetails = lazy(()=> import('./pages/QuoteDetails'));
const PageNotFound = lazy(()=> import('./pages/PageNotFound'));


function App() {
  return (
    <QuoteProvider>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>

            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>

            <Route path="/quotes/:quoteId">
              <QuoteDetails />
            </Route>

            <Route path="/new-quote" exact>
              <NewQuote />
            </Route>
            
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </QuoteProvider>
  );
}

export default App;

