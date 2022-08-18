import { useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import useScrollPosition from "./useScrollPosition";

const useElementVisible = (param) => {
  const scrollPosition = useScrollPosition();
  const windowSize = useWindowSize()
  const ref = useRef();
  const offset = param?.offset || 0;
  const position = ref.current?.getBoundingClientRect().top - windowSize.height

  const isVisible = ref.current && scrollPosition
    ? position < 0 - offset
    : false;

  console.log(ref.current?.getBoundingClientRect().top - windowSize.height);
  return [ref, isVisible];
};

export default useElementVisible;
