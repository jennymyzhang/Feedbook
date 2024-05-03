import React, { useEffect } from 'react'
import './chat.css'
import UserIcons from '../user/UserIcons'
import { Avatar } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import { createMessage } from '../../actions/chat'
import { useState } from 'react'

function removeExtraSpaces(text) {
  return text.replace(/ +/g, ' ')       // Replace multiple spaces with a single space
             .replace(/ ([\n\r])/g, '$1') // Remove space before new lines
             .replace(/([\n\r]) /g, '$1'); // Remove space after new lines
}


const getTimeDifference = (createdAt) => {
  const currentTime = new Date();
  const messageTime = new Date(createdAt);
  const differenceInSeconds = Math.floor((currentTime - messageTime) / 1000);
  
  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else {
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
};


const Chat = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  
  const {
    state: { profile, currentUser, openChat, allMessages}, dispatch
  } = useValue();

  useEffect(()=>{}, [currentUser, allMessages, openChat])

  if (!Array.isArray(allMessages)) {
    return <div>Loading...</div>; // Or any other placeholder or loading indicator
  }

  const chat = allMessages.find(c => c.id === openChat);


  const handleSubmit = (e) =>{
    console.log("hiiiiii" + openChat + inputValue)
    createMessage(dispatch, currentUser?.id, openChat, inputValue)

  }

  return (
    <div className='chat'>
      <div className='top'>
        <div className="user">
          <div className="texts">
            <span> Feedbook </span>
            <p> feed and book </p>
          </div>
        </div>
      </div>
      <div className='center'>
     
        {chat?.messages?.map((message) => (
        <>
          <div className={'message own'}>
            <div className='texts'>
              <pre>{removeExtraSpaces(message.message)}</pre>
              <span>{getTimeDifference(message.created_at)}</span>
            </div>
            <Avatar src={currentUser?.photoURL} />
          </div>
          <div className={'message'} >
            <Avatar src={currentUser?.photoURL} />
            <div className='texts'>
              <pre>{removeExtraSpaces(message.response)}</pre>
              <span>{getTimeDifference(message.created_at)}</span>
            </div>
          </div>
        </> 
        ))}
      </div>


      <div className='bottom'>
      <div className= {!openChat ? "inputWrapper" : "inputWrapperNotDisabled"} title={!openChat ? "Please create a new chat first using the button on the top left" : ""}>
        <input type="text" disabled={!openChat} placeholder='Type a message...' onChange={handleChange}  title="Please create a new chat first using the button on the top left"/>
        </div>
        <button className="sendButton" disabled={!openChat} onClick ={handleSubmit} title="Please create a new chat first using the button on the top left"> Send</button>
      </div>
    </div>
  )
}

export default Chat
