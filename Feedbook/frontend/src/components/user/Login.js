import React, { useCallback } from 'react';
import { Close, PasswordOutlined, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import PasswordField from './PasswordField';
import { login, signup } from '../../actions/auth'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    state: { openLogin, isAuthenticated, },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef();
  const [accountCreated, setAccountCreated] = useState(false);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
    setIsRegister(false);
  };
  
  const handleClick = () => {
    setIsRegister(!isRegister)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email+password);
    if (!isRegister) {
      login(email, password, dispatch);
      if (isAuthenticated) {
        const navigate = useNavigate();
        navigate('/home')
    }
    } else {
      const confirmPassword = confirmPasswordRef.current.value;
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      if (password !== confirmPassword) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'error',
            message: 'Passwords do not match',
          },
        });
      }
        console.log("here")
        signup(firstName, lastName, email, password, confirmPassword,dispatch)
        setAccountCreated(true);
      if (accountCreated) {
        dispatch({ type: 'OPEN_LOGIN' })
        setIsRegister(false)
      }
    }
  };

  useEffect(() => {
    isRegister ? setTitle('Sign Up') : setTitle('Log In');
  }, [isRegister]);

  return (
    <Dialog open={true}>
      <DialogTitle>
        {title}
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
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus={isRegister}
              margin="normal"
              variant="standard"
              id="firstname"
              label="First Name"
              type="text"
              fullWidth
              inputRef={firstNameRef}
              inputProps={{ minLength: 2 }}
              required
            />)
          }
          {isRegister && (
            <TextField
            margin="normal"
            variant="standard"
            id="lastname"
            label="Last Name"
            type="text"
            fullWidth
            inputRef={lastNameRef}
            inputProps={{ minLength: 2 }}
            required
          />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Already have an account?'
          : "Don't have an account?"}
        <Button onClick={handleClick}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;