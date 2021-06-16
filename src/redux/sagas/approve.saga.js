import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* approveMember(action) {
    try {
        console.log(action.payload);
        const response = yield axios.put(`/api/user/publish/${action.payload}`)

        yield put({ type: 'FETCH_USERLIST'})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* approveSaga() {
    yield takeEvery('APPROVE_MEMBER', approveMember);
}

export default approveSaga;