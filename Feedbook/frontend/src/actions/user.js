import uploadFile from '../firebase/uploadFile';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
    dispatch({ type: 'START_LOADING' });
  
    const { file } = updatedFields;

    try {
        const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
        const photoURL = await uploadFile(
          file,
          `profile/${currentUser?.id}/${imageName}`
        );
        const body = { photoURL };
        console.log(body);
        const res = await axios.post('/api/user-profile-update/', {
            photoURL: photoURL,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'X-CSRFToken': csrfToken,
              
            }
          });
        console.log(res);

      if (res) {
        dispatch({ type: 'UPDATE_USER', payload: { ...currentUser, ...res.data } });
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'success',
            message: 'Your profile has been updated successfully',
          },
        });
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: { open: false, file: null, photoURL: res.data.photoURL },
        });
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: error.message,
        },
      });
      console.log(error);
    }
  
    dispatch({ type: 'END_LOADING' });
  };
