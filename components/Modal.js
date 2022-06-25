import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children, visible, onClose}) =>{
    console.log(children.props.children[1].props.children)
    if(visible){
        return(
            <div className='container'>
                <div className='backdrop' onClick={()=>console.log('adas')}/>

                <div className='modalContent' onClick={()=>console.log('content')}>
                    <div>
                    <span className='title'>{children.props.children[1].props.children}</span>
                    <Image 
                    alt={children.props.children[1].props.children} 
                    src={children.props.children[0].props.src}
                    layout='fill' 
                    objectFit='contain' 
                    />
                    </div>
                    <div className='closeIcon'>
                        X
                    </div>
                </div>
                <style jsx>{`
                    .backdrop{
                        position: fixed;
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: white;
                    }
                    .container{
                        all:unset;
                        position: fixed;
                        width: 100vw;
                        height: 100vh;
                        top:0;
                        left: 0;
                        background: white;
                        z-index:3;
                    }
                    .modalContent{
                        position: relative;
                        top: 92px;
                        left: 50%;
                        transform: translate(-50%, 0);
                        width: 1000px;
                        height: 700px;
                        background: gray;
                        display: flex;
                        justify-content:center;
                        padding:10px;
                        z-index:1000
                    }
                    .closeIcon{
                        position: relative;
                        right: -40%;
                        top: 0;
                        width: 1%;
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