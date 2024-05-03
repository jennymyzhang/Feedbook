import React from "react";
import axios from "axios";

export const getMessages = async(dispatch, id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    try {
        const result = await axios.get(`/api/chats/${id}/`, config);
        if (result) {
            dispatch({ type: 'UPDATE_MESSAGES', payload: result.data });
        }
    } catch (err) {
      console.log(err)
    }
}

export const createMessage = async (dispatch, userid, chatid, message) => {
    dispatch({type: "WAIT_RESPONSE", payload: true})
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const body = JSON.stringify({
        user_id: userid,
        chat_id: chatid,
        message: message
    })
    try {
        const result = await axios.post(`/api/create-message/`, body, config,);
        if (result) {
            dispatch({ type: 'UPDATE_MESSAGES', payload: result.data });
        } else {
            dispatch({ 
                type: 'UPDATE_ALERT',
                payload: {
                    open: true,
                    severity: 'error',
                    message: 'Sorry, we are unable to process your request right now, please try again later :(',
                },})
        }
        dispatch({type: "WAIT_RESPONSE", payload: false})
    } catch (err) {
        dispatch({ type: 'END_LOADING'})
        dispatch({ 
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: 'Sorry, we are unable to process your request right now, please try again later :(',
            },})
      console.log(err)
    }
}

export const createChat = async(dispatch, userid) => {
    dispatch({ type: 'START_LOADING'})
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const body = JSON.stringify({
        user_id: userid,
    })
    console.log(body)
    try {
        const result = await axios.post(`/api/create-chat/`, body, config,);
        if (result) {
            const { chat_id, chats } = result.data;
            dispatch({ type: 'UPDATE_MESSAGES', payload: chats });
            dispatch({ type: 'UPDATE_OPENCHAT', payload: chat_id });
        }
        dispatch({ type: 'END_LOADING'})
    } catch (err) {
        dispatch({ type: 'END_LOADING'})
        dispatch({ 
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: 'Sorry, we are unable to process your request right now, please try again later :(',
            },})
      console.log(err)
    }
}