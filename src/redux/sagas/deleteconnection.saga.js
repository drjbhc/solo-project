import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* deleteConnection(action) {
    try {
        const response = yield axios.delete(`/api/connections/delete/${action.payload}`)

        yield put({ type: 'FETCH_CONNECTION_LIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteConnectionSaga() {
    yield takeEvery('DELETE_CONNECTION', deleteConnection);
}

export default deleteConnectionSaga;