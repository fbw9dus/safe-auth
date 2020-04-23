
import React from 'react';

import './App.css';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Login    from './component/Login'
import Register from './component/Register'
import Home     from './component/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login"    component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/"         component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
