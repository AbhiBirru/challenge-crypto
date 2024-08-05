import "./tab.css";

const Tab = () => {
  return (
    <div className="tab-main">
      <div className="tab-list">
        <p>Summary</p>
        <p style={{ color: "#1a243a" }} className="active">
          Chart
        </p>
        <p>Statistics</p>
        <p>Analysis</p>
        <p>Settings</p>
      </div>
      <div className="border-line"></div>
    </div>
  );
};

export default Tab;
