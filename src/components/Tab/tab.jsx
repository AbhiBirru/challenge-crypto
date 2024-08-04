import "./tab.css";

const Tab = () => {
  return (
    <div className="tab-main">
      <div className="tab-list">
        <a href="/">Summary</a>
        <a href="/">Chart</a>
        <a href="/">Statistics</a>
        <a href="/">Analysis</a>
        <a href="/">Settings</a>
      </div>
      <div className="border-line"></div>
    </div>
  );
};

export default Tab;
