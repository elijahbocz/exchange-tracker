import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.nav`
  text-align: center;
  background: #283044;
  padding: 2rem;
  h1 {
    font-size: 3rem;
    color: #78a1bb;
  }

  // up to 1200px
  @media screen and (max-width: 1199.98px) {
    h1 {
      font-size: 2.75rem;
    }
  }

  // up to 992px
  @media screen and (max-width: 991.98px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  // up to 768px
  @media screen and (max-width: 767.98px) {
    h1 {
      font-size: 2rem;
    }
  }

  // up to 576px
  @media screen and (max-width: 575.98px) {
    h1 {
      font-size: 1.75rem;
    }
  }
`;

const StyledLink = styled(Link)`
  color: #bfa89e;
  text-decoration: none;

  :hover {
    color: #ebf5ee;
  }
`;

const StyledUserNav = styled.nav`
  padding: 0.75rem;

  a {
    margin: 0 2rem;
  }

  .logout-btn {
    color: #bfa89e;
    margin: 0 2rem;
  }
  .logout-btn:hover {
    cursor: pointer;
    color: #ebf5ee;
  }

  // up to 768px
  @media screen and (max-width: 767.98px) {
    a {
      margin: 0 1rem;
    }
  }

  // up to 576px
  @media screen and (max-width: 575.98px) {
    padding: 0.5rem;
    .flex-container {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
    }
    a {
      margin: 0.5rem;
    }
    .logout-btn {
      margin: 0.5rem;
    }
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
          <div className="flex-container">
            <StyledLink className="app-link" to="/dashboard">
              Dashboard
            </StyledLink>
            <StyledLink className="app-link" to="/dashboard-entry">
              New Coin
            </StyledLink>
            <StyledLink className="app-link" to="dashboard-delete">
              Delete Coin
            </StyledLink>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </StyledUserNav>
      ) : (
        <StyledUserNav>
          <div className="flex-container">
            <StyledLink className="app-link" to="/">
              Home
            </StyledLink>
            <StyledLink className="app-link" to="/login">
              Login
            </StyledLink>
            <StyledLink className="app-link" to="/register">
              Register
            </StyledLink>
          </div>
        </StyledUserNav>
      )}
    </StyledHeader>
  );
}

export default withRouter(Header);
