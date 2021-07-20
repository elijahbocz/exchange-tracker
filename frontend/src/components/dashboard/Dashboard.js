import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";

const StyledDashboard = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
  }
`;

const StyledTable = styled.table`
  text-align: center;
  margin: 0 auto;

  th,
  td {
    padding: 1rem;
  }
`;

function Dashboard(props) {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [totalPL, setTotalPL] = useState(0);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      const currentUser = JSON.parse(userLoggedIn);
      setUsername(currentUser["username"]);
      fetch("http://127.0.0.1:5000/api/get-dashboard", {
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
        calculateTotalPandL();
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const calculateTotalPandL = () => {
    let total = 0;
    data.forEach(item => {
      total += parseFloat(item.pAndL);
    })
    setTotalPL(total);
  }

  return (
    <StyledDashboard>
      <Header />
      <p>{username}</p>
      <button onClick={handleLogout}>Logout</button>
      <p>Dashboard</p>
      <StyledTable>
        <tr>
          <th>Coin Name</th>
          <th>Exchange</th>
          <th>Quantity</th>
          <th>Average Price</th>
          <th>Current Price</th>
          <th>P & L</th>
        </tr>
        {data.map((coin) => (
          <tr key={coin.coinID}>
            <td>{coin.coinName}</td>
            <td>{coin.exchange}</td>
            <td>{coin.quantity}</td>
            <td>{coin.averagePrice}</td>
            <td>{coin.currentPrice}</td>
            <td>{coin.pAndL}</td>
          </tr>
        ))}
        <tr>
          <td colspan="5">Total P & L:</td>
          <td>{totalPL}</td>
        </tr>
      </StyledTable>
    </StyledDashboard>
  );
}

export default withRouter(Dashboard);
