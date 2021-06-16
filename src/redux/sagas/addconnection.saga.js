import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* addConnection(action) {
    try {
        const response = yield axios.post(`/api/connections/add`, action.payload)

        yield put({ type: 'FETCH_CONNECTION_LIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* addConnectionSaga() {
    yield takeEvery('SET_CONNECTION', addConnection);
}

export default addConnectionSaga;