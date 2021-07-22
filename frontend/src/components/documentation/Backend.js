import React from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";

const StyledBackend = styled.div`
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

  .putting-together {
    padding: 1rem;
    text-align: left;
  }

  .endpoints {
    padding: 1rem;
  }
`;

function Backend() {
  return (
    <div className="backend-wrapper">
      <Header />
      <StyledBackend>
        <h1>Coin Exchange Tracker Backend</h1>
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
        <h2>Installing Dependencies and Running the Backend</h2>
        <div className="installing-and-running">
          <p>
            The Python dependencies required to run the backend are stored
            inside of the requirements.txt within the root directory of the
            backend folder, and are displayed here as well:
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
            Assuming a clean Python3 virtual environment after cloning the
            repository from{" "}
            <a href="https://github.com/elijahbocz/exchange-tracker">Github</a>,
            activate the virtual environment from the backend root directory,{" "}
            <em>backend/</em>, using:
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
            now be able to be run:
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
        <h2>MySQL Configuration</h2>
        <div className="mysql-config">
          <p>
            Assuming MySQL is installed on Ubuntu 20.04, and a user with the
            name <em>dev</em> within MySQL has appropriate access, first create
            the database:
          </p>
          <code>CREATE DATABASE exchange_tracker;</code>
          <br />
          <p>Set that database for subsequent commands:</p>
          <code>USE exchange_tracker;</code>
          <br />
          <h3>Users</h3>
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
          <p>The table is created using the follow command:</p>
          <code>CREATE TABLE users (</code>
          <code> userID VARCHAR(36), </code>
          <code> username VARCHAR(20),</code>
          <code> password VARCHAR(150),</code>
          <code> PRIMARY KEY (userID)</code>
          <code>);</code>
          <br />
          <h3>Coins</h3>
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
            dateAdded field corresponds to a time stamp for when the entry was
            made into the database and will be in the format of{" "}
            <em>2021-07-20 16:52:36.307576</em>.{" "}
          </p>
          <p>The SQL command to create this table is as follows:</p>
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
          <br />
          <h3>Coins List</h3>
          <p>
            The final table needed to be created will be the <em>coins_list</em>{" "}
            table has the schema:
          </p>
          <div className="schema">
            <code>coinID: VARCHAR(64)</code>
            <code>coinSymbol: VARCHAR(64)</code>
            <code>coinName: VARCHAR(64)</code>
          </div>
          <p>
            This table contains all available cryptocurrencies in Coin Gecko's
            database and is fetched directly from the API and stored in this
            table. The purpose of this table serves as a way to check if the
            input from the user contains a valid cyrptocurrency as well as
            helping to adhere to the syntax that Coin Gecko uses in their API.
            The table is created in the database with this command:
          </p>
          <code>CREATE TABLE coins_list (</code>
          <code> coinID VARCHAR(64),</code>
          <code> coinSymbol VARCHAR(64),</code>
          <code> coinName VARCHAR(64)</code>
          <code>);</code>
          <p>
            This schema is simple and the data stored resembles what is stored
            in the <em>coins</em> table.
          </p>
        </div>
        <h2>Putting the Pieces Together</h2>
        <div className="putting-together">
          <p>
            Now that the Python backend and MySQL are installed and configured,
            a bit explanation on how the backend works is in order. The backend
            uses Flask as the web framework, which aids in the process of
            creating a WSGI (Web Server Gateway Interface), which is used for
            creating our API endpoints. The API endpoints are available through
            their routes and helper functions are used inside of the routes to
            handle the storing of data sent to the appropriate route in the
            database. Starting from the backend root directory, the API
            endpoints are created in <em>/api/routes.py</em>. The endpoints
            available are:
            <div className="endpoints">
              <ul>
                <li>
                  <code>/api/register-user</code>
                  <code>params: username, password</code>
                  <p>
                    This endpoint accepts a POST request, with a body containing
                    the <em>username</em> and <em>password</em> that is going to
                    be used to create a new entry in the <em>users</em> table.
                    The <em>username</em> is first used in a query to the{" "}
                    <em>users</em> table, if no match is found the user will be
                    created and a success message will be returned to the
                    frontend. If the username already exists in the database, an
                    error signifying this will be sent back to the frontend.
                  </p>
                </li>
                <br />
                <li>
                  <code>/api/login-user</code>
                  <code>params: username, password</code>
                  <p>
                    This endpoint accepts a POST request, with a body containing
                    the <em>username</em> and <em>password</em>, the{" "}
                    <em>username</em> is first checked for existence in the
                    database. Upon successful retrieval, the password is then
                    checked against the hash stored in <em>users</em>. If the
                    credentials are validated a successful message is returned
                    to the frontend, otherwise an error message is returned.
                  </p>
                </li>
                <br />
                <li>
                  <code>/api/new-coin</code>
                  <code>
                    params: coinID, userID, coinName, coinSymbol, exchange,
                    quantity, averagePrice
                  </code>
                  <p>
                    This endpoint accepts a POST request, with the required
                    parameters to create a new entry in the <em>coins</em>{" "}
                    table. Of the required parameters, only 4 will be taken from
                    input by the user: <em>coinSymbol, exchange, quantity,</em>{" "}
                    and <em>averagePrice</em>. The other parameters will be
                    handled by the frontend's logic and passed in along with
                    user data. If the new entry is stored correctly, a success
                    message will be returned to the frontend, otherwise an error
                    will be returned.
                  </p>
                </li>
                <br />
                <li>
                  <code>/api/get-coins-list</code>
                  <code>No parameters needed</code>
                  <p>
                    This endpoint accepts a GET request and will return all of
                    the entries in the <em>coins_list</em> table. This is used
                    for validating user input on the frontend for new coins to
                    be stored in <em>coins</em>.
                  </p>
                </li>
                <br />
                <li>
                  <code>/api/get-dashboard</code>
                  <code>params: userID</code>
                  <p>
                    This endpoint accepts a POST request, with the userID as the
                    only parameter. Upon a valid user ID being sent with the
                    request, all of the entries in the <em>coins</em> table
                    associated with the user ID will be retrieved from the
                    table. The current prices of each coin retrieved from the
                    table will then be fetched from the Coin Gecko API. The
                    profits and losses for each entry in the <em>coins</em>{" "}
                    table will then be calculated against the current price that
                    has been fetched from Coin Gecko. The total profit and loss
                    will also be kept as a running sum to be displayed on the
                    dashboard as well. All of this data is then packaged into a
                    JSON object on the backend and then returned to the frontend
                    to display to the user.
                  </p>
                </li>
              </ul>
            </div>
          </p>
        </div>
      </StyledBackend>
      <Footer />
    </div>
  );
}

export default Backend;
