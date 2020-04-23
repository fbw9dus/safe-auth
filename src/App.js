import React from 'react';
import logo from './logo.svg';
import './App.css';

/*
  Die fetchWithAuth funktion soll funktionieren
  wie das normale fetch, jedoch automatisch den
  jwt header hinzufuegen.
*/

const fetchWithAuth = async (url,opts={}) => {
  if ( ! opts.headers ) opts.headers = {}
  opts.headers["Sars-CoV-2-Covid-19"] = window.AUTH_TOKEN;
  const response = await fetch(url,opts);
  return           await response.json();
}

function App() {
  const [state,setState] = React.useState({
    name:'', pass:'', login:false
  });
  const { name, pass, login, registered, token } = state;
  const change = e => setState({ ...state, [e.target.name]: e.target.value });

  const submitLogin = e => {
    e.preventDefault();
    fetch(`/login?name=${name}&pass=${pass}`)
    .then( response => response.json() )
    .then( result   => {
      window.AUTH_TOKEN = result.token;
      setState({
        ...state,
        login:result.success,
        token:result.token
      })} );
  }

  const submitRegister = e => {
    e.preventDefault();
    fetch(`/register?name=${name}&pass=${pass}`)
    .then( response => response.json() )
    .then( result   => setState({ ...state, registered:result.success }) );
  }

  const check = e => {
    e.preventDefault();
    fetchWithAuth(`/check`)
    .then( result   => setState({ ...state, checked:result.success }) );
  }

  const routerGet = e => {
    e.preventDefault();
    fetchWithAuth(`/router`)
    .then( result   => setState({ ...state, checked:result.success }) );
  }

  const routerPost = e => {
    e.preventDefault();
    fetchWithAuth(`/router`, { method:'POST' } )
    .then( result   => setState({ ...state, checked:result.success }) );
  }

  if ( login ) return <h1>
      Login erfolgreich: {name}
      <button onClick={check}>testen</button>
      <button onClick={routerGet}>get</button>
      <button onClick={routerPost}>post</button>
    </h1>

  return ( <>
    { registered ? <h2>{name} ist registriert</h2> : null }
    <input name="name" value={name} onChange={change}/>
    <input name="pass" value={pass} onChange={change}/>
    <button onClick={submitLogin}>Login</button>
    <button onClick={submitRegister}>Register</button>
  </> );
}

export default App;
