import React from 'react'
import Login from '../components/user/Login'
import Chat from '../components/chat/Chat.js';
import List from '../components/list/List.js';
import { checkAuthenticated, load_user } from '../actions/auth.js';
import { useValue } from '../context/ContextProvider';
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    checkAuthenticated(dispatch);
    load_user(dispatch);
  }, []);

  const {
    state: {isAuthenticated, },
  } = useValue();
const {dispatch} = useValue()
  return (
    <>
      <List/>
      <Chat/>
    </>

  )
}

export default Home
