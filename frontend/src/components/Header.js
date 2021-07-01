import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.nav`
  text-align: center;

  h1 {
    font-size: 3rem;
  }
`;

const StyledLink = styled(Link)`
  color: grey;
  text-decoration: none;
`;

function Header() {
  return (
    <StyledHeader>
      <h1>Coin Exchange Tracker</h1>
      <StyledLink className="app-link" to="/">
        Home
      </StyledLink>
    </StyledHeader>
  );
}

export default Header;
