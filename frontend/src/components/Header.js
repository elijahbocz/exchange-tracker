import React, { useEffect, useState } from "react";
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

const StyledUserNav = styled.nav`
  a {
    margin: 2rem;
  }
`;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      // const currentUser = JSON.parse(userLoggedIn);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <StyledHeader>
      <h1>Coin Exchange Tracker</h1>
      {isLoggedIn ? (
        <StyledUserNav>
          <StyledLink className="app-link" to="/dashboard">
            Dashboard
          </StyledLink>
          <StyledLink className="app-link" to="/new-coin">New Coin</StyledLink>
        </StyledUserNav>
      ) : (
        <StyledLink className="app-link" to="/">
          Home
        </StyledLink>
      )}
    </StyledHeader>
  );
}

export default Header;
