import { useState } from "react";
import "./styles.css";

export default function App() {
  const [poll, setPoll] = useState([
    { id: 1, count: 0, per: 0, name: "Option A" },
    { id: 2, count: 0, per: 0, name: "Option B" },
    { id: 3, count: 0, per: 0, name: "Option C" },
    { id: 4, count: 0, per: 0, name: "Option D" },
  ]);

  const clickHandler = (id) => {
    setPoll((prev) => {
      const newPoll = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count + 1,
            per: findPercent(item.count + 1),
          };
        }

        return { ...item, per: findPercent(item.count) };
      });
      return newPoll;
    });
  };

  const totalCount = poll.reduce((acc, cv) => cv.count + acc, 1);
  const findPercent = (count) => {
    return Math.floor((count / totalCount) * 100);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {poll.map((item) => (
        <div
          key={item.id}
          className="Option"
          onClick={() => clickHandler(item.id)}
          style={{
            background: `linear-gradient(to right, red ${item.per}%, white ${
              100 - item.per
            }%)`,
          }}
        >
          {item.name} : {item.per}
        </div>
      ))}
      <h5>Total vote: {totalCount - 1}</h5>
    </div>
  );
}

//https://medium.com/@nitesh.jha15/a-pole-widget-built-with-react-js-no-third-party-libraries-used-91806fa8aae3
