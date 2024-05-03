import App from "./App"
import React, {Component} from "react";
import { createRoot } from 'react-dom/client';
import ContextProvider from './context/ContextProvider';



createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);