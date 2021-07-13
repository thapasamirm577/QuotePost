import React, { useContext } from 'react'

import QuoteList from '../components/quotes/QuoteList';
import { quoteContext } from '../store/context';

const DUMMY_QOUTES = [
    {id: "q1", author: "John", text: "Oh!! It's really fun"},
    {id: "q2", author: "Doe", text: "Nice to meet you"},
    {id: "q3", author: "Wangshi", text: "Is not it really fun?"},
    {id: "q4", author: "Kim", text: "Ohh yeah it's really!!"},
    {id: "q5", author: "Banku", text: "Thank you for your fun"},
];

const AllQuotes = () => {
    const quoteCtx = useContext(quoteContext);

    return <QuoteList quotes = {quoteCtx.state} />
}

export default AllQuotes
