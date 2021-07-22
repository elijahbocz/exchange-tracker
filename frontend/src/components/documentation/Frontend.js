import React from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";

const StyledFrontend = styled.div`
  text-align: center;
  padding: 1rem;

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  a {
    color: #8b786d;
    text-decoration: none;
  }
  a:hover {
    opacity: 0.7;
  }

  code {
    display: block;
    white-space: pre-wrap;
  }

  .block {
    padding: 1rem;
    text-align: left;
  }

  .indent {
    padding: 1rem;
  }
`;

function Frontend() {
  return (
    <div className="frontend-wrapper">
      <Header />
      <StyledFrontend>
        <h1>Coin Exchange Tracker Frontend</h1>
        <div className="block">
          <p>
            The frontend for this application was developed and deployed on
            Ubuntu 20.04, and the commands in this documentation will reflect
            this environment. React, specifically React version 17.0.2, was used
            for creating the user interface and Yarn version 1.22.10 was used as
            the package manager for Node modules.
          </p>
        </div>
        <h2>Dependencies</h2>
        <div className="block">
          <p>
            The dependencies the frontend requires are stored in the{" "}
            <em>package.json</em> file in the <em>frontend/</em> root directory,
            and are listed here:
          </p>
          <div className="indent">
            <code></code>
            <code>"@testing-library/jest-dom": "^5.11.4",</code>
            <code>"@testing-library/react": "^11.1.0",</code>
            <code>"@testing-library/user-event": "^12.1.10",</code>
            <code>"react": "^17.0.2",</code>
            <code>"react-dom": "^17.0.2",</code>
            <code>"react-router-dom": "^5.2.0",</code>
            <code>"react-scripts": "4.0.3",</code>
            <code>"styled-components": "^5.3.0",</code>
            <code>"web-vitals": "^1.0.1"</code>
          </div>
          <p>
            Apart from the dependencies create-react-app installs, the two most
            important installed dependencies are <em>react-router-dom</em> and{" "}
            <em>styled-components</em>. React Router, <em>react-router-dom</em>,
            is used primarily for the routing and link and features between
            React components. Styled Components, <em>styled-components</em>, is
            used for writing CSS within our React components to keep CSS
            isolated and easier to maintain.
          </p>
          <br />
          <p>
            To install the Node modules after cloning the application from{" "}
            <a href="https://github.com/elijahbocz/exchange-tracker">Github</a>,
            in the <em>frontend/</em> root directory run
          </p>
          <code>yarn install</code>
        </div>
        <h2>Running the Application</h2>
        <div className="block">
          <p>
            After the installation completes, the frontend can be started with
            the command
          </p>
          <code>yarn start</code>
          <br />
          <p>
            There is also a command available to start the API from the frontend
            directory as well:
          </p>
          <code>yarn start-api</code>
          <p>which will run this command in the background:</p>
          <code>cd ../backend && venv/bin/flask run --no-debugger</code>
        </div>
      </StyledFrontend>
      <Footer />
    </div>
  );
}

export default Frontend;
