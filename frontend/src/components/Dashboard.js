import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header"

const StyledDashboard = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
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
    </StyledDashboard>
  );
}

export default withRouter(Dashboard);
