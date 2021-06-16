import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* userList(action) {
    try {
        const response = yield axios.get('/api/user/userlist')
        yield put({ type: 'SET_USERLIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* adminListSaga() {
    yield takeEvery('FETCH_USERLIST', userList);
}

export default adminListSaga;