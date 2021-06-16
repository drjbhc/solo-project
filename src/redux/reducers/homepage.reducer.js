const homeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOMELIST':
            return action.payload;
        default:
            return state;
    }
}

export default homeReducer;