import {createStore} from 'redux';
import authReducer from './AuthReducer';


const authStore = createStore(authReducer);

export default authStore;