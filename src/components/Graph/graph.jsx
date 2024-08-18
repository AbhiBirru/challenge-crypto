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
  ReferenceLine,
} from "recharts";
import "./graph.css";

const Graph = ({ duration }) => {
  const [loading, setLoading] = useState("idle");
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

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

  const handleMouseMove = (e) => {
    if (e && e.activePayload && e.activePayload.length > 0) {
      setActiveIndex(e.activeTooltipIndex);
    }
  };

  return (
    <div className="graph-main">
      {loading === "error" ? (
        <p>Something went wrong!: {error}</p>
      ) : loading === "idle" || loading === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div style={{ position: "relative" }}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={graphData} onMouseMove={handleMouseMove}>
              <CartesianGrid stroke="#E2E4E7" />
              <XAxis dataKey="timestamp" tick={false} />
              <YAxis
                dataKey="price"
                tickFormatter={(val) => `$${val}`}
                domain={[
                  (dataMin) => dataMin * 0.95,
                  (dataMax) => dataMax * 1.05,
                ]}
                tick={false}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    activeIndex={activeIndex}
                    graphData={graphData}
                  />
                }
                cursor={false}
              />
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
              {/* <BarChart data={graphData} height={50} barSize={500} fill="black">
                <Bar dataKey="volume" fill="black" />
              </BarChart> */}
              {/* <Line
                type="monotone"
                dataKey="price"
                stroke="#4B40EE"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUv)"
                hide
              /> */}
              {activeIndex !== null && (
                <>
                  <ReferenceLine
                    x={graphData[activeIndex]?.timestamp}
                    stroke="gray"
                    strokeDasharray="3 3"
                  />
                  <ReferenceLine
                    y={graphData[activeIndex]?.price}
                    stroke="gray"
                    strokeDasharray="3 3"
                  />
                </>
              )}
              {activeIndex !== null && (
                <text
                  x={graphData[activeIndex]?.timestamp}
                  y={graphData[activeIndex]?.price}
                  dy={-10}
                  dx={10}
                  fill="#8884d8"
                  fontSize={14}
                  textAnchor="middle"
                >
                  {`$${graphData[activeIndex]?.price.toFixed(2)}`}
                </text>
              )}
            </ComposedChart>
          </ResponsiveContainer>
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              width: "93.5%",
              left: "60px",
            }}
          >
            <ResponsiveContainer
              className="bargraph-container"
              width="100%"
              height={70}
            >
              <BarChart
                className="bargraph-chart"
                data={graphData}
                barSize={500}
                barGap={50} /* Adjusts gap between individual bars */
                barCategoryGap="50%" /* Adjusts gap between groups of bars, if any */
              >
                <Bar dataKey="volume" fill="lightgrey" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomTooltip = ({ activeIndex, graphData }) => {
  if (activeIndex !== null && graphData[activeIndex]) {
    const { price, timestamp } = graphData[activeIndex];
    return (
      <div className="price-label" style={{ background: "#1A243A" }}>
        <p>{`${price.toLocaleString()}`}</p>
        {/* <p>{`Date: ${timestamp}`}</p> */}
      </div>
    );
  }
  return null;
};

export default Graph;
