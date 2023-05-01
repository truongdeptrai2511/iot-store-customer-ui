import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCategory() {
  try {
    const response = yield axios.get('https://localhost:7199/api/Category');
    yield put({ type: 'CATEGORY_RECEIVED', payload: response.data.Result });
    console.log(response.data);
  } catch (error) {
    yield put({ type: 'CATEGORY_FAILED', payload: error });
  }
}
function* actionWatcher() {
  yield takeLatest('GET_CATEGORY', fetchCategory);
}

export default function* cateSaga() {
  yield all([actionWatcher()]);
}
