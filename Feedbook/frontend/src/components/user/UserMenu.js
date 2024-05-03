import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';
import { logout } from '../../actions/auth';
import Profile from './Profile';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
         
          <MenuItem
            onClick={() =>
              dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        
        <MenuItem
          onClick={() => {logout(dispatch)}}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;