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
  LabelList,
} from "recharts";
import "./graph.css";

const Graph = ({ duration }) => {
  const [loading, setLoading] = useState("idle");
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading("loading");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${parseInt(
            duration
          )}`
        );
        const data = await response.json();
        if (data && data.prices && data.market_caps && data.total_volumes) {
          const newdata = data.prices.map((price, index) => ({
            timestamp:
              duration == 1
                ? new Date(price[0]).toLocaleTimeString()
                : new Date(price[0]).toLocaleDateString(),
            price: price[1],
            marketCap: data.market_caps[index][1],
            volume: data.total_volumes[index][1],
            x: price[0],
          }));
          setGraphData(newdata);
          setLoading("success");
        } else {
          setError("Invalid API response");
          setLoading("error");
        }
      } catch (err) {
        setError(err.message);
        setLoading("error");
      }
    };
    fetchGraphData();
  }, [duration]);

  return (
    <div className="graph-main">
      {loading === "error" ? (
        <p>Something went wrong!: {error}</p>
      ) : loading === "idle" || loading === "loading" ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={graphData}>
            <CartesianGrid stroke="#E2E4E7" />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="price" tickFormatter={(val) => `$${val}`} />
            <Tooltip content={<CustomTooltip />} />
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
            {/* <Bar dataKey="x" barSize={5} fill="#b2bec3" /> */}
            {/* <Bar dataKey="x" barSize={5} radius={[5, 5, 0, 0]} fill="#b2bec3" /> */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4B40EE"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
              hide
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const CustomTooltip = ({ payload, label }) => {
  if (payload && payload.length) {
    const price = payload[0].value;
    return (
      <div>
        <p>{`Date: ${label}`}</p>
        <p>{`Price: $${price.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default Graph;
