// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from './productReducer'
import productSaga from './productSaga.js';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(productSaga);

export default store;

