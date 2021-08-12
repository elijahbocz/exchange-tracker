import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Header from "../Header";
import Footer from "../Footer";

const StyledEntry = styled.div`
  padding: 1rem;
  text-align: center;
  h1 {
    font-size: 3rem;
  }

  .error {
    color: red;
  }
`;

const StyledForm = styled.form`
  background: #ebf5ee;
  padding: 1rem;
  margin: 1rem 20%;

  button {
    background: #bfa89e;
    border-radius: 6px;
    color: #fff;
    padding: 0.5rem;
    text-align: center;
  }
  button:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const StyledInputGroup = styled.div`
  padding: 0.75rem;
  text-align: left;

  label {
    color: #283044;
    padding-right: rem;
  }

  input {
    background: #fff;
    padding: 0.5rem 0 0.5rem 0.5rem;
    width: 100%;
  }
`;

function Entry(props) {
  const [userID, setUserID] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [exchange, setExchange] = useState("");
  const [quantity, setQuantity] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [error, setError] = useState("");
  const [coins, setCoins] = useState([]);
  const [validExchanges, setValidExchanges] = useState([]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      const parsedUser = JSON.parse(userLoggedIn);
      setUserID(parsedUser.userID);
      fetch("http://165.22.183.86/api/get-lists", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCoins(res.coins);
          setValidExchanges(res.exchanges);
        });
    }
  }, []);

  function isNumeric(input) {
    if (typeof input != "string") {
      return false;
    }
    return !isNaN(input) && !isNaN(parseFloat(input));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundCoin = coins.find(
      (coin) =>
        coin.coinSymbol === coinSymbol && !coin.coinName.includes("Binance")
    );
    const foundExchange = validExchanges.find(
      (validExchange) =>
        validExchange.exchangeName.toLowerCase() === exchange.toLowerCase()
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
    } else if (foundExchange === undefined) {
      setError("Invalid Exchange Name");
    } else if (!isNumeric(quantity) || !isNumeric(averagePrice)) {
      setError("Quantity and Average Price must be valid numbers");
    } else if (parseFloat(quantity) < 0 || parseFloat(averagePrice) < 0) {
      setError("Quantity and Average Price can not be negative");
    } else {
      const submission = {
        coinID: foundCoin.coinID,
        userID: userID,
        coinName: foundCoin.coinName,
        coinSymbol: coinSymbol,
        exchange: foundExchange.exchangeName,
        quantity: quantity,
        averagePrice: averagePrice,
      };
      fetch("https://exchangetracker.net/api/new-coin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(submission),
      })
        .then((res) => res.json())
        .then(() => {
          console.log("TESTSTSTSTS");
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
    <div className="entry-wrapper">
      <Helmet>
        <title>New Entry</title>
      </Helmet>
      <Header />
      <StyledEntry>
        <p>New Coin</p>
        <p className="error">{error}</p>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInputGroup>
            <label>Coin Symbol (btc, eth, ...)</label>
            <input id="coin-symbol" type="text" onChange={updateValues}></input>
          </StyledInputGroup>
          <StyledInputGroup>
            <label>Exchange</label>
            <input id="exchange" type="text" onChange={updateValues}></input>
          </StyledInputGroup>
          <StyledInputGroup>
            <label>Quantity</label>
            <input id="quantity" type="text" onChange={updateValues}></input>
          </StyledInputGroup>
          <StyledInputGroup>
            <label>Average Price</label>
            <input
              id="average-price"
              type="text"
              onChange={updateValues}
            ></input>
          </StyledInputGroup>
          <button>Submit</button>
        </StyledForm>
      </StyledEntry>
      <Footer />
    </div>
  );
}

export default withRouter(Entry);
