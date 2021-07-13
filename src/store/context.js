import { createContext, useReducer } from "react";

import quoteReducer, { commentInitialState, commentReducer, initialState } from './reducer';

export const quoteContext = createContext({
    state: [],
    dispatch: ()=>{},
});

export const commentContext = createContext({
    state1: [],
    dispatch1: ()=>{},
})


const QuoteProvider = (props)=>{

    const [state, dispatch] = useReducer(quoteReducer, initialState);
    const [state1, dispatch1] = useReducer(commentReducer, commentInitialState);

    return (
        <quoteContext.Provider value={{ state, dispatch }}>
            <commentContext.Provider value = {{ state1, dispatch1 }}>
                {props.children}
            </commentContext.Provider>
        </quoteContext.Provider>
    )

}

export default QuoteProvider;
