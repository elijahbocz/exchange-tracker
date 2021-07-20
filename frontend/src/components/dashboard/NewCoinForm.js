import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";

const StyledDashboardSubmission = styled.div`
  text-align: center;
  h1 {
    font-size: 3rem;
  }

  .error {
    color: red;
  }
`;

const StyledForm = styled.form`
  padding: 1rem;
  label {
    padding-right: 2rem;
  }

  input {
    width: 15rem;
  }
`;

function DashboardSubmission(props) {
  const [coinID, setCoinID] = useState("");
  const [userID, setUserID] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [exchange, setExchange] = useState("");
  const [quantity, setQuantity] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [error, setError] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      const parsedUser = JSON.parse(userLoggedIn);
      setUserID(parsedUser.userID);
      fetch("http://127.0.0.1:5000/api/get-coins-list", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCoins(res);
        });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const foundCoin = coins.find(
      (coin) =>
        coin.coinSymbol === coinSymbol && !coin.coinName.includes("Binance")
    );

    if (
      coinSymbol === "" ||
      exchange === "" ||
      quantity === "" ||
      averagePrice === ""
    ) {
      setError("Fields can not be empty");
    } else if (foundCoin === undefined) {
      setError("Invalid Coin Symbol");
    } else if (quantity < 0 || averagePrice < 0) {
      setError("Values can not be negative");
      // TODO: CHECK IF QUANTITY AND AVG PRICE ARE NUMBERS
    } else {
      const submission = {
        coinID: foundCoin.coinID,
        userID: userID,
        coinName: foundCoin.coinName,
        coinSymbol: coinSymbol,
        exchange: exchange,
        quantity: quantity,
        averagePrice: averagePrice,
      };
      fetch("http://127.0.0.1:5000/api/new-coin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(submission),
      })
        .then((res) => res.json())
        .then((res) => {
          props.history.push("/dashboard");
        });
    }
  }

  function updateValues(e) {
    if (e.target.id === "coin-symbol") {
      setCoinSymbol(e.target.value.toLowerCase());
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
      <p className="error">{error}</p>
      <StyledForm onSubmit={handleSubmit}>
        <label>Coin Symbol</label>
        <input id="coin-symbol" type="text" onChange={updateValues}></input>
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
