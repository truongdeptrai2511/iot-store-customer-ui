
const initialState = {
    category: [],
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CATEGORY_RECEIVED':
        return { ...state, category: action.payload, error: null };
      case 'CATEGORY_FAILED':
        return { ...state, category: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;
  