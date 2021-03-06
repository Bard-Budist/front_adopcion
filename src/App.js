import React from 'react';
import logo from './logo.svg';
import Routes from "./routes"
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Routes/>
    </Router>
  );
}

export default App;
