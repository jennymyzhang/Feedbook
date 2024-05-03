import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: false,
  openLogin: false,
  loading: false,
  alert: {open: false, severity: 'info', message:''},
  profile: { open: false, file: null, photoURL: ''},
  allMessages: [],
  waitingForResponse: false,
  openChat: null,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch}}>{children}</Context.Provider>
  );
};

export default ContextProvider;