import useElementVisible from "../hooks/useElementVisible";

const FadeIn = ({ children, offset = 100, delay = 0.2, ...props }) => {
  const [ref, isVisible] = useElementVisible({ offset });

  return (
    <div ref={ref} className={`fade ${isVisible && "visible"}`} {...props}>
      {children}
      <style jsx>{`
        .fade {
          transition: all 0.8s ease-in-out 1s;
          opacity: 0;
          transform: translateY(80px);
        }
        .fade.visible {
          opacity: 1;
          transition: all 0.8s ease-in-out ${delay}s;
          transform: none;
        }
      `}</style>
    </div>
  );
};

export default FadeIn;
