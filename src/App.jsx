import "./App.css";
import CurrentPrice from "./components/CurrentPrice/currentPrice";
import Graph from "./components/Graph/graph";
import Tab from "./components/Tab/tab";
import Tools from "./components/Tools/tools";

function App() {
  return (
    <>
      <div>
        <CurrentPrice />
        <Tab />
        <Tools />
        <Graph />
      </div>
    </>
  );
}

export default App;
