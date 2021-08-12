import React, { useEffect, useState, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Header from "../Header";
import Footer from "../Footer";

const StyledDelete = styled.div`
  padding: 1rem;
  text-align: center;
`;

const StyledForm = styled.form``;

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
    background: #ba2d13;
    
  }
`;

function Delete(props) {
  const [username, setUsername] = useState("");
  const rowRefs = useRef([]);
  const [data, setData] = useState({
    coins: [],
    totalPL: 0,
  });
  const [toDelete, setToDelete] = useState([]);

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
    }
  }, []);

  function handleSubmit() {
    
  }

  const handleChange = i => e => {
    const eTar = e.target;
    if (!toDelete.includes(eTar.value)) {
      let newToDelete = [...toDelete];
      newToDelete[i + 1] = eTar.value;
      setToDelete(newToDelete);
      toggleDeleteDisplay(e);
    } else {
      let newToDelete = toDelete.filter(el => el != eTar.value);
      setToDelete(newToDelete);
      toggleDeleteDisplay(e);
    }
  }

  function toggleDeleteDisplay(e) {
    const rowToBeDeleted = rowRefs.current.find(el => el.id === e.target.value);
    console.log(rowToBeDeleted);
    if (!toDelete.includes(rowToBeDeleted.id)) {
      rowToBeDeleted.className = "rowToBeDeleted";
    } else {
      rowToBeDeleted.className = "";
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
              <tr key={coin.coinID + coin.quantity} id={coin.coinID} ref={(el) => (rowRefs.current[i] = el)}>
                <td>{coin.coinName}</td>
                <td>{coin.exchange}</td>
                <td>{coin.quantity}</td>
                <td>{coin.averagePrice}</td>
                <td><input type="checkbox" value={coin.coinID} onChange={handleChange(i)}></input></td>
              </tr>
            ))}
          </StyledTable>
          <button>Submit</button>
        </StyledForm>
      </StyledDelete>
      <Footer />
    </div>
  );
}

export default withRouter(Delete);
