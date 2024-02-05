const initalState = {
    isAuthenticated: false,
    user: null
}

const authReducer = (state = initalState, action) => {

    switch (action.type) {
        case 'SET_AUTH':
           
            return {
                ...state,
                isAuthenticated: action.payload
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
            
        default:
            return state;
    }
}

export default authReducer;