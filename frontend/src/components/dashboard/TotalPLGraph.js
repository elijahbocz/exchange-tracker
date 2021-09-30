import React, { useEffect, useState } from "react";
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart";

let userTotalPLs = [];

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

function TotalPLGraph() {

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
        console.log("res");
        console.log(res);
        userTotalPLs = res.map((elem) => {
          return { x: elem["dateAdded"], y: elem["totalPL"] };
        });
        console.log(userTotalPLs);
      });
  }, []);

  return (
    <XYChart height={300} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedAxis orientation="left" />
      <AnimatedGrid columns={false} numTicks={4} />
      <AnimatedLineSeries dataKey="Line 1" data={userTotalPLs} {...accessors} />
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {", "}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  );
}
export default TotalPLGraph;
