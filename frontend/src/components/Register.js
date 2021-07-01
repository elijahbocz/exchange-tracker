import React from "react";
import Header from "./Header";
import styled from "styled-components";

const StyledRegistration = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem;
`;

function Register() {
  return (
    <div className="home">
      <Header />
      <StyledRegistration>
        <p>Register:</p>
      </StyledRegistration>
    </div>
  );
}

export default Register;
