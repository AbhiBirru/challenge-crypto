import { timelines } from "../../lib/constants";
import "./tools.css";

const Tools = ({ data, handler }) => {
  return (
    <div className="tools-main">
      <div>
        <div className="fullscreen">
          {fullIcon}
          <a href="/">Fullscreen</a>
        </div>
        <div className="compare">
          {comapreIcon}
          <a href="/">Compare</a>
        </div>
      </div>
      <div className="time-line">
        {timelines.map((timeline) => (
          <span
            onClick={() => handler(timeline)}
            className={timeline.key === data ? "active-time" : ""}
            style={timeline.key === data ? { color: "#fff" } : {}}
            key={timeline.key}
          >
            {timeline.key}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tools;

const fullIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15 3H21V9"
      stroke="#6F7177"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 21H3V15"
      stroke="#6F7177"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21 3L14 10"
      stroke="#6F7177"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 21L10 14"
      stroke="#6F7177"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const comapreIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#6F7177"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 8V16"
      stroke="#6F7177"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 12H16"
      stroke="#6F7177"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
