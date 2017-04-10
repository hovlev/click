import { call, takeLatest, put } from 'redux-saga/effects';
import actions from '../actions';
import 'isomorphic-fetch';

const requestBoard = function* () {
  const json = yield call(() => fetch('/mock/response.json', { method: 'get' })
    .then(res => res.json()));
  yield put({ type: actions.BOARD_LOADED, payload: json });
};

export default function* () {
  yield call(requestBoard);
  yield takeLatest(actions.BOARD_LOAD, function* () {
    yield call(requestBoard);
  });
}
