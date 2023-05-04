const initialState = {
  category: [],
  error: null,
  order: [],
  getOrder: [],
};


const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORY_RECEIVED':
      return { ...state, category: action.payload, error: null };
    case 'CATEGORY_FAILED':
      return { ...state, category: [], error: action.payload };
    default:
      return state;
  }
};

const orderReducer = (state = initialState.order, action) => {
  switch (action.type) {
    case 'ORDER_RECEIVED':
      return { ...state, order: action.payload, error: null };
    case 'ORDER_FAILED':
      return { ...state, order: [], error: action.payload };
    default:
      return state;
  }
};

const getOrderReducer = (state = initialState.getOrder, action) => {
  switch (action.type) {
    case 'GET_ORDER_RECEIVED':
      return { ...state, getOrder: action.payload, error: null };
    case 'GET_ORDER_FAILED':
      return { ...state, getOrder: [], error: action.payload };
    default:
      return state;
  }
};

const deleteOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_ORDER_SUCCESS':
      const updatedOrders = state.order.filter(o => o.Id !== action.payload);
      return { ...state, order: updatedOrders, error: null };
    case 'DELETE_ORDER_FAILED':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export { categoryReducer, orderReducer, getOrderReducer, deleteOrderReducer };
