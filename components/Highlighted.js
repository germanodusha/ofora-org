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
                    left: 3px;
                    right: 100%;
                    bottom: 2px;
                    background: ${color};
                    border-radius: 2px;
                    z-index: -1;
                    opacity: 3;
                    transition: 0.5s all;
                }
                .highlighted:hover::before {
                    right: 1%;
                    opacity: 1;
                }
            `}
            </style>
        </span>
    )
}
export default Highlighted