export const initialState = [
    {id: "q1", author: "John", text: "Hello, Welcome to Quote Section"},
   
];

const quoteReducer = (state,action)=>{
    switch (action.type) {
        
        case "Add":
            return [ ...state, action.payload ];
        
        case "Edit":
            const newQuote = [ ...state];
            const editQuoteId = action.payload.id;
            const editQuoteIndex = newQuote.findIndex(quote=> quote.id === editQuoteId);
            newQuote.splice(editQuoteIndex, 1, action.payload.data);

            return newQuote;
        
        case "Delete":
            const DeleteQuote = [ ...state];
            const finalDQuote = DeleteQuote.filter(quote=> quote.id !== action.payload);

            return finalDQuote;

        default:
            return state;
    }
}

export default quoteReducer;

export const commentInitialState = [];

export const commentReducer = (state, action)=>{
    switch (action.type) {
        case "addComment":
            
            return [ ...state, action.payload];
        case "deleteComment":
            const newComment = [ ...state];
            const remainComment = newComment.filter(comment=> comment.id !== action.payload);
            return remainComment;
    
        default:
            return state;
    }

}