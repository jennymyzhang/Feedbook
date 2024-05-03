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

export const createMessage = async(dispatch, userid, chatid, message) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    console.log("h333")
    const body = JSON.stringify({
        user_id: userid,
        chat_id: chatid,
        message: message
    })
    console.log(body)
    try {
        const result = await axios.post(`/api/create-message/`, body, config,);
        if (result) {
            dispatch({ type: 'UPDATE_MESSAGES', payload: result.data });
        }
    } catch (err) {
      console.log(err)
    }
}

export const createChat = async(dispatch, userid) => {
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
    } catch (err) {
      console.log(err)
    }
}