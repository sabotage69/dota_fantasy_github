import React, { useState, useEffect } from "react";

function UTClock() {
  const [time, setTime] = useState(
    new Date().toISOString().slice(11, 19) +
      " " +
      new Date().toISOString().slice(8, 10) +
      "/" +
      new Date().toISOString().slice(5, 7)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toISOString().slice(11, 19) +
          " " +
          new Date().toISOString().slice(8, 10) +
          "/" +
          new Date().toISOString().slice(5, 7)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="utc-clock">
      <p dangerouslySetInnerHTML={{ __html: time }} />
    </div>
  );
}

export default UTClock;
