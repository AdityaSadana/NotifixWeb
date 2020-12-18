import React from 'react';
import Profile from './pages/Profile'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/createpost">
          <CreatePost />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
