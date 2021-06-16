const userListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USERLIST':
            return action.payload;
        default:
            return state;
    }
}

export default userListReducer;