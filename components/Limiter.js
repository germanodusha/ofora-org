export const Limiter = ({ children }) => (
  <>
  <div className="Limiter">
    <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
      {children}
    </div>
    </div>
    <style jsx>{`
      .Limiter {
        overflow-x: hidden;
      }
    `}</style>
  </>
);
