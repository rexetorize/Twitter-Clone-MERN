import React from 'react'
import TweetMap from '../../Components/TweetMap/TweetMap'
import {Link} from 'react-router-dom'
import {IoArrowBackOutline} from 'react-icons/io5'

function Explore() {
    return (
        <div className='w-full h-auto'>
            <div className='w-full h-12 bg-white flex items-center '>
                <Link to='/'><IoArrowBackOutline className='p-2 w-10 h-10 m-3 font-light text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer'/></Link>
                <div className='ml-2 sm:ml-5 flex flex-col font-bold text-xl '>
                   Explore
                </div>
                
            </div>
            <TweetMap />
        </div>
    )
}

export default Explore
