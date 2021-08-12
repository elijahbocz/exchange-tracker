import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Header from "../Header";

const StyledLogin = styled.div`
  background: #ebf5ee;
  padding: 1rem;
  margin: 1rem 20%;
  text-align: center;
  .error {
    color: red;
  }

  // up to 768px
  @media screen and (max-width: 767.98px) {
    padding: 0.5rem;
    margin: 1rem 5%;
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
    width: 97%;
  }
`;

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      props.history.push("/dashboard");
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const credentials = { username: username, password: password };
    fetch("https://exchangetracker.net/api/login-user", {
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
          setError("Invalid login credentials, try again");
        } else {
          localStorage.setItem("user", JSON.stringify(res));
          props.history.push("/dashboard");
        }
      });
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
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header />
      <StyledLogin>
        <p className="error">{error}</p>
        <p>Login</p>
        <StyledForm onSubmit={handleLogin}>
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
          <button>Login</button>
        </StyledForm>
      </StyledLogin>
    </div>
  );
}

export default withRouter(Login);
