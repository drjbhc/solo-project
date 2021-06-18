import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* deleteArtifact(action) {
    try {
        const response = yield axios.delete(`/api/artifacts/delete/${action.payload}`)

        yield put({ type: 'FETCH_ARTIFACT_LIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteArtifactSaga() {
    yield takeEvery('DELETE_ARTIFACT', deleteArtifact);
}

export default deleteArtifactSaga;