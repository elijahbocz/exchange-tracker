import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";

const StyledHomeContent = styled.div`
  text-align: center;
`;

const StyledHomeText = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  button {
    background: #78a1bb;
    border: none;
    border-radius: 6px;
    color: #fff;
    margin: 1rem;
    padding: 0.5rem;
    width: 100px;
  }

  button:hover {
    cursor: pointer;
  }
`;

function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header />
      <StyledHomeContent>
        <StyledHomeText>
          <p>
            The Coin Exchange Tracker allows you to view all of their crypto
            purchases in one place.
          </p>
          <p>
            With no real connections to any exchange, the data you put into your
            account will pose no risk to your holdings.
          </p>
          <p>
            Instead, this website is available to quickly track all of your
            purchases across the different exchanges you've used for purchasing
            cryptocurrency, and calculating the profits and losses across them
            all based off of the current prices.
          </p>
        </StyledHomeText>
        <p>Get started now:</p>
        <StyledLink to="/login">
          <button>Login</button>
        </StyledLink>
        <StyledLink to="/register">
          <button>Register</button>
        </StyledLink>
      </StyledHomeContent>
      <Footer />
    </div>
  );
}

export default Home;
