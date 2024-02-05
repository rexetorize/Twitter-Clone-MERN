import React from 'react'
import {Link } from 'react-router-dom'

function EmailSignUpOtp({isAboveSmall, nextPage}) {

    const [otp, setOtp] = React.useState('');

    const clickHandler = () => {
        nextPage();
    }
    
    return (
        <div style={isAboveSmall ? {width : '50%'} : {width : '100%'}} className='login-right-container-md-to-lg  px-4 md:px-5 lg:px-10 py-5 sm:py-44 '>
            <img className='login-right-img' width={70} height={70} src='/images/tw-logo.png'  alt='logo' />
            <h1 className='text-3xl md:text-4xl font-bold mt-6 mb-4'>Happening now</h1>
            <p className='mb-4 md:mb-6 text-2xl font-semibold'>Enter the OTP you recieved in your mail.</p>

            <div className='login-container'>

                <div className=' w-full mb-3'>
                    <p className='mb-1 text-md'>Enter OTP : </p>
                    <input onChange={e=>setOtp(e.target.value)} type='text' placeholder='OTP' className='auth w-full sm:w-72 h-auto mb-1 outline-none p-2 px-3 bg-gray-50' />
                </div>



                <div onClick={clickHandler} style={{backgroundColor : '#1DA1F3'}} className='auth w-42 mb-1 md:w-72 cursor-pointer flex items-center justify-center auth-hover-2'>
                    
                    <p className=' text-xs text-white self-center font-medium '>Next </p>
                </div>   

                <p className='md:w-72 flex items-center justify-center pl-2' style={{fontSize: '10px'}}>By signing up, you agree to the Terms of Service. This is just a dummy text.</p>  

                <div className='md:w-72 flex flex-col items-center justify-center mt-4'>
                        
                    <p className='text-xs text-gray-600 mb-2'>Want to sign in with a different method?</p>

                    <Link to="/login" style={{backgroundColor : '#fff'}} className='auth   w-full cursor-pointer flex items-center justify-center auth-hover-3'>
                        <p style={{color : "#1DA1F3"}} className=' text-xs text-black self-center font-medium '>Back to sign in</p>
                    </Link>
                </div>
                
            
            </div>               
        </div>
    )
}

export default EmailSignUpOtp
