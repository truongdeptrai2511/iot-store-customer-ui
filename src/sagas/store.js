// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from './productReducer'
import productSaga from './productSaga.js';
import cateSaga from './saga.js';
import reducer from './reducer.js';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer,
    category: reducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(productSaga, cateSaga);

export default store;

