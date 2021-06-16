import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* connectionsList(action) {
    try {
        const response = yield axios.get(`/api/connections/list/${action.payload}`)
                console.log('The payload is', action.payload)
        yield put({ type: 'SET_CONNECTION_LIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* viewConnectionsSaga() {
    yield takeEvery('FETCH_CONNECTION_LIST', connectionsList);
}

export default viewConnectionsSaga;