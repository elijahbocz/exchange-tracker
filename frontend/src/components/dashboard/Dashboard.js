import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Header from "../Header";
import Footer from "../Footer";

const StyledDashboard = styled.div`
  padding: 1rem;
  text-align: center;
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
    color: #00CE2A;
  }

  .loss {
    color: #BA2D13;
  }
`;

function Dashboard(props) {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({
    coins: [],
    totalPL: 0,
  });

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      const currentUser = JSON.parse(userLoggedIn);
      setUsername(currentUser["username"]);
      fetch("http://165.22.183.86/api/get-dashboard", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userID: currentUser["userID"] }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData(res);
        });
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Helmet>
	  <title>Dashboard</title>
      </Helmet>
      <Header />
      <StyledDashboard>
        <p>{username}'s Dashboard</p>
        <StyledTable>
          <p></p>
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
              <td>{coin.coinName}</td>
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
      </StyledDashboard>
      <Footer />
    </div>
  );
}

export default withRouter(Dashboard);
