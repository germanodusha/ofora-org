const Highlighted = ({color="white", children})=>{
    return(
        <div className="main">
            <div className="backdrop"/>
            <div>
                {children}
            </div>
            <style jsx>{`
                .main{
                    z-index:1;
                }
                .main:hover{
                    color: var(--yellow);
                }
                * {
                    position: relative;
                    font-weight: normal;
                }
                .backdrop{
                    position: fixed;
                    height: 100vh;
                    width: 100vw;
                    top: 0;
                    right: 0;
                    background: black;
                    opacity: 0;
                    pointer-events:none;
                    z-index:0;
                }
                .main:hover>.backdrop{
                    opacity: 0.5;
                }
                .main:last-child{
                    z-index:1000000;
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
                    z-index:1;
                }
                *:hover::before {
                    right: 1%;
                    opacity: 1;
                }
                .cotainer{
                    z-index:1000000;
                }
            `}
            </style>
        </div>
    )
}
export default Highlighted