import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children, visible, onClose}) =>{
    console.log(children.props.children[1].props.children)
    if(visible){
        return(
            <div className='container' >
                <div className='modalContent' onClick={()=>console.log('content')}>
                    <div className='content'>
                        <span className='title'>{children.props.children[1].props.children}</span>
                        <div className='cover'>
                            <Image 
                            alt={children.props.children[1].props.children} 
                            src={children.props.children[0].props.src}
                            layout='fill' 
                            objectFit='contain' 
                            />
                        </div>
                    </div>
                    <div className='closeIcon' onClick={()=>onClose(null)}>
                        &times;
                    </div>
                </div>
                <style jsx>{`
                    .container{
                        all:unset;
                        position: fixed;
                        width: 100vw;
                        height: 100vh;
                        top:0;
                        left: 0;
                        background: var(--yellow);
                        z-index:1;
                    }
                    .cover{
                        position: relative;
                        top:0;
                        left: 0;
                        height: 600px;
                        width: 600px;
                    }
                    .title{
                        width: 100%;
                        display: flex;
                        align-items:center;
                        justify-content:center;
                    }
                    .modalContent{
                        position: relative;
                        top: 92px;
                        left: 50%;
                        transform: translate(-50%, 0);
                        display: flex;
                        justify-content:center;
                        align-items:center;
                        padding:10px;
                        z-index:1000
                    }
                    .closeIcon{
                        
                        right: -40%;
                        top: 0;
                        width: 1%;
                        cursor: pointer;
                        height: 0px;
                        font-size:32px;
                        align-self:flex-start;
                    }
                    .closeIcon:hover{
                        color:var(--yellow)
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