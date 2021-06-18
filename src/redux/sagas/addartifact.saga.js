import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* addArtifacts(action) {
    try {
        console.log(action.payload);
        const response = yield axios.post(`/api/artifacts/add`, action.payload)

        yield put({ type: 'FETCH_ARTIFACT_LIST', payload: response.data}) // Need to set payload to userID
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* addArtifactsSaga() {
    yield takeEvery('SET_ARTIFACT', addArtifacts);
}

export default addArtifactsSaga;