// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from './productReducer'
import productSaga from './productSaga.js';
import rootSaga from './saga.js';
import { categoryReducer, orderReducer, getOrderReducer, deleteOrderReducer } from './reducer.js';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
    getOrder: getOrderReducer,
    delOrder: deleteOrderReducer
  },
  middleware: [sagaMiddleware]
});
sagaMiddleware.run(productSaga);
sagaMiddleware.run(rootSaga);

export default store;

