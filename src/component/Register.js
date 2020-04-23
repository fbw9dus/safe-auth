
import React from 'react';

import {
  Redirect,
  Link
} from 'react-router-dom';

import { fetchPost } from '../auth.js'

export default function Login() {
  const [state,setState] = React.useState({
    name:'', pass:'', twice:''
  });
  const { name, pass, email, registered, twice } = state;
  const change = e => setState({ ...state, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    fetchPost( '/auth/register', { body:{ name, email, pass } })
    .then( result => setState({ ...state, registered:result.success }) );
  }

  if ( registered ) return <Redirect to="/"/>

  return ( <>
    <p><input name="name"  value={name}  onChange={change}/></p>
    <p><input name="email" value={email}  onChange={change}/></p>
    <p><input name="pass"  value={pass}  onChange={change}/></p>
    <p><input name="twice" value={twice} onChange={change}/></p>
    <p><button onClick={submit}>Register</button></p>
    <p>Schon Kunde? <Link to='/login'>Hier Anmelden</Link></p>
  </> );
}
