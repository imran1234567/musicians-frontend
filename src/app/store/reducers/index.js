import {combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {wishReducer} from './wishReducer'
export default combineReducers({
    cart: cartReducer,
    wish: wishReducer
}); 

