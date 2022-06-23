import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children, isModalOpen, onChange}) =>{
    console.log(isModalOpen)
    return(
        <div style={{display:isModalOpen?'flex':'none'}}>
            <div>
                <div className="backdrop" onClick={()=>onChange(false)}/>
                <div className="content" onClick={()=>{console.log("spam")}}>
                    {children}
                    <div className='closeIcon' onClick={()=>onChange(false)}>
                        <AiOutlineClose className='closeIcon'/>
                    </div>
                </div>
            </div>
            <style jsx>{`
                img{
                height: auto;
                width: auto;
             }
             .backdrop{
                display: flex;
                justify-content:center;
                align-items: center;
                position: fixed;
                width: 100%;
                height: 100vh;
                background: black;
                opacity:.5;
                z-index:10000;
                color: white;
                pointer-event:none;
             }
             .closeIcon{
                padding-left:200px;
                color: white;
                height: 0px;
                cursor:pointer
             }
             .closeIcon:hover{
                color:#E8FF00
             }
             .content{
                display: flex;
                position: fixed;
                top:25%;
                left:25%;
                z-index:10001;
             }
                
            `}</style>
        </div>
    )
}
export default Modal