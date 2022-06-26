import React, { useState, useEffect } from 'react';
const ProjectTitle = ({title}) =>{

    const [scrollPosition, setScrollPosition] = useState(0);
    const [height, setHeight] = useState(0)

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const handleWindowSize = () => {
        const height = window.innerHeight
        setHeight(height)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleWindowSize, { passive: true})
        setHeight(window.innerHeight)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <div>
            <div className="secondHeader">
                <span>{title}</span>
            </div>
            <style jsx>{`        
                .secondHeader{
                    position: relative;
                    width: 100%;
                    background: var(--yellow);
                    display: flex;
                    justify-content:center;
                    position: fixed;
                    padding-top:92px;
                    padding-bottom:16px;
                    top:0px;
                    font-weight:bold;
                    transition: all 0.3s;
                    opacity: ${scrollPosition - height};
                    z-index:3;
                    }
            `}
            </style>
        </div>
    )
}
export default ProjectTitle