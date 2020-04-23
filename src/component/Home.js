
import React from 'react'

import {
  Link
} from 'react-router-dom';

import fetchWithAuth from '../auth'

export default function(){
  const [state,setState] = React.useState({checked:false});
  const check = e => {
    e.preventDefault();
    fetchWithAuth(`/check/`,{method:"POST"})
    .then( result   => setState({ checked: result.success }) );
  }
  const logout = e => {
    localStorage.removeItem('jwt');
    delete window.AUTH_TOKEN;
  }
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <p>
        <button onClick={check}>Test: {state.checked?'yo':'no'}</button>
        <button onClick={logout}>logout</button>
      </p>
    </div>
  )
}
