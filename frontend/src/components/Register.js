import React, { useState } from "react";
import Header from "./Header";
import styled from "styled-components";

const StyledRegistration = styled.div`
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

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleRegistration(e) {
    e.preventDefault();
    const credentials = { username: username, password: password};
    fetch('http://127.0.0.1:5000/api/register-user', {
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
    } else if (e.target.id === "confirm-password") {
      setConfirmPassword(e.target.value);
    }
  }

  return (
    <div className="home">
      <Header/>
      <StyledRegistration>
        <p>Register</p>
        <StyledForm onSubmit={handleRegistration}>
          <label>Username</label>
          <input type="text" id="username" onChange={updateValues}></input>
          <p></p>
          <label>Password</label>
          <input type="password" id="password" onChange={updateValues}></input>
          <p></p>
          <label>Confirm Password</label>
          <input type="password" id="confirm-password" onChange={updateValues}></input>
          <p></p>
          <button>Register</button>
        </StyledForm>
      </StyledRegistration>
    </div>
  );
}

export default Register;
