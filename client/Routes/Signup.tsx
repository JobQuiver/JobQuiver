import React, { FC, useState } from "react";
import { render } from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router";

const Signup: FC<any> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  //saves user's input for username and password
  const setUsernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const setPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  //signs up the user
  const signupHandler = async () => {
    await fetch("signup",  {
      method: 'POST',
      headers: {'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    })
    .then((response: any) => {response.json})
    .then((data: any) => {
      if(data.valid){
        <Redirect to='/SearchPage'/>
      }
      else{
        setErrorMessage('Invalid username/password');
      }
    });
  };

  return (
    <div className='LoginContainer'>
      <input className='usernameInput' type='text' value={username} onChange={setUsernameHandler} />
      <input className='passwordInput' type='text' value={password} onChange={setPasswordHandler} />
      <button className='LoginSignupButton' onClick={signupHandler}>Sign Up</button>
      <div className='errorMessage'>{errorMessage}</div>
    </div>
  );
};

export default Signup;
