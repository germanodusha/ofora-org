import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children, visible, onClose}) =>{
    console.log(children.props.children[1].props.children)
    if(visible){
        return(
            <div>
                <div className='backdrop' onClick={()=>console.log('adas')}/>
                <div className='modalContent' onClick={()=>console.log('content')}>
                    <span className='title'>{children.props.children[1].props.children}</span>
                    <Image 
                    alt={children.props.children[1].props.children} 
                    src={children.props.children[0].props.src}
                    layout='fill' 
                    objectFit='contain' 
                    />
                </div>
                <style jsx>{`
                    .backdrop{
                        position: fixed;
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: black;
                        z-index:1;
                    }
                    .modalContent{
                        position: fixed;
                        top: 92px;
                        left: 50%;
                        transform: translate(-50%, 0);
                        width: 50vw;
                        height: 40vw;
                        background: red;
                        z-index:2;
                        display: flex;
                        justify-content:center;
                        padding:10px;
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