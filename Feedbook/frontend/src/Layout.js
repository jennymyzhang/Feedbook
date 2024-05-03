import React, { useEffect } from 'react';
import Notification from "./components/Notification";
import Loading from "./components/Loading";
import { checkAuthenticated, load_user } from './actions/auth';
import { useValue } from './context/ContextProvider';

const Layout = ({children }) => {
    return (
        <>
            <Loading />
            <Notification />
            {children}
        </>
    );
};

export default (Layout);