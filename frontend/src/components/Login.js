import React, { useState } from "react";
import Header from "./Header";
import styled from "styled-components";

const StyledLogin = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem;
`;

const StyledForm = styled.form`
  margin: 1rem;
  label {
    margin: 1rem;
  }
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    const credentials = { username: username, password: password};
    fetch('http://127.0.0.1:5000/api/post', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  function updateValues(e) {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  }

  return (
    <div className="home">
      <Header/>
      <StyledLogin>
        <p>Login</p>
        <StyledForm onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" id="username" onChange={updateValues}></input>
          <p></p>
          <label>Password</label>
          <input type="password" id="password" onChange={updateValues}></input>
          <p></p>
          <button>Login</button>
        </StyledForm>
      </StyledLogin>
    </div>
  );
}

export default Login;
