import React from 'react'
import styles from './Modal.styles.css'
import useMediaQuery from '../../hooks/useMediaQuery'

function Modal({ children}) {
    const isAboveSmall = useMediaQuery("(min-width: 940px)");

    return (
        <div className={`modal w-screen h-screen absolute flex items-center justify-center`}>
            <div className={`${isAboveSmall ? 'modal-size-lg' : 'modal-size-sm'} bg-white rounded-lg ` }>
                <div className='p-2 w-full flex flex-col justify-end items-end '>
                    <img className='m-1 mb-2 cursor-pointer' width={25} height={25} src='/images/x.png' alt='x'/>

                    <div className='modal-children w-full h-full  '>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
