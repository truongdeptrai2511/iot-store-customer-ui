// src/reducers/productReducer.js

const initialState = {
    products: [],
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PRODUCTS_RECEIVED':
        return { ...state, products: action.payload, error: null };
      case 'PRODUCTS_FAILED':
        return { ...state, products: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default productReducer;
  