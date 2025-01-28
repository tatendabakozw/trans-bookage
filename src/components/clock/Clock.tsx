import { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Set initial time once the component mounts
    setCurrentTime(new Date().toLocaleTimeString());

    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="col-span-1 text-4xl font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900  w-full h-full text-center p-4 grid items-center content-center rounded-xl">
      {currentTime}
    </div>
  );
};

export default Clock;