import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* banMember(action) {
    try {
        console.log(action.payload);

        console.log('the payload is', action.payload);
        const response = yield axios.put(`/api/user/ban/${action.payload}`)

        yield put({ type: 'FETCH_USERLIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* banSaga() {
    yield takeEvery('BAN_MEMBER',banMember);
}

export default banSaga;