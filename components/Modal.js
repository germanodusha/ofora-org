import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children, visible, onClose}) =>{
    console.log(children[0].props.src)
    
    if(visible){
        return(
            <div className="container" style={{display:visible?'':'none'}}>
                <div className='wrapper'>
                    <div className='title'>
                        {children[1].props.children}
                    </div>
                    <div className='cover'>
                        <Image 
                        alt={children[1].props.children} 
                        src={children[0].props.src}
                        layout='fixed' 
                        height='700vh'
                        width='800vw'
                        objectFit='contain' 
                        />
                    </div>
                </div>
                <style jsx>{`
                    .container{
                        all:unset;
                        height: 100%;
                        width: 100%;
                        position: fixed;
                        top:0;
                        left:0;
                        background: var(--yellow);
                        color:white;
                        z-index:1;
                        color: black;
                        cursor: auto;
                    }
                    .wrapper{
                        all:unset;
                        padding-top:92px;
                        height: 100vh;
                        width: 100%;
                        display: flex;
                        flex-direction:column;
                    }
                    .title{
                        width: 100%;
                        background: var(--yellow);
                        display: flex;
                        justify-content:center;
                        align-items:flex-end;
                        height: 50px;
                        padding-bottom:20px;
                    }
                    .cover{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content:center;
                        background: var(--yellow);
                        pointer-events: none;
                        
                    }
                `}</style>
            </div>
        )
    }
    return(
        <>
            {children}
        </>
    )
}
export default Modal