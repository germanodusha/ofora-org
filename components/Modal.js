import {AiOutlineClose} from 'react-icons/ai'

const Modal = ({children, visible, onClose}) =>{
    console.log(children[1].props.children)
    return(
        <div className="container" style={{display:visible?'':'none'}}>
            <div className='wrapper'>
                <div className='title'>
                    adaoksoasdkasodksoadkasodaodkasdaodkoasdksadoaksodkask
                </div>
                <div className='cover'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/6/6e/John_Mayer_performing_in_Atlanta%2C_Georgia_%2817_March_2010%29_-_068.jpg'/>
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
                    background: red;
                    color:white;
                    z-index:1;
                }
                .wrapper{
                    padding-top:92px;
                    height: 100vh;
                    width: 100%;
                }
                .title{
                    width: 100%;
                    background: blue;
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
                }
            `}</style>
        </div>
    )
}
export default Modal