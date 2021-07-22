import React from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";

const StyledBackend = styled.div``;

function Backend() {
  return (
    <div className="backend-wrapper">
      <Header />
      <StyledBackend>
        <p>Backend</p>
      </StyledBackend>
      <Footer />
    </div>
  );
}

export default Backend;
