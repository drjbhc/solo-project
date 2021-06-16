const artifactReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ARTIFACT_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default artifactReducer;