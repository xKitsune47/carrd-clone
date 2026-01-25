"use client";

import React, { useEffect, useState } from "react";

const Loading = () => {
  const [dots, setDots] = useState<number>(1);
  const [dotInterval, setDotInterval] = useState(
    setInterval(() => {
      setDots(dots + 1);
    }, 500)
  );

  useEffect(() => {
    return clearTimeout(dotInterval);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      Loading{".".repeat(dots % 3)}
    </div>
  );
};

export default Loading;
