import { useEffect, useState } from "react";
import "./current.css";

const durationKeyMap = {
  7: ["price_change_percentage_7d", "price_change_percentage_7d_in_currency"],
  30: [
    "price_change_percentage_30d",
    "price_change_percentage_30d_in_currency",
  ],
  365: ["price_change_percentage_1y", "price_change_percentage_1y_in_currency"],
  1: ["price_change_percentage_24h", "price_change_percentage_24h_in_currency"],
  180: [
    "price_change_percentage_200d",
    "price_change_percentage_200d_in_currency",
  ],
  max: ["ath", "atl_change_percentage"],
};

const CurrentPrice = ({ duration }) => {
  const [coinData, setCoinData] = useState();

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const url =
          "https://api.coingecko.com/api/v3/coins/bitcoin?vs_currency=usd";
        const response = await fetch(url);
        const data = await response.json();
        setCoinData(data);
      } catch (err) {}
    };
    fetchGraphData();
  }, [duration]);

  const percentage =
    duration == "max"
      ? coinData?.market_data[durationKeyMap[duration][0]].usd
      : coinData?.market_data[durationKeyMap[duration][0]];
  const val = coinData?.market_data[durationKeyMap[duration][1]].usd;

  return (
    <div className="current-main">
      <div className="current-main--item">
        <div className="price">{coinData?.market_data.current_price.usd}</div>
        <div className="currency">USD</div>
      </div>
      <div className="pl" style={{ color: percentage > 0 ? "" : "red" }}>
        {val} ({percentage}%)
      </div>
    </div>
  );
};

export default CurrentPrice;
