import { put, takeLatest, all, call } from 'redux-saga/effects';
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

function* fetchOrder(action) {
  try {
    console.log(action.payload);
    const response = yield axios.post('https://localhost:7199/api/order', action.payload, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }
    );
    console.log(response.data);
    yield put({ type: 'ORDER_RECEIVED', payload: response.data.Result });
    alert(response.data.Message);
  } catch (error) {
    yield put({ type: 'ORDER_FAILED', payload: error });
    console.log(error); // log the error message for troubleshooting
  }
}

function* fetchGetOrder() {
  try {
    const response = yield axios.get('https://localhost:7199/api/order', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    console.log(response.data);
    yield put({ type: 'GET_ORDER_RECEIVED', payload: response.data.Result });
    alert(response.data.Message);
  } catch (error) {
    yield put({ type: 'GET_ORDER_FAILED', payload: error });
    console.log(error); // log the error message for troubleshooting
  }
}

function* delOrder(action) {
  try {
    const response = yield axios.delete(`https://localhost:7199/api/order/${action.payload.Id}/${action.payload.OrderId}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    console.log(response.data);
    yield put({ type: 'DELETE_ORDER_SUCCESS', payload: action.payload });
    yield fetchGetOrder();
  } catch (error) {
    yield put({ type: 'DELETE_ORDER_FAILED', payload: error });
    console.log(error); // log the error message for troubleshooting
  }
}

// -----------------------------------------------------------------------------
function* categoryWatcher() {
  yield takeLatest('GET_CATEGORY', fetchCategory);
}

function* orderWatcher() {
  yield takeLatest('GET_ORDER', fetchOrder);
}

function* getOrderWatcher() {
  yield takeLatest('GET_ORDER_LIST', fetchGetOrder);
}

function* delOrderWatcher() {
  yield takeLatest('DELETE_ORDER_ITEM', delOrder);
}

export default function* rootSaga() {
  yield all([categoryWatcher(), orderWatcher(), getOrderWatcher(), delOrderWatcher()]);
}
