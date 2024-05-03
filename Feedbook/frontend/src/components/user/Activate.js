import React, {useState} from 'react'
import { verify } from '../../actions/auth';
import { Navigate, useParams, useNavigate} from 'react-router-dom';
import {CheckCircleOutline} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { useValue } from '../../context/ContextProvider';

const Activate = () => {
  const navigate = useNavigate();
  const {
    dispatch,
  } = useValue();
  const [verified, setVerified] = useState(false);

  const {uid, token} = useParams()

  const verify_account = e => {
    verify(uid, token, dispatch);
    setVerified(true);
  };

  if (verified) {
    return navigate("/")
  }

  return (
  <Dialog open={true}>
    <DialogTitle>
      Please verify your Feedbook account
    </DialogTitle>
    <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<CheckCircleOutline/>} onClick={verify_account}>
            Verify
          </Button>
    </DialogActions>
    </Dialog>
  )
}

export default Activate
