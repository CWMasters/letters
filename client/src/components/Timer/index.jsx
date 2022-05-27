import React, { useState, useEffect } from "react";

function Timer() {
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
      return;
    }, 1000);
  });

  return <div className="timer">{counter}</div>;
}

export default Timer;
