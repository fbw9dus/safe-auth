
import React from 'react';

import {
  Redirect,
  Link
} from 'react-router-dom';

export default function Login() {
  const [state,setState] = React.useState({
    name:'', pass:'', login:false
  });
  const { name, pass, login, remember, token } = state;

  const change = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  const changeCheckbox = e =>
    setState({ ...state, remember: e.target.checked });

  const submit = e => {
    e.preventDefault();
    fetch(`/login?name=${name}&pass=${pass}`)
    .then( response => response.json() )
    .then( result   => {
      window.AUTH_TOKEN = result.token;
      if ( remember )
           localStorage.setItem('jwt',result.token);
      else localStorage.removeItem('jwt');
      setState({
        ...state,
        login:result.success,
        token:result.token
      })} );
  }

  if ( login ) return <Redirect to="/"/>

  return ( <>
    <p><input name="name" value={name} onChange={change}/></p>
    <p><input name="pass" value={pass} onChange={change}/></p>
    <p><input type="checkbox" name="remember" checked={remember} onChange={changeCheckbox}/> Remember Me</p>
    <p><button onClick={submit}>Login</button></p>
    <p>Noch kein Kunde? <Link to='/register'>Hier Registrieren</Link></p>
  </> );
}
