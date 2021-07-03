import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";

const StyledDashboardSubmission = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
  }
`;

const StyledForm = styled.form`
  margin: 1rem;
`;

function DashboardSubmission(props) {
  const [userID, setUserID] = useState("");
  const [coinName, setCoinName] = useState("");
  const [exchange, setExchange] = useState("");
  const [quantity, setQuantity] = useState("");
  const [averagePrice, setAveragePrice] = useState("");

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      const user = JSON.parse(userLoggedIn);
      setUserID(user['userID']);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const submission = { userID: userID, coinName: coinName, exchange: exchange, quantity: quantity, averagePrice: averagePrice};
    fetch('http://127.0.0.1:5000/api/new-coin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(submission),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      });
  }

  function updateValues(e) {
    if (e.target.id === "coin-name") {
      setCoinName(e.target.value);
    } else if (e.target.id === "exchange") {
      setExchange(e.target.value);
    } else if (e.target.id === "quantity") {
      setQuantity(e.target.value);
    } else if (e.target.id === "average-price") {
      setAveragePrice(e.target.value);
    }
  }

  return (
    <StyledDashboardSubmission>
      <Header />
      <p>New Coin</p>
      <StyledForm onSubmit={handleSubmit}>
          <label>Coin Name</label>
          <input id="coin-name" type="text" onChange={updateValues}></input>
          <p></p>
          <label>Exchange</label>
          <input id="exchange" type="text" onChange={updateValues}></input>
          <p></p>
          <label>Quantity</label>
          <input id="quantity" type="text" onChange={updateValues}></input>
          <p></p>
          <label>Average Price</label>
          <input id="average-price" type="text" onChange={updateValues}></input>
          <p></p>
          <button>Submit</button>
      </StyledForm>
    </StyledDashboardSubmission>
  );
}

export default withRouter(DashboardSubmission);
