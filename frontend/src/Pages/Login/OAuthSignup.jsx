import React from 'react'
import {styles} from './Login.styles.css'
import {GOOGLELOGINURL, GITHUBLOGINURL, URL} from '../../http/index'

import {Link } from 'react-router-dom'

function OAuthSignup({isAboveSmall}) {
  
    return (
        <div style={isAboveSmall ? {width : '50%'} : {width : '100%'}} className='login-right-container-md-to-lg  px-4 md:px-5 lg:px-10 py-20 sm:py-44'>
               <img className='login-right-img' width={70} height={70} src='/images/tw-logo.png'  alt='logo' />
               <h1 className='text-3xl md:text-4xl font-bold mt-6 mb-4'>Happening now</h1>
               <p className='mb-4 md:mb-6 text-2xl font-semibold'>Join Twitter-Clone today</p>

                <div className='login-container'>
                    <a href={GOOGLELOGINURL} className='auth w-42 md:w-72 cursor-pointer mb-1 auth-hover-1'>
                        <img className='ml-1 mr-2 md:mr-3' width={32} height={30}  src='/images/glogo.png' alt='google' />
                        <p className='text-xs self-center font-medium '>Sign in with Google</p>
                    </a>

                    <a href={GITHUBLOGINURL} className='auth w-42 md:w-72 cursor-pointer auth-hover-1'>
                        <img className='ml-1 mr-2 md:mr-3 rounded-full' width={32} height={30}  src='/images/ghlogo.png' alt='fb' />
                        <p className=' text-xs self-center font-medium '>Sign in with Github</p>
                    </a>

                    <div className='relative w-42 md:w-72 h-auto bg-gray-400'>
                        <p className='absolute or-text px-2 bg-white'>or</p>
                        <hr className='mt-4 mb-4 w-42 md:w-72 bg-white'></hr>
                    </div>
                    
                    <Link to={'/login/email-signup'} style={{backgroundColor : '#1DA1F3'}} className='auth w-42 mb-1 md:w-72 cursor-pointer flex items-center justify-center auth-hover-2'>
                       
                        <p className=' text-xs text-white self-center font-medium '>Sign up with Email</p>
                    </Link>   

                    <p className='md:w-72 flex items-center justify-center pl-2' style={{fontSize: '10px'}}>By signing up, you agree to the Terms of Service. This is just a dummy text.</p>  

                    <div className='md:w-72 flex flex-col items-center justify-center mt-4'>
                        <p className='w-full text-xl justify-self-start mb-6 font-medium'>Already have an account? </p>

                        <Link to={'/login/email-signin'}  style={{backgroundColor : '#fff'}} className='auth   w-full cursor-pointer flex items-center justify-center auth-hover-3'>
                            <p style={{color : "#1DA1F3"}} className=' text-xs text-black self-center font-medium '>Sign in with Email</p>
                        </Link>
                    </div>
                </div>               
        </div>

    )
}

export default OAuthSignup
