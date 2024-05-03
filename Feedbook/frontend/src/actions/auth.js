import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const load_user = async (dispatch) => {
    if (localStorage.getItem('access')) {
        console.log("here2");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 
        
        console.log(config);
        try {
            console.log("here");
            const res = await axios.get('/auth/users/me/', config);
            console.log(res)
            dispatch({
                type: "USER_LOADED_SUCCESS",
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: "USER_LOADED_FAIL"
            });
        }
    } else {
        dispatch({
            type: "USER_LOADED_FAIL"
        });
    }
};

export const login = async(email, password, dispatch)  => {
    dispatch({type: "START_LOADING"})
    console.log(email+password);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {

        const res = await axios.post('auth/jwt/create/', body, config);
        console.log(res);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });

        dispatch({
            type: "CLOSE_LOGIN"
        });
        console.log("hi2")
        localStorage.setItem('access', res.data.access);
        console.log("hi4")
        localStorage.setItem('refresh', res.data.refresh);
        console.log("hi3")
        load_user(dispatch);
        console.log("hi")
    } catch (err) {
        dispatch({
            type: "LOGIN_FAIL"
        })

        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'error',
                message: 'No matched credentials, please check your email and password or sign up first',
              },
        })
    }
    dispatch({type: "END_LOADING"})
};

export const signup = async (first_name, last_name, email, password, re_password, dispatch) => {
    console.log("signup")
    dispatch({type: "START_LOADING"})
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post('/auth/users/', body, config);
        console.log(res)

        dispatch({
            type: 'SIGNUP_SUCCESS',
            payload: res.data
        });
        dispatch({type: "END_LOADING"})
        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'info',
                message: 'Sign up success! Please check your email to verify your account',
              },
        })
    } catch (err) {
        dispatch({
            type: 'SIGNUP_FAIL'
        })
        dispatch({type: "END_LOADING"})
        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'error',
                message: 'Sign up failed, please log in if you have an existing account or contact TweeTails for assistance',
              },
        })
    }
};

export const verify = async (uid, token, dispatch)  => {
    dispatch({type: "START_LOADING"})
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post('/auth/users/activation/', body, config);

        dispatch({
            type: 'ACTIVATION_SUCCESS',
        });
        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'info',
                message: 'Verification success!',
              },
        })
        dispatch({type: "END_LOADING"})
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'ACTIVATION_FAIL'
        })
        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'error',
                message: 'Verification failed :( Please try again',
              },
        })
    }
};

export const checkAuthenticated = async(dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post('/auth/jwt/verify/', body, config)
            console.log(res)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: 'AUTHENTICATED_SUCCESS'
                });
            } else {
                dispatch({
                    type: 'AUTHENTICATED_FAIL'
                });
            }
        } catch (err) {
            dispatch({
                type: 'AUTHENTICATED_FAIL'
            });
        }

    } else {
        dispatch({
            type: 'AUTHENTICATED_FAIL'
        });
    }
};

export const logout = (dispatch) => {
    dispatch({
        type: 'LOGOUT'
    });
};