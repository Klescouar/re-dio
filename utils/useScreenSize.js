import { useState, useEffect } from "react";
const SMALL = "small";
const MEDIUM = "medium";
const LARGE = "large";

const BREAKPOINTS = {
  [SMALL]: 0,
  [MEDIUM]: 769,
  [LARGE]: 1025,
};

export const getScreenSize = (width, breakpoints = BREAKPOINTS) => {
  return Object.keys(breakpoints)
    .filter((key) => {
      const breakpointKey = key;
      return width >= breakpoints[breakpointKey];
    })
    .reduce((keyToKeep, key) => {
      const keyToKeepBreakPoint = keyToKeep;
      const keyBreakpoint = key;
      return breakpoints[keyToKeepBreakPoint] > breakpoints[keyBreakpoint]
        ? keyToKeepBreakPoint
        : keyBreakpoint;
    }, SMALL);
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(LARGE);

  const handleResize = () => {
    setScreenSize(getScreenSize(window.innerWidth));
  };

  useEffect(() => {
    // Trigger a calculation once page is loaded
    handleResize();

    window.addEventListener("resize", handleResize);
    // This function is called on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
