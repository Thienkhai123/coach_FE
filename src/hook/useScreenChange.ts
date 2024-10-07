import { useState } from "react";

const useScreenChange = () => {
  const [screen, setScreen] = useState(1);
  const nextScreen = () => {
    setScreen(screen + 1);
  };
  const prevScreen = () => {
    setScreen(screen - 1);
  };
  return {
    screen,
    nextScreen,
    prevScreen,
  };
};

export default useScreenChange;
