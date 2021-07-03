import React from "react";
import styled from "styled-components";

import Header from "./Header"

const StyledDashboard = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
  }
`;


function Dashboard() {
  return (
    <StyledDashboard>
      <Header />
      <p>Dashboard</p>
    </StyledDashboard>
  );
}

export default Dashboard;
