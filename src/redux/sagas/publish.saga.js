import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* publishTable(action) {
    try {
        console.log(action.payload);
        const response = yield axios.put(`/api/user/publish`)

        yield put({ type: 'FETCH_HOMELIST'})
        yield put({ type: 'FETCH_USER' });
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* publishSaga() {
    yield takeEvery('PUBLISH_TABLE', publishTable);
}

export default publishSaga;