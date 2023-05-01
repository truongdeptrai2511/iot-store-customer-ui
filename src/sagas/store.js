// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from './productReducer'
import productSaga from './productSaga.js';
import cateSaga from './saga.js';
import categoryReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(productSaga);
sagaMiddleware.run(cateSaga);

export default store;

