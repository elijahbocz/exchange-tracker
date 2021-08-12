import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.nav`
  text-align: center;
  background: #283044;
  padding: 2rem;
  h1 {
    color: #78A1BB;
    font-size: 3rem;
  }
`;

const StyledLink = styled(Link)`
  color: #BFA89E;
  text-decoration: none;

  :hover {
    color: #EBF5EE;
  }
`;

const StyledUserNav = styled.nav`
  padding: 0.75rem;

  a {
    margin: 0 2rem;
  }

  .logout-btn {
    color: #BFA89E;
    margin: 0 2rem;
  }
  .logout-btn:hover {
    cursor: pointer;
    color: #EBF5EE;
  }
`;

function Header(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      // const currentUser = JSON.parse(userLoggedIn);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  return (
    <StyledHeader>
      <h1>Coin Exchange Tracker</h1>
      {isLoggedIn ? (
        <StyledUserNav>
          <StyledLink className="app-link" to="/dashboard">
            Dashboard
          </StyledLink>
          <StyledLink className="app-link" to="/dashboard-entry">
            New Coin
          </StyledLink>
          <StyledLink className="app-link" to="dashboard-delete">
            Delete Coin
          </StyledLink>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </StyledUserNav>
      ) : (
        <StyledUserNav>
          <StyledLink className="app-link" to="/">
            Home
          </StyledLink>
          <StyledLink className="app-link" to="/login">
            Login
          </StyledLink>
          <StyledLink className="app-link" to="/register">
            Register
          </StyledLink>
        </StyledUserNav>
      )}
    </StyledHeader>
  );
}

export default withRouter(Header);
