import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* homepageList(action) {
    try {
        const response = yield axios.get('/api/user/homepage')
        yield put({ type: 'SET_HOMELIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* homeSaga() {
    yield takeEvery('FETCH_HOMELIST', homepageList);
}

export default homeSaga;