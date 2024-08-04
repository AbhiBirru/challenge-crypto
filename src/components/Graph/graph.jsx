import "./graph.css";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Area,
  ComposedChart,
} from "recharts";

const Graph = ({ duration }) => {
  const apiKey = import.meta.env.VITE_COIN_GECKO_API_KEY;
  const apiHost = import.meta.env.VITE_CON_GECKO_API_CURL_HOST;
  const [loading, setLoading] = useState("idle");
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": apiKey,
      },
    };

    setLoading("loading");
    fetch(`${apiHost}/coins/bitcoin/market_chart?days=${duration}`, options)
      .then((response) => response.json())
      .then((response) => {
        setLoading("success");
        if (
          response &&
          response.prices &&
          response.market_caps &&
          response.total_volumes
        ) {
          setGraphData((prev) => {
            const newdata = response.prices.map((price, index) => ({
              timestamp: price[0],
              price: price[1],
              marketCap: response.market_caps[index][1],
              volume: response.total_volumes[index][1],
            }));
            setLoading("success");

            return newdata;
          });
        }
      })
      .catch((err) => setLoading("error"));
  }, [duration]);

  return (
    <div className="graph-main">
      {loading === "error" ? (
        <p>Something went wrong!, Please try again later after sometime</p>
      ) : loading === "idle" || loading === "loading" ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={graphData}>
            <CartesianGrid stroke="#E2E4E7" />
            <XAxis dataKey="timestamp" tick={false} axisLine={false} />
            <YAxis tick={false} axisLine={false} />
            <Tooltip />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E8E7FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="price"
              stroke="#4B40EE"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Bar dataKey="timestamp" barSize={2} fill="#b2bec3" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Graph;
