import userReducer from './user';
import {combineReducers} from 'redux';
import cardReducer from './cart'

export default combineReducers({
    user: userReducer,
    cart: cardReducer
})