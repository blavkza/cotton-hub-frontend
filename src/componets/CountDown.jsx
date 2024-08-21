import React, { useEffect, useState } from "react";

const CountDown = () => {
  const [timeleft, setTimeleft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeleft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date("2024-07-19") - +new Date();

    if (difference > 0) {
      const dayslest = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { dayslest, hours, minutes, seconds };
    } else {
      return { dayslest: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  const timerComponents = (
    <div className="flex items-center justify-between">
      {timeleft.dayslest ?
        <span className="text-xm pr-1">
        {timeleft.dayslest}
        {timeleft.dayslest > 1 ? "days" : "day" }
      </span>: null
      }
      <span className="rounded-full p-1 bg-red-600">
        {timeleft.hours.toString().padStart(2, "0")}:
        {timeleft.minutes.toString().padStart(2, "0")}:
        {timeleft.seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );

  return (
    <div>
      {timeleft.dayslest > 0 ? (
        timerComponents
      ) : (
        <span className="text-red text-[12px]">Time is Up!!</span>
      )}
    </div>
  );
};

export default CountDown;
