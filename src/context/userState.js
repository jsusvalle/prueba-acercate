import React, { useReducer } from 'react'

import UserContext from './userContext';
import UserReducer from './userReducer';

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

import clienteAxios from '../config/configAxios';

const UserState = props => {
    const initialState = {
        userInfo: {},
        pedidos: [],
        error: '',
        loading: false,
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const postLoginUser = async (email, password) => {
        try {
            dispatch({ type: LOGIN_REQUEST });

            const {data} = await clienteAxios.post('/login', {usuario: email, clave: password});

            console.log(data.defaultBusiness)

            dispatch({ type: LOGIN_SUCCESS,
                    payload: data
            });

        } catch (error) {
            dispatch({ type: LOGIN_ERROR,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
            });
        }
    }

    const refreshToken = async () => {
        const refresh_token = localStorage.getItem('token');

        try {
            dispatch({ type: REFRESH_TOKEN_REQUEST })

            const {token} = await clienteAxios.put(`/refrescarToken`, {refresh_token, grant_type: refresh_token });

            console.log(token)

            dispatch({ type: REFRESH_TOKEN_SUCCESS,
                payload: token
            });

        } catch (error) {
            dispatch({ type: REFRESH_TOKEN_ERROR,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
            });
        }
    }

    const getPedidos = async (cod_empresa) => {
        try {
            dispatch({ type: SEE_INFO_REQUEST });

            const {data} = await clienteAxios.get(`/listarPedidosEmpresa/${cod_empresa}`);

            dispatch({ type: SEE_INFO_SUCCESS,
                    payload: data.data
            });

        } catch (error) {
            if(error.response.status === '400') {
                refreshToken()
                return;
            }
            dispatch({ type: SEE_INFO_ERROR,
                payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
            });
        }
    }

    return (
        <UserContext.Provider
            value={{
                userInfo: state.userInfo,
                pedidos: state.pedidos,
                loading: state.loading,
                error: state.error,
                successAuth: state.successAuth,
                postLoginUser,
                getPedidos,
                refreshToken
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;