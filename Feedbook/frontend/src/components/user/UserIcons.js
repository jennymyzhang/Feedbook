import { Mail, Notifications } from '@mui/icons-material';
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import UserMenu from './UserMenu';

const UserIcons = () => {
  const {
    state: { currentUser },
  } = useValue();

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    <Box>
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={currentUser?.photoURL ? currentUser?.photoURL: 'https://firebasestorage.googleapis.com/v0/b/feedbook-90764.appspot.com/o/unknown.jpeg?alt=media&token=a9d0bdc7-fc56-45ae-938d-0a71001adf7b'} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  );
};

export default UserIcons;