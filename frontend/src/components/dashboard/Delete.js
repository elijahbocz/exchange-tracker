import React, { useEffect, useState, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Header from "../Header";
import Footer from "../Footer";
import useWindowDimensions from "./useWindowDimensions";

const StyledDelete = styled.div`
  padding: 1rem;
  text-align: center;

  .error {
    color: #ba2d13;
  }

  .rowNotToBeDeleted {
    background: #ebf5ee;
    margin: 1rem;
    padding: 0.5rem;
  }

  .rowNotToBeDeleted p {
    padding: 0.25rem;
  }

  .rowToBeDeleted {
    background: #c49991;
    color: #fff;
    margin: 1rem;
    padding: 0.5rem;
  }

  .rowToBeDeleted p {
    padding: 0.25rem;
  }
`;

const StyledForm = styled.form`
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

const StyledTable = styled.table`
  background: #ebf5ee;
  border-collapse: collapse;
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

  .rowToBeDeleted {
    border: none;
    background: #c49991;
    color: #fff;
  }
`;

const StyledCard = styled.div`
`;

function Delete(props) {
  const [username, setUsername] = useState("");
  const [toDelete, setToDelete] = useState([]);
  const [error, setError] = useState("");
  const rowRefs = useRef([]);
  const [data, setData] = useState({
    coins: [],
    totalPL: 0,
  });
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      props.history.push("/login");
    } else {
      const currentUser = JSON.parse(userLoggedIn);
      setUsername(currentUser["username"]);
      fetch("https://exchangetracker.net/api/get-dashboard", {
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(toDelete);
    if (toDelete.length === 0) {
      setError("No coins selected, nothing was deleted");
    } else {
      const submission = {
        toDelete: toDelete,
      };
      fetch("http://127.0.0.1:5000/api/delete-coin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(submission),
      })
        .then((res) => res.json())
        .then(() => {
          props.history.push("/dashboard");
        });
    }
  }

  // handles
  const handleChange = (i) => (e) => {
    const eTar = e.target;
    if (!toDelete.includes(eTar.value)) {
      let newToDelete = [...toDelete];
      newToDelete[i + 1] = eTar.value;
      setToDelete(newToDelete);
      toggleDeleteDisplay(e);
    } else {
      let newToDelete = toDelete.filter((el) => el != eTar.value);
      setToDelete(newToDelete);
      toggleDeleteDisplay(e);
    }
  };

  function toggleDeleteDisplay(e) {
    const rowToBeDeleted = rowRefs.current.find(
      (el) => el.id === e.target.value
    );
    if (!toDelete.includes(rowToBeDeleted.id)) {
      rowToBeDeleted.className = "rowToBeDeleted";
    } else {
      rowToBeDeleted.className = "rowNotToBeDeleted";
    }
  }

  return (
    <div className="dashboard-wrapper">
      <Helmet>
        <title>Delete Coin</title>
      </Helmet>
      <Header />
      <StyledDelete>
        <p>Select the coins to delete:</p>
        <p className="error">{error}</p>
        {width > 767.8 ? (
          <StyledForm onSubmit={handleSubmit}>
            <StyledTable>
              <tr>
                <th>Coin Name</th>
                <th>Exchange</th>
                <th>Quantity</th>
                <th>Average Price</th>
                <th>Delete</th>
              </tr>
              {data.coins.map((coin, i) => (
                <tr
                  key={coin.coinID + coin.quantity}
                  id={coin.coinID}
                  ref={(el) => (rowRefs.current[i] = el)}
                >
                  <td>{coin.coinName}</td>
                  <td>{coin.exchange}</td>
                  <td>{coin.quantity}</td>
                  <td>{coin.averagePrice}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={coin.coinID}
                      onChange={handleChange(i)}
                    ></input>
                  </td>
                </tr>
              ))}
            </StyledTable>
            <button>Submit</button>
          </StyledForm>
        ) : (
          <StyledForm>
            {data.coins.map((coin, i) => (
              <StyledCard
                key={coin.coinID + coin.quantity}
                id={coin.coinID}
                className="rowNotToBeDeleted"
                ref={(el) => (rowRefs.current[i] = el)}
              >
                <p>Coin Name: {coin.coinName}</p>
                <p>Exchange: {coin.exchange}</p>
                <p>Quantity: {coin.quantity}</p>
                <p>Average Price: {coin.averagePrice}</p>
                <p>
                  Delete:{" "}
                  <input
                    type="checkbox"
                    value={coin.coinID}
                    onChange={handleChange(i)}
                  ></input>
                </p>
              </StyledCard>
            ))}
            <button>Submit</button>
          </StyledForm>
        )}
      </StyledDelete>
      <Footer />
    </div>
  );
}

export default withRouter(Delete);
