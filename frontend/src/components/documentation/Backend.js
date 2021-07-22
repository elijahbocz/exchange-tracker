import React from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";

const StyledBackend = styled.div`
  text-align: center;
  padding: 1rem;

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

  .tech-stack {
    padding: 1rem;
    text-align: left;
  }

  .installing-and-running {
    padding: 1rem;
    text-align: left;
  }

  .dependency-list {
    padding: 1rem;
  }

  .mysql-config {
    padding: 1rem;
    text-align: left;
  }

  .schema {
    padding: 1rem;
  }
`;

function Backend() {
  return (
    <div className="backend-wrapper">
      <Header />
      <StyledBackend>
        <h2>Coin Exchange Tracker Backend</h2>
        <div className="tech-stack">
          <p>
            The backend for this application was developed and deployed on
            Ubuntu 20.04, and the commands in this documentation will reflect
            this environment. Python3, specifically Python 3.8.10, was used as
            the primary language for writing the backend's API, and MySQL
            version 8.0.25 was used as the database. While Python3 comes
            pre-installed on Ubuntu 20.04, MySQL will need to be installed. This
            process is covered in detail in this{" "}
            <a href="https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04">
              DigitalOcean guide
            </a>
            , and is not within the scope of this documentation. The final tool
            utilized on the backend is the{" "}
            <a href="https://www.coingecko.com/en/api">Coin Gecko</a> public
            API, which stores various information pertaining to cryptocurrency
            and is used for the source of this application's data.
          </p>
        </div>
        <h3>Installing Dependencies and Running the Backend</h3>
        <div className="installing-and-running">
          <p>
            The Python dependencies required to run the backend are stored
            inside of the requirements.txt within the root directory of the
            backend folder, and will be displayed here as well:
          </p>
          <div className="dependency-list">
            <code>certifi==2021.5.30 </code>
            <code>cffi==1.14.5</code>
            <code>chardet==4.0.0</code>
            <code>click==8.0.1</code>
            <code>cryptography==3.4.7</code>
            <code>Flask==2.0.1</code>
            <code>Flask-Cors==3.0.10</code>
            <code>greenlet==1.1.0</code>
            <code>idna==2.10</code>
            <code>itsdangerous==2.0.1</code>
            <code>Jinja2==3.0.1</code>
            <code>MarkupSafe==2.0.1</code>
            <code>mccabe==0.6.1</code>
            <code>pycparser==2.20</code>
            <code>PyMySQL==1.0.2</code>
            <code>python-dotenv==0.18.0</code>
            <code>requests==2.25.1</code>
            <code>six==1.16.0</code>
            <code>urllib3==1.26.6</code>
            <code>Werkzeug==2.0.1</code>
          </div>
          <p>
            Assuming a clean Python3 virtual environment, activate the virtual
            environment from the backend root directory using{" "}
            <code>$ source venv/bin/activate</code>
          </p>
          <br />
          <p>
            The dependencies can then be installed with the command
            <code>$ pip install -r requirements.txt</code>
          </p>
          <br />
          <p>
            Assuming the installation completed successfully, the backend should
            now be able to be run
            <code>$ flask run</code>
          </p>
          <br />
          <p>
            The output in your terminal should resemble this to show that the
            backend is running:
          </p>
          <code>* Serving Flask app 'server.py' (lazy loading)</code>
          <code>* Environment: development</code>
          <code>* Debug mode: on</code>
          <code>
            * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
          </code>
          <code>* Restarting with stat</code>
          <code>* Debugger is active!</code>
          <code>* Debugger PIN: 516-540-820</code>
        </div>
        <h3>MySQL Configuration</h3>
        <div className="mysql-config">
          <p>
            Assuming MySQL is installed on Ubuntu 20.04, and a user with the
            name <em>prod</em> within MySQL has appropriate access, first create
            the database:
          </p>
          <code>CREATE DATABASE exchange-tracker;</code>
          <br />
          <p>Set that database for subsequent commands:</p>
          <code>USE exchange_tracker;</code>
          <br />
          <p>
            The first table needed is the <em>users</em> table, which stores
            user information, the schema is as follows:
          </p>
          <div className="schema">
            <code>userID: VARCHAR(36)</code>
            <code>username: VARCHAR(20)</code>
            <code>password: VARCHAR(150)</code>
          </div>
          <p>
            The schema is simple, with userID being a UUID generated by the{" "}
            <em>uuid</em> library, and the password is hashed by{" "}
            <em>Werkzeug</em> on our Python backend before being stored in the
            database.
          </p>
          <br />
          <p>The table is created using</p>
          <code>CREATE TABLE users (</code>
          <code> userID VARCHAR(36), </code>
          <code> username VARCHAR(20),</code>
          <code> password VARCHAR(150),</code>
          <code> PRIMARY KEY (userID)</code>
          <code>);</code>
          <br />
          <p>
            The second table needed is the <em>coins</em> table, which stores
            the information of each coin that is associated with each user. The
            schema is as follows:
          </p>
          <div className="schema">
            <code>coinID: VARCHAR(36)</code>
            <code>userID: VARCHAR(20)</code>
            <code>coinName: VARCHAR(50)</code>
            <code>coinSymbol: VARCHAR(10)</code>
            <code>exchange: VARCHAR(20)</code>
            <code>quantity: VARCHAR(16)</code>
            <code>averagePrice: VARCHAR(16)</code>
            <code>dateAdded: VARCHAR(32)</code>
          </div>
          <p>
            This schema requires a bit more explanation. The coinID will be used
            in sending requests to the Coin Gecko API, examples are{" "}
            <em>bitcoin</em>, <em>ethereum</em>, <em>litecoin</em>, etc. The
            userID will be a foreign key that stores the userID that corresponds
            to each entry in this table, creating the relationship between the
            user and their coins. The coinName will be the actual name of the
            coin and will be what is displayed to the user on their dashboard,
            such as <em>Bitcoin</em>, <em>Ethereum</em>, <em>Litecoin</em>. The
            coinSymbol is the shorthand identifier for each coin, such as{" "}
            <em>BTC</em> for Bitcoin, <em>ETH</em> for Ethereum, and{" "}
            <em>LTC</em> for Litecoin. The exchange field is used to track which
            cryptocurrency exchange the user purchased their cryptocurrency
            from, such as Coinbase, Kraken, or Binance. The quantity and
            averagePrice are details about the user's purchase of their coin,
            with the quanity being the amount of coin purchased, and the
            averagePrice being the amount paid for the quantity. Finally, the
            dateAdded field corresponds time stamp for when the entry was made
            into the database and will be in this format{" "}
            <em>2021-07-20 16:52:36.307576</em>. The SQL command to create this
            table is as follows:
          </p>
          <div className="schema">
            <code>CREATE TABLE coins (</code>
            <code> coinID VARCHAR(36),</code>
            <code> userID VARCHAR(36),</code>
            <code> coinName VARCHAR(50),</code>
            <code> coinSymbol VARCHAR(10),</code>
            <code> exchange VARCHAR(20),</code>
            <code> quantity VARCHAR(16),</code>
            <code> averagePrice VARCHAR(16),</code>
            <code> dateAdded VARCHAR(32),</code>
            <code> PRIMARY KEY(coinID),</code>
            <code> FOREIGN KEY (userID) REFERENCES users(userID)</code>
            <code>);</code>
          </div>
        </div>
      </StyledBackend>
      <Footer />
    </div>
  );
}

export default Backend;
