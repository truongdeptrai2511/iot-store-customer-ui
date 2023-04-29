// src/sagas/productSaga.js
import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProducts() {
  try {
    const response = yield axios.get('https://localhost:7199/api/Product');
    yield put({ type: 'PRODUCTS_RECEIVED', payload: response.data.Result });
    console.log(response.data);
  } catch (error) {
    yield put({ type: 'PRODUCTS_FAILED', payload: error });
  }
}
function* actionWatcher() {
  yield takeLatest('GET_PRODUCTS', fetchProducts);
}

export default function* productSaga() {
  yield all([actionWatcher()]);
}
