import { useRef } from "react";
import useScrollPosition from "./useScrollPosition";

const useElementVisible = (param) => {
  const scrollPosition = useScrollPosition();
  const ref = useRef();

  const isVisible = ref.current
    ? scrollPosition > ref.current.offsetTop + (param?.offset || 0)
    : false;

  return [ref, isVisible];
};

export default useElementVisible;
