import React from 'react'
import './chatlist.css'
import { IconButton } from '@mui/material'
import { Add } from '@mui/icons-material'
import UserIcons from '../../user/UserIcons'
import { useValue } from '../../../context/ContextProvider'
import { useEffect } from 'react'
import { getMessages } from '../../../actions/chat'

const Chatlist = () => {
  const {
    state: { allMessages, openChat, currentUser},
    dispatch,
  } = useValue();

  useEffect(() => {
    getMessages(dispatch, currentUser?.id);
  }, [currentUser]);

  useEffect(() => {
  }, [openChat]);

  if (!Array.isArray(allMessages)) {
    return <div>Loading...</div>; // Or any other placeholder or loading indicator
  }

  return (
    <div className='chatlist'>
      {allMessages?.map((message, index) => (
        <div className={`item ${openChat === message.id ? 'active' : ''}`} key={message.id} onClick={() => dispatch({ type: 'UPDATE_OPENCHAT', payload: message.id})}>
          <div className='texts'>
            <span>Feedbook @ Page {allMessages?.length - index}</span>
            <p>{new Date(message.created_at).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chatlist
