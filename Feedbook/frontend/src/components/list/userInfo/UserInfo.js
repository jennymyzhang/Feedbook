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
          <h3 className='username'> {currentUser?.first_name + " " + currentUser?.last_name}</h3>
        </div>
        <IconButton
                sx={{ color: 'white' }}
              onClick={addPage}
              >
                <Add sx={{ fontSize: '2rem' }} />
              </IconButton>
    </div>
  )
} 

export default UserInfo
