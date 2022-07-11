const Highlighted = ({color="white", children})=>{
    return(
        <span className="highlighted">
            {children}
            <style jsx>{`
                .highlighted {
                    position: relative;
                }
                .highlighted::before {
                    content: "";
                    position: absolute;
                    top: 10px;
                    left: 0px;
                    right: 100%;
                    bottom: 2px;
                    background: ${color};
                    border-radius: 2px;
                    z-index: -1;
                    transition: 0.5s all;
                    box-shadow: 0px 0px 5px 3px ${color};
                    opacity: 0;
                }
                .highlighted:hover::before {
                    right: 0%;
                    opacity: 1;
                }
            `}
            </style>
        </span>
    )
}
export default Highlighted