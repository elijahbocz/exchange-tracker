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
    border-radius: 6px;
    margin: 1rem;
    padding: 0.5rem;
  }

  .rowNotToBeDeleted p {
    padding: 0.25rem;
  }

  .rowToBeDeleted {
    background: #c49991;
    border-radius: 6px;
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
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/api/get-dashboard";
      } else {
        url = "https://exchangetracker.net/api/get-dashboard";
      }
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

  function handleSubmit(e) {
    e.preventDefault();

    // if nothing was selected to delete, nothing needs to be done
    if (toDelete.length === 0) {
      setError("No coins selected, nothing was deleted");
    } else {
      // otherwise, create an object with the array of deleted items nested in it
      const submission = {
        toDelete: toDelete,
      };

      // determine the environment and use appropriate url for fetch
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/api/delete-coin";
      } else {
        url = "https://exchangetracker.net/api/delete-coin";
      }

      // POST the coins to be deleted to the backend
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(submission),
      })
        .then((res) => res.json())
        .then(() => {
          // redirect to the dashboard after sending request
          props.history.push("/dashboard");
        });
    }
  }

  // handles change in the checkboxes, 
  // i represents the index of the card rendered for coin data
  const handleChange = (i) => (e) => {
    const eTar = e.target;
    // if the array of items to be deleted does not contain the
    // checkboxes value (which is equal to the coin's ID),
    // the array should be updated to include this value
    if (!toDelete.includes(eTar.value)) {
      // create a new array to be set as the items to be deleted
      let newToDelete = [...toDelete];
      // NOTE: originally this was i + 1, but I don't think it's necessary...
      newToDelete[i] = eTar.value;
      setToDelete(newToDelete);
      toggleDeleteDisplay(e);
    } else {
      // otherwise, the item has been deselected, remove this item
      // by filering the array for all values expect the target value
      let newToDelete = toDelete.filter((el) => el != eTar.value);
      setToDelete(newToDelete);
      toggleDeleteDisplay(e);
    }
  };

  // function to add/subtract styled classes to items to be deleted
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
