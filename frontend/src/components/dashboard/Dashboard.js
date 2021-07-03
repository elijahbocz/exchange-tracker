import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";

const StyledDashboard = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  button {
    background: black;
    border: none;
    border-radius: 6px;
    color: white;
    margin: 1rem;
    padding: 1rem;
    width: 100px;
  }

  button:hover {
    cursor: pointer;
  }
`;

function Dashboard(props) {
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    }
  }, []);
  return (
    <StyledDashboard>
      <Header />
      <p>Dashboard</p>
      <StyledLink to="/new-coin"><button>Add New Coin</button></StyledLink>
    </StyledDashboard>
  );
}

export default withRouter(Dashboard);
