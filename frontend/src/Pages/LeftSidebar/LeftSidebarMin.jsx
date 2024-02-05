import React from 'react'

import { BiHomeCircle } from "react-icons/bi";
import { BiHash } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import {URL} from '../../http/index'
import { GiFeather } from "react-icons/gi";

function LeftSidebarMin({pfp, _id}) {
    return (
        <>
        <div style={{ borderTop : '1px solid #d3d3d38e'}} className='w-full  bg-white  h-16 z-50  absolute flex items-center justify-around'>
            <Link to="/"><BiHomeCircle className='w-14 h-14   p-3' /></Link>  
            <Link to="/explore"><BiHash className='w-14 h-14  p-3'/></Link>
            <Link to="/messages"><MdOutlineEmail className='w-14 h-14  p-3'/></Link>
            <Link to={"/user/"+_id}><img src={URL+pfp} alt='profile' className='w-14 h-14 rounded-full  p-3' /></Link>
        </div>

        <Link to="/post"  className='flex items-center justify-center  w-14 h-14 bg-twitter absolute  rounded-full z-30 right-1 bottom-20'>
            <GiFeather  className='w-7 h-7 text-white'/>
        </Link>

        </>
    )
}

export default LeftSidebarMin
