import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.div`
  margin: 1rem;
  text-align: center;

  a {
    color: #283044;
    text-decoration: none;
    margin: 0.5rem;
  }
  a:hover {
    color: #8B786D;
  }
`;

const StyledLink = styled(Link)`
  color: #283044;
  text-decoration: none;
  margin: 0.5rem;
  :hover {
    color: #8B786D;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <a href="https://github.com/elijahbocz/exchange-tracker">Github</a>
      <StyledLink to="/documentation/contents">Docs</StyledLink>
    </StyledFooter>
  );
}

export default Footer;
