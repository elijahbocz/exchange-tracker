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

  // up to 768px
  @media screen and (max-width: 767.98px) {
    padding: 0.5rem;
    margin: 1rem 5%;
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
    width: 97%;
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
  // const otherValidExchanges = ["paypal", "coinbase", "robin hood", "robinhood"];

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      // the user ID is needed in the POST request
      const parsedUser = JSON.parse(userLoggedIn);
      setUserID(parsedUser.userID);

      // determine the environment and use appropriate url for fetch
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/api/get-lists";
      } else {
        url = "https://exchangetracker.net/api/get-lists";
      }

      // fetches the list of available coins and exchanges to be check against in the form
      fetch(url, {
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

  // function used to ensure the values in the average price and quantity are numeric
  function isNumeric(input) {
    if (typeof input != "string") {
      return false;
    }
    return !isNaN(input) && !isNaN(parseFloat(input));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // checks the user input coin name against the valid list of coin names
    // if the user input is valid, the valid coin name will be stored and used
    const foundCoin = coins.find(
      (coin) =>
        coin.coinSymbol === coinSymbol && !coin.coinName.includes("Binance")
    );

    // similar process of validating the user input exchange
    let foundExchange = validExchanges.find(
      (validExchange) =>
        validExchange.exchangeName.toLowerCase() === exchange.toLowerCase()
    );
    // if (foundExchange === undefined) {
    //   foundExchange = otherValidExchanges.find((otherValidExchange) =>
    //     otherValidExchange === exchange.toLowerCase()
    //   );
    // }

    // validate the fields are not empty
    if (
      coinSymbol === "" ||
      exchange === "" ||
      quantity === "" ||
      averagePrice === ""
    ) {
      setError("Fields can not be empty");
    }
    // validate the coin name is valid,
    // undefined means the coin is not found in list of valid coin names
    else if (foundCoin === undefined) {
      setError("Invalid Coin Symbol");
    }
    // similiar validation as above on exchange name
    else if (foundExchange === undefined) {
      setError("Invalid Exchange Name");
    } 
    // validate the quantity and average price input are valid
    else if (!isNumeric(quantity) || !isNumeric(averagePrice)) {
      setError("Quantity and Average Price must be valid numbers");
    } 
    // validate the quantity and average price are not negative numbers
    else if (parseFloat(quantity) < 0 || parseFloat(averagePrice) < 0) {
      setError("Quantity and Average Price can not be negative");
    } 
    // otherwise, inputs are valid
    else {
      // create the submission object to be sent in the POST request
      const submission = {
        coinID: foundCoin.coinID,
        userID: userID,
        coinName: foundCoin.coinName,
        coinSymbol: coinSymbol,
        exchange: foundExchange.exchangeName,
        quantity: quantity,
        averagePrice: averagePrice,
      };

      // determine the environment and use appropriate url for fetch
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/api/new-coin";
      } else {
        url = "https://exchangetracker.net/api/new-coin";
      }

      // send the POST request to create a new entry in the database
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(submission),
      })
        .then((res) => res.json())
        .then(() => {
          // redirect to dashboard
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
