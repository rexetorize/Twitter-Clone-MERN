const SET_AUTH = 'SET_AUTH';
const SET_USER = 'SET_USER';

export const setAuth = (auth) => ({
    type: SET_AUTH,
    payload : auth
});

export const setUser = (user) => ({
    type: SET_USER,
    payload : user
});