import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* artifactsList(action) {
    try {
        const response = yield axios.get(`/api/artifacts/list/${action.payload}`)
        yield put({ type: 'SET_ARTIFACT_LIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* viewArtifactsSaga() {
    yield takeEvery('FETCH_ARTIFACT_LIST', artifactsList);
}

export default viewArtifactsSaga;