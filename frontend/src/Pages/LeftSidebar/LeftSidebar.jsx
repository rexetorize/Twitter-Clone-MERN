import React from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'

import { BiHomeCircle } from "react-icons/bi";
import { BiHash } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { GiFeather } from "react-icons/gi";

import {URL } from '../../http/index'
import {Link} from 'react-router-dom'


function LeftSidebar({pfp, name, username, _id}) {
    
    const isAboveMd = useMediaQuery('(min-width: 850px)')
  

    return (
        
        <div className={`${isAboveMd ? 'w-80 h-screen ' : ' w-full h-20 absolute sm:relative sm:w-24 sm:h-screen' }  flex flex-col items-start justify-start `}>
            
            <div className='cursor-pointer flex flex-col items-center justify-center ml-3 hover:bg-blue-100 rounded-full p-2 mt-2  mb-6'>
                <img src='/images/tw-logo.png' className='rounded-full h-12 w-12' alt='profile'/>
            </div>

            <Link to='/' className={`pill w-auto  h-auto  flex items-center justify-start hover:bg-gray-200  ml-3 rounded-full  py-1 mb-3  cursor-pointer pl-3 md:pr-5`}>
                <BiHomeCircle className='w-10 h-10 mr-4 font-light'/>
                {isAboveMd && <p className='text-xl font-normal'>Home</p>}
            </Link>

            <Link to='/explore'  className={`pill w-auto  h-auto  flex items-center justify-start hover:bg-gray-200  rounded-full   ml-3 py-1 mb-3 cursor-pointer pl-3 md:pr-5`}>
                <BiHash className='w-10 h-10 mr-4 font-light'/>
                {isAboveMd && <p className='text-xl font-normal'>Explore</p>}
            </Link>

            <Link to='/messages' className={`pill w-auto  h-auto flex items-center justify-start hover:bg-gray-200  rounded-full   ml-3 py-1 mb-3 cursor-pointer pl-3  md:pr-5`}>
                <MdOutlineEmail className='w-10 h-10 mr-4 font-light'/>
                {isAboveMd && <p className='text-xl font-normal'>Messages</p>}
            </Link>

            <Link to={'/user/'+_id} className={`pill w-auto  h-auto  flex items-center justify-start hover:bg-gray-200  rounded-full  ml-3 py-1 mb-20 cursor-pointer pl-3 md:pr-5`}>
                <BsPerson className='w-10 h-10 mr-4 font-light'/>
                {isAboveMd && <p className='text-xl font-normal'>Profile</p>}
            </Link>

            <Link to='/post'  style={{backgroundColor : "#1DA1F3"}}  className={`bg-twitter ${isAboveMd? 'w-48' : 'w-12'} rounded-full text-white text-xl   h-12 flex items-center justify-center cursor-pointer ml-5`}>
               {isAboveMd ?  <p>Tweet</p> : <GiFeather className='text-white'/>}
            </Link>
            
            <div   className={`  ${isAboveMd? "w-auto" : "w-auto"} rounded-full text-white text-xl absolute bottom-0 mb-5 flex items-center justify-center cursor-pointer`}>
               {isAboveMd ?  
               <div className='flex items-center justify-between  w-auto h-auto hover:bg-gray-100 rounded-full px-3 ml-3 py-2 '>

                
                        <img src={URL+pfp} className='h-10 w-10 rounded-full text-white mr-3' />

                        <div className='flex flex-col  items-start mr-14  justify-self-start'>
                            <p className='text-sm font-medium text-black '>{name}</p>
                            <p className='text-gray-400 text-sm'>@{username}</p>
                        
                        </div>
                    <MdMoreHoriz className='text-black w-5 h-5 ' />

               </div> 
               : 
               <img  src={URL+pfp}  className='text-white w-12 h-12 rounded-full bg ml-5'/>}
            </div>
            
            {/* <------------------------------------------------------------------------------------> */}

            

        </div>
    )
}

export default LeftSidebar
