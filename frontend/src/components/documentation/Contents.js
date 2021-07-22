import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";

const StyledContents = styled.div`
    padding: 1rem;
    text-align: center;
`;

const StyledLink = styled(Link)`
  color: #BFA89E;
  text-decoration: none;

  :hover {
    opacity: 0.7;
  }
`;

function Contents() {
  return (
    <div className="contents-wrapper">
      <Header />
      <StyledContents>
        <h2>Documentation Contents</h2>
        <p>The documentation for this application is split into the backend and the frontend.</p>
        <br></br>
        <p>The <span><StyledLink to="/documentation/backend">Backend</StyledLink></span> portion covers how Python and MySQL are utilized as an API and database respectively.</p>
        <p>The <span><StyledLink to="/documentation/frontend">Frontend</StyledLink></span> portion covers how React is utilized for the user interface and displaying of data fetched from the backend.</p>
      </StyledContents>
      <Footer />
    </div>
  );
}

export default Contents;
