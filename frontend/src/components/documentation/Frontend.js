import React from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";

const StyledFrontend = styled.div``;

function Frontend() {
  return (
    <div className="frontend-wrapper">
      <Header />
      <StyledFrontend>
        <p>Frontend</p>
      </StyledFrontend>
      <Footer />
    </div>
  );
}

export default Frontend;
