import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Header from "../Header";

const StyledRegistration = styled.div`
  background: #ebf5ee;
  padding: 1rem;
  margin: 1rem 20%;
  text-align: center;
  .error {
    color: red;
  }
`;

const StyledForm = styled.form`
  button {
    background: #bfa89e;
    border-radius: 6px;
    color: #fff;
    padding: 0.5rem;
    text-align: center;
  }
  button:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const StyledInputGroup = styled.div`
  padding: 0.75rem;
  text-align: left;

  label {
    color: #283044;
    padding-right: rem;
  }

  input {
    background: #fff;
    padding: 0.5rem 0 0.5rem 0.5rem;
    width: 100%;
  }
`;

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleRegistration(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      const credentials = { username: username, password: password };
      fetch("http://exchangetracker.net/api/register-user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if ("error" in res) {
            if (res["error"] === 1) {
              setError("Username is taken");
              setTimeout(() => {
                setError("");
              }, 3000);
            }
          } else {
            props.history.push("/successful-registration");
          }
        });
    } else {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
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
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Header />
      <StyledRegistration>
        <p className="error">{error}</p>
        <p>Register</p>
        <StyledForm onSubmit={handleRegistration}>
          <StyledInputGroup>
            <label>Username</label>
            <input type="text" id="username" onChange={updateValues}></input>
          </StyledInputGroup>
          <StyledInputGroup>
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={updateValues}
            ></input>
          </StyledInputGroup>
          <StyledInputGroup>
            <label>Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              onChange={updateValues}
            ></input>
          </StyledInputGroup>
          <button>Register</button>
        </StyledForm>
      </StyledRegistration>
    </div>
  );
}

export default withRouter(Register);
