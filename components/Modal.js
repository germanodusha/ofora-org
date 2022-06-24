import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children, visible, onClose}) =>{
    console.log(children)
    return(
        <div style={{display:visible?'flex':'none', zIndex:'10000', position:'fixed', left:0, top:0, opacity:'1'}}>
            <div>
                <div className="backdrop" onClick={()=>onClose(false)}/>
                <div className="content" onClick={()=>{console.log("spam")}}>
                    <div className='contentContainer'>
                        {children}
                        <div className='closeIcon' onClick={()=>onClose(false)}>
                            <AiOutlineClose className='closeIcon'/>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                img{
                height: auto;
                width: auto;
                max-height:70vh;
                max-width:70vw;
             }
             .backdrop{
                position: fixed;
                width: 100vw;
                height: 100vh;
                background: black;
                opacity:.5;
                z-index:10000;
                color: white;
                pointer-event:none;
             }
             .closeIcon{
                align-self:flex-start;
                padding-left:200px;
                color: white;
                height: 0px;
                cursor:pointer
             }
             .closeIcon:hover{
                color:#E8FF00
             }
             .content{
                position: fixed;
                height: 100%;
                width: 100%;
                display: flex;
                justify-content:center;
                align-items:center;
                z-index:10001;
                max-widht:10vw;
             }
             .contentContainer{
                height: 10vh;
                display: flex;
                padding-left:200px;
             }
            `}</style>
        </div>
    )
}
export default Modal