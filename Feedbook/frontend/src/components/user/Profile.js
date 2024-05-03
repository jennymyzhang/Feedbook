import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
  } from '@mui/material';
  import { Close, Send } from '@mui/icons-material';
  import { useValue } from '../../context/ContextProvider';
  import { useRef } from 'react';
  import { updateProfile } from '../../actions/user';
  import React from 'react';
  
  const Profile = () => {
    const {
      state: { profile, currentUser },
      dispatch,
    } = useValue();
    const nameRef = useRef();
  
    const handleClose = () => {
      dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, open: false } });
    };
  
    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const photoURL = URL.createObjectURL(file);
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: { ...profile, file, photoURL },
        });
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      updateProfile(currentUser, { file: profile.file }, dispatch);
    };
    return (
      <Dialog open={profile.open} onClose={handleClose}>
        <DialogTitle>
          Profile
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <DialogContentText>
              Update your profile picture by clicking the icon below:
            </DialogContentText>

            <label htmlFor="profilePhoto">
              <input
                accept="image/*"
                id="profilePhoto"
                type="file"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              <Avatar
                src={profile.photoURL ?  profile.photoURL : 'https://firebasestorage.googleapis.com/v0/b/feedbook-90764.appspot.com/o/unknown.jpeg?alt=media&token=a9d0bdc7-fc56-45ae-938d-0a71001adf7b'}
                sx={{ width: 100, height: 100, cursor: 'pointer' }}
              />
            </label>
          </DialogContent>
          <DialogActions sx={{ px: '19px' }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  
  export default Profile;