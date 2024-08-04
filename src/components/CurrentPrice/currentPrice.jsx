import "./current.css";

const CurrentPrice = () => {
  return (
    <div className="current-main">
      <div className="current-main--item">
        <div className="price">63,179.71</div>
        <div className="currency">USD</div>
      </div>
      <div className="pl">+2,162.42 (3.54%)</div>
    </div>
  );
};

export default CurrentPrice;
