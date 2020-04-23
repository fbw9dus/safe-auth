import React from 'react';
import logo from './logo.svg';
import './App.css';

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
    .then( result   => setState({
      ...state,
      login:result.success,
      token:result.token
    }) );
  }

  const submitRegister = e => {
    e.preventDefault();
    fetch(`/register?name=${name}&pass=${pass}`)
    .then( response => response.json() )
    .then( result   => setState({ ...state, registered:result.success }) );
  }

  const check = e => {
    e.preventDefault();
    fetch(`/check2?token=${token}`)
    .then( response => response.json() )
    .then( result   => setState({ ...state, checked:result.success }) );
  }


  if ( login ) return <h1>
      Login erfolgreich: {name}
      <button onClick={check}>testen</button>
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
