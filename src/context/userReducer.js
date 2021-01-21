import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SEE_INFO_REQUEST,
    SEE_INFO_SUCCESS,
    SEE_INFO_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_ERROR,
    REFRESH_TOKEN_SUCCESS
} from '../types';

const UserReducer = (state, action) => {
    switch(action.type) {
        case LOGIN_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token); 
            return {
                ...state,
                userInfo: action.payload.defaultBusiness,
                loading: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case SEE_INFO_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case SEE_INFO_SUCCESS:
            return {
                ...state,
                pedidos: action.payload,
                loading: false,
            }
        case SEE_INFO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case REFRESH_TOKEN_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case REFRESH_TOKEN_SUCCESS:
        localStorage.setItem('token', action.payload); 
            return {
                ...state,
                loading: false,
            }
        case REFRESH_TOKEN_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default: 
            return state;
    }
}

export default UserReducer;