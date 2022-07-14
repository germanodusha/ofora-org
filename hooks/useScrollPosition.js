import {useState, useEffect} from "react"

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [height, setHeight] = useState(0);
  
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    const handleWindowSize = () => {
      setHeight(window.innerHeight);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleWindowSize, { passive: true });
      setHeight(window.innerHeight);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleWindowSize);
      };
    }, []);

    return scrollPosition
}

export default useScrollPosition;