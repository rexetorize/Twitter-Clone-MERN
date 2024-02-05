import React from 'react'
import {Link } from 'react-router-dom'

function EmailSignin({isAboveSmall}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    console.log(email)
    console.log(password)
    
    return (
        <div style={isAboveSmall ? {width : '50%'} : {width : '100%'}} className='login-right-container-md-to-lg  px-4 md:px-5 lg:px-10 py-5 sm:py-44 '>
            <img className='login-right-img' width={70} height={70} src='/images/tw-logo.png'  alt='logo' />
            <h1 className='text-3xl md:text-4xl font-bold mt-6 mb-4'>Happening now</h1>
            <p className='mb-4 md:mb-6 text-2xl font-semibold'>Join Twitter-Clone today</p>

            <div className='login-container'>

                <div className=' w-full mb-3'>
                    <p className='mb-1 text-md'>Email : </p>
                    <input onChange={e=>setEmail(e.target.value)} type='text' placeholder='email' className='auth w-full sm:w-72 h-auto mb-1 outline-none p-2 px-3 bg-gray-50' />
                </div>

                <div className=' w-full mb-3'>
                    <p className='mb-1 text-md'>Password : </p>
                    <input type='text' onChange={e=>setPassword(e.target.value)}  placeholder='password' type="password" className='auth w-full sm:w-72 h-auto mb-1 outline-none p-2 px-3 bg-gray-50' />
                </div>


                <div style={{backgroundColor : '#1DA1F3'}} className='auth w-42 mb-1 md:w-72 cursor-pointer flex items-center justify-center auth-hover-2'>
                    
                    <p className=' text-xs text-white self-center font-medium '>Sign In </p>
                </div>   

                <p className='md:w-72 flex items-center justify-center pl-2' style={{fontSize: '10px'}}>By signing up, you agree to the Terms of Service. This is just a dummy text.</p>  

                <div className='md:w-72 flex flex-col items-center justify-center mt-4'>
                        
                    <p className='text-xs text-gray-600 mb-2'>Want to Login with another auth method?</p>

                    <Link to="/login" style={{backgroundColor : '#fff'}} className='auth   w-full cursor-pointer flex items-center justify-center auth-hover-3'>
                        <p style={{color : "#1DA1F3"}} className=' text-xs text-black self-center font-medium '>Back to sign in</p>
                    </Link>
                </div>
                
            
            </div>               
        </div>
    )
}
export default EmailSignin
