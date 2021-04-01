import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventClean } from "./events";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchWithOutToken('auth',  {email, password}, 'POST');
        const body = await processLogin(resp, dispatch);
        if(!body.ok) {
            Swal.fire('Error', body.msg, 'error');
        }
    }
};

export const startRegister = (user) => {
    return async (dispatch) => {
        const resp = await fetchWithOutToken('auth/create', user, 'POST');
        const body = await processLogin(resp, dispatch); 
        if(!body.ok) {
            Swal.fire('Error', body.msg, 'error');
        }
    }
};

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchWithToken('auth/');
        const body = await processLogin(resp, dispatch);
        if(!body.ok) {
            dispatch(ckeckFinish());
        }
    }
};

const processLogin = async (resp, dispatch) => {
    const body = await resp.json();
    if (body.ok) {
        localStorage.setItem('calendar-token', body.token);
        localStorage.setItem('calendar-token-init-date', new Date().getTime());
        dispatch(login(body.user));
    } 
    return body;
}

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch(logout());
        dispatch(eventClean());
    }
};

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

const ckeckFinish = () => ({
    type: types.authCheckingFinish
});

const logout = () => ({
    type: types.authLogout
});