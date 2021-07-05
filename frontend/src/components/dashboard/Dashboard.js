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

const StyledLink = styled(Link)`
  text-decoration: none;

  button {
    background: black;
    border: none;
    border-radius: 6px;
    color: white;
    margin: 1rem;
    padding: 1rem;
    width: 100px;
  }

  button:hover {
    cursor: pointer;
  }
`;

const StyledTable = styled.table`
  text-align: center;
  margin: 0 auto;
`;

function Dashboard(props) {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      const currentUser = JSON.parse(userLoggedIn);
      setUsername(currentUser["username"]);
      fetch("http://127.0.0.1:5000/api/get-coins", {
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
    <StyledDashboard>
      <Header />
      <p>{username}</p>
      <p>Dashboard</p>
      <StyledLink to="/new-coin">
        <button>Add New Coin</button>
      </StyledLink>
      <StyledTable>
        {data.map((coin) => (
          <tr key={coin.coinID}>
            <td>{coin.coinName}</td>
            <td>{coin.exchange}</td>
            <td>{coin.quantity}</td>
            <td>{coin.averagePrice}</td>
          </tr>
        ))}
      </StyledTable>
    </StyledDashboard>
  );
}

export default withRouter(Dashboard);
