const connectionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONNECTION_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default connectionReducer;