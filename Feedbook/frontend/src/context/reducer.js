const reducer = (state, action) => {
  console.log("reducer")
  console.log(state)
  console.log(action.type)
  console.log(action.payload)
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload };

    case 'LOGIN_SUCCESS':
      return { 
        ...state,
        isAuthenticated: true,
        access: action.payload.access,
        refresh: action.payload.refresh};
    
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticated: false};
          
    case 'USER_LOADED_SUCCESS':
      return {...state, currentUser: action.payload}

    case 'SIGNUP_SUCCESS':
        return {
            ...state,
            isAuthenticated: false
        }
    case 'AUTHENTICATED_FAIL':
        return {
            ...state,
            isAuthenticated: false
        }
    case 'USER_LOADED_FAIL':
        return {
            ...state,
            user: null
        }
    case 'LOGIN_FAIL':
    case 'SIGNUP_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
          ...state,
          access: null,
          refresh: null,
          isAuthenticated: false,
          currentUser: null
    }
    case 'ACTIVATION_FAIL':
    case 'ACTIVATION_SUCCESS':
      return {
          ...state
      }
    case 'AUTHENTICATED_SUCCESS':
      return {
          ...state,
          isAuthenticated: true
      }
    case 'AUTHENTICATED_FAIL':
      return {
          ...state,
          isAuthenticated: false
      }
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        allMessages: action.payload
      }
      case 'UPDATE_OPENCHAT':
        return {
          ...state,
          openChat: action.payload
        }
      case 'ADD_NEW_MESSAGE':
        return {
          ...state,
          allMessages: action.payload
        }
      
        default:
          throw new Error('No matched action!');
  }
};

export default reducer;
