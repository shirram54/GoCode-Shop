import React, { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(false);

  return (
    <div>
      <button className="btn" onClick={() => setCount(!count)}>
        Ordering today?
      </button>
      {count && (
        <div className="di">Getting the shipment on the next business day!</div>
      )}
    </div>
  );
}

export default Counter;
