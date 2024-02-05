import React from 'react'

import {useSelector} from 'react-redux'

import { IoArrowBackOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import {  BiDotsVerticalRounded} from "react-icons/bi";
import { FiLink } from "react-icons/fi";

import {Link, useParams} from 'react-router-dom'
import {URL, getUserById, test} from '../../http/index'

import Loader from '../../Components/Loader/Loader';
import Follow from '../../Components/Follow/Follow';



function ProfileHero() {
    const {id} = useParams()
    const [error, setError] = React.useState(false)
    const [user, setUser] = React.useState()
    const [isMe, setIsMe] = React.useState(false)
    const {_id} = useSelector(state => state.user)
    
 

    React.useEffect(() => {
        setIsMe(id === _id)
        getUserById(id).then(res => { setUser(res.data.user) }).catch(err => { setError(true) })
    }, [id])


    return (<>
        { !user ? <Loader /> 
            :
        <div>
            
            <div className='w-full h-12 bg-white flex items-center relative '>
                <Link to='/'><IoArrowBackOutline className='p-2 w-10 h-10 m-3 font-light text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer'/></Link>
                <div className='ml-2 sm:ml-5 flex flex-col '>
                    <p className='text-xl font-bold'>{user.username}</p>
                    <p className='text-sm font-normal text-gray-500 my-auto'>{user.__v} Tweets & Replies</p>
                </div>
                
                <div className='w-16 h-full flex items-center justify-center absolute right-0'>
                    <BiDotsVerticalRounded className='w-6 h-6 mx-3 hover:bg-gray-100 rounded-full cursor-pointer  font-light text-gray-700'/>
                </div>
            </div>

            <div className='profile-div w-full  h-auto relative'>
                <div className='w-full h-36 sm:h-60 bg-cover bg-center ' style={{backgroundImage: `url(${URL+user.coverImage})`}}></div>
                <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-white border-2 sm:border-4 bg-cover bg-center -mt-12 sm:-mt-16 ml-4 sm:ml-6' style={{backgroundImage: `url(${URL+user.pfp})`}}></div>
            
                {/* profile actions */}
                <div className='w-auto h-auto  flex items-center justify-end px-3 -mt-10 sm:-mt-14 '>
                {
                    isMe ?
                    <Link to='/edit'>
                        <button className=' w-28 h-10 bg-white text-gray-700 font-semibold rounded-full p-auto hover:bg-gray-100 cursor-pointer' style={{border: '1px solid #d3d3d38e'}} >Edit Profile</button>
                    </Link> 
                    :
                    <div className='flex '>
                        <button className='ml-2 mr-2 w-10 h-10  text-gray-700 font-semibold flex justify-center items-center rounded-full hover:bg-gray-100 cursor-pointer' style={{border: '1px solid #d3d3d38e'}} >
                            <AiOutlineMail className='w-7 h-7 '/>
                        </button>
                        
                        <Follow ht='10' wd='28' id={id}/>

                        
                    </div>
                    }
                </div>
                
                {/* profile info */}
                <div className='ml-3 mt-3 mr-3 sm:mt-5'>
                    <p className='font-bold text-xl'>{user.name}</p>
                    <p className='text-gray-500 mb-3 '>@{user.username}</p>    
                    
                    <p style={{maxWidth : "600px"}} className='w-full h-auto mb-3 '>
                        {user.bio}
                    </p>
                    
                    <div className=' flex flex-col sm:flex-row'>
                        <div className='flex justify-start items-center mr-4 mb-1 sm:mb-3'>
                            <BsCalendar3 className='w-5 h-5 text-gray-500'/>
                            <p className='ml-1 font-normal text-md text-gray-500'> Joined December 2002</p>
                        </div>

                        <div className='flex justify-start items-center cursor-pointer hover:underline mb-3'>
                            <FiLink className='w-5 h-5 text-gray-500'/>
                            <a className='ml-1 font-normal text-md text-blue-400 ' href={user.website}>{user.website}</a>
                        </div>
                    </div>
                    

                    <div className='flex items-start  '>
                        <div className='font-bold cursor-pointer hover:underline flex '>{user.following.length} <p className='pl-1 font-normal text-gray-500'>Following</p></div>
                        <div className='font-bold cursor-pointer hover:underline flex ml-3 '>{user.followers.length} <p className='pl-1 font-normal text-gray-500'>Followers</p></div>
                    </div>    
                </div>
            </div>

            
        </div>
    }
    </>)
}

export default ProfileHero
