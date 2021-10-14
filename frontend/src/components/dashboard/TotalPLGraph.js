import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function TotalPLGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    const currentUser = JSON.parse(userLoggedIn);

    // determine the environment and use appropriate url for fetch
    let url = "";
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/api/get-total-pls";
    } else {
      url = "https://exchangetracker.net/api/get-total-pls";
    }

    // retrieves all of the data to be displayd on the dashboard
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userID: currentUser["userID"] }),
    })
      .then((res) => res.json())
      .then((res) => {
        for (const element of res) {
          const datetime = element["dateAdded"].split(" ");
          const yymmdd = datetime[0].split("-");
          element["dateAdded"] = yymmdd;
        }
        const userTotalPLs = res.map((elem) => {
          return {
            name: elem["dateAdded"].join("/"),
            value: parseFloat(elem["totalPL"]),
          };
        });
        setData(userTotalPLs);

      });
  }, []);

  return (
    <LineChart width={700} height={400} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {data[data.length - 1].value >= data[0].value ? (
        <Line type="monotone" dataKey="value" stroke="#00ce2a" />
      ) : (
        <Line type="monotone" dataKey="value" stroke="#ba2d13" />
      )}
    </LineChart>
  );
}
export default TotalPLGraph;
