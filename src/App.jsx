import "./App.css";
import CurrentPrice from "./components/CurrentPrice/currentPrice";
import Graph from "./components/Graph/graph";
import Tab from "./components/Tab/tab";
import Tools from "./components/Tools/tools";
import { useState } from "react";
import { timelines } from "./lib/constants";

function App() {
  const [time, setTime] = useState(timelines[0]);

  return (
    <>
      <div>
        <CurrentPrice />
        <Tab />
        <Tools data={time.key} handler={setTime} />
        <Graph duration={time.duration} />
      </div>
    </>
  );
}

export default App;
