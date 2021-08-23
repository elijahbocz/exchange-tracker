import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import useWindowDimensions from "./useWindowDimensions";
import Header from "../Header";
import Footer from "../Footer";

const StyledDashboard = styled.div`
  padding: 1rem;
  text-align: center;

  .profit {
    color: #00ce2a;
  }

  .loss {
    color: #ba2d13;
  }

  .container {
    margin-top: 1rem;
  }

  .card {
    background: #ebf5ee;
    border-radius: 6px;
    margin: 1rem;
    padding: 0.5rem;
    text-align: left;
  }
  .card p {
    padding: 0.1rem;
  }

  .card img {
    padding-right: 0.33rem;
    width: 26px;
  }

  .card-title {
    display: flex;
    padding: 0.25rem 0;
  }

  .coin-name {
    font-size: 1.15rem;
  }
`;

const StyledTable = styled.table`
  background: #ebf5ee;
  text-align: center;
  margin: 1rem auto;

  th {
    color: #283044;
  }

  th,
  td {
    padding: 1rem;
  }

  .profit {
    color: #00ce2a;
  }

  .loss {
    color: #ba2d13;
  }

  img {
    margin-right: 0.25rem;
    width: 14px;
  }
`;

function Dashboard(props) {
  const [username, setUsername] = useState("");
  const { height, width } = useWindowDimensions();
  const [data, setData] = useState({
    coins: [],
    totalPL: 0,
  });

  useEffect(() => {
    // check if user is logged in, if no user is found then redirect to login page
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      // otherwise get the current user from local storage and retrieve the userID
      const currentUser = JSON.parse(userLoggedIn);
      setUsername(currentUser["username"]);

      // determine the environment and use appropriate url for fetch
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/api/get-dashboard";
      } else {
        url = "https://exchangetracker.net/api/get-dashboard";
      }

      // retrieves all of the data to be displayd on the dashboard
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userID: currentUser["userID"] }),
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        });
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Header />
      <StyledDashboard>
        <p>{username}'s Dashboard</p>
        {width > 768 ? (
          <StyledTable>
            <tr>
              <th>Coin Name</th>
              <th>Exchange</th>
              <th>Quantity</th>
              <th>Average Price</th>
              <th>Current Price</th>
              <th>P & L</th>
            </tr>
            {data.coins.map((coin) => (
              <tr key={coin.coinID}>
                <td>
                  {coin.image[0] === undefined ? (
                    <span></span>
                  ) : (
                    <img src={coin.image[0].imageLink} alt={coin.coinID} />
                  )}
                  {coin.coinName}
                </td>
                <td>{coin.exchange}</td>
                <td>{coin.quantity}</td>
                <td>{coin.averagePrice}</td>
                <td>{coin.currentPrice}</td>
                {coin.pAndL > 0 ? (
                  <td className="profit">{coin.pAndL}</td>
                ) : (
                  <td className="loss">{coin.pAndL}</td>
                )}
              </tr>
            ))}
            <tr>
              <td colSpan="5">Total P & L:</td>
              {data.totalPL > 0 ? (
                <td className="profit">{data.totalPL}</td>
              ) : (
                <td className="loss">{data.totalPL}</td>
              )}
            </tr>
          </StyledTable>
        ) : (
          <div className="container">
            {data.totalPL > 0 ? (
              <p>
                Total P&L: <span className="profit">${data.totalPL}</span>
              </p>
            ) : (
              <p>
                Total P&L: <span className="loss">${data.totalPL}</span>
              </p>
            )}
            {data.coins.map((coin) => (
              <div key={coin.coinID} className="card">
                <div className="card-title">
                  {coin.image[0] === undefined ? (
                    <span></span>
                  ) : (
                    <img src={coin.image[0].imageLink} alt={coin.coinID} />
                  )}
                  <p className="coin-name">{coin.coinName}</p>
                </div>
                <p>Exchange: {coin.exchange}</p>
                <p>Quantity: {coin.quantity}</p>
                <p>Average Price: ${coin.averagePrice}</p>
                <p>Current Price: ${coin.currentPrice}</p>
                {coin.pAndL > 0 ? (
                  <p>
                    P & L: <span className="profit">${coin.pAndL}</span>
                  </p>
                ) : (
                  <p>
                    P & L: <span className="loss">${coin.pAndL}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </StyledDashboard>
      <Footer />
    </div>
  );
}

export default withRouter(Dashboard);
