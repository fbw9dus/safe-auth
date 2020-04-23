
import React from 'react'

import {
  Link
} from 'react-router-dom';

import fetchWithAuth from '../auth'

export default function(){
  const [state,setState] = React.useState({checked:false});
  const check = e => {
    e.preventDefault();
    fetchWithAuth(`/check`)
    .then( result   => setState({ checked: result.success }) );
  }
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <p>
        <button onClick={check}>Test: {state.checked?'yo':'no'}</button>
      </p>
    </div>
  )
}
