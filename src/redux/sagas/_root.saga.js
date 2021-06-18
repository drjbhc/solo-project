import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

import homeSaga from './homepage.saga';
import viewArtifactsSaga from './viewartifacts.saga';
import connectionSaga from './connections.saga';
import addArtifactsSaga from './addartifact.saga';
import addConnectionSaga from './addconnection.saga';
import adminListSaga from './adminlist.saga';
import publishSaga from './publish.saga';
import approveSaga from './approve.saga';
import banSaga from './ban.saga';


export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    homeSaga(),
    viewArtifactsSaga(),
    connectionSaga(),
    addArtifactsSaga(),
    addConnectionSaga(),
    adminListSaga(),
    publishSaga(),
    approveSaga(),
    banSaga(),
  ]);
}
