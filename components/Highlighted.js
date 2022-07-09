const Highlighted = ({color="white", children})=>{
    return(
        <div className="main">
            {children}
            <style jsx>{`
                .main{
                    z-index:1000000;
                }
                * {
                    position: relative;
                    font-weight: normal;
                }
                *::before {
                    content: "";
                    position: absolute;
                    top: 10px;
                    left: 3px;
                    right: 100%;
                    bottom: 2px;
                    background: ${color};
                    border-radius: 2px;
                    z-index: -1;
                    opacity: 1;
                    filter: blur(3px);
                    transition: 0.5s all;
                }
                *:hover::before {
                    right: 1%;
                    opacity: 1;
                }   
            `}
            </style>
        </div>
    )
}
export default Highlighted