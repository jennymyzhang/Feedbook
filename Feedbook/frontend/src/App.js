import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Activate from "./components/user/Activate";
import Layout from "./Layout";
import Login from "./components/user/Login";
import { checkAuthenticated, load_user } from './actions/auth';
import { useValue } from './context/ContextProvider';
import { useEffect } from "react";

const App = () => {
      const {
            state: {isAuthenticated, },
          } = useValue();
      const {dispatch} = useValue()

      useEffect(() => {
        checkAuthenticated(dispatch);
        load_user(dispatch);
      }, []);
      
      return (
            <Layout>
            <div className="container">
            <BrowserRouter>
                  <Routes>
                        <Route path="activate/:uid/:token" element={<Activate/>} />
                        {!isAuthenticated && <Route path="*" element={<Login />}/>}
                        {isAuthenticated && <Route path="*" element={<Home />}/>}
                  </Routes>
            </BrowserRouter>
            </div>
            </Layout>
      )
}
  export default App;

