import React from 'react'
import './userInfo.css'
import { Avatar, IconButton} from '@mui/material';
import { Add } from '@mui/icons-material'
import UserIcons from '../../user/UserIcons'
import { useValue } from '../../../context/ContextProvider';
import { createChat } from '../../../actions/chat';
const UserInfo = () => {
  const {
    state: { currentUser},
    dispatch
  } = useValue();

  const addPage= () => {
    createChat(dispatch, currentUser?.id)
  }

  return (
    <div className='userInfo'>
        <div className='user'>
        <UserIcons/>
          <h2> {currentUser?.first_name + " " + currentUser?.last_name}</h2>
        </div>
        <IconButton
                sx={{ color: 'white' }}
              onClick={addPage}
              >
                <Add />
              </IconButton>
    </div>
  )
} 

export default UserInfo
