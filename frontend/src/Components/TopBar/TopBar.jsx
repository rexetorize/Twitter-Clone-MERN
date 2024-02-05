import React from 'react'
import { RiSearch2Line } from "react-icons/ri";
import styles from './Topbar.styles.css'
import { Link } from 'react-router-dom'

function TopBar({pfp, isAboveSm, header }) {
    return (
        <div className='topbar w-full h-14 mb-3 sm:mt-3 sm:pb-3  flex items-center justify-between px-3 bb '>
            {!isAboveSm && (header === "Post" || header === "Search")&& <p className='text-xl font-bold'>{header}</p>}
            {!isAboveSm && (header !=="Post" && header !== "Search") && pfp && <img src={'http://localhost:5000'+pfp} alt='pfp' className='w-10 h-10 rounded-full mr-2' />}
            {!isAboveSm && <Link to="/"><img src='/images/tw-logo.png' alt='logo' className='w-10 h-10 rounded-full mr-2' /></Link>}
            {!isAboveSm && <Link to="/search"><RiSearch2Line  className='w-6 h-6 m-3 font-light text-gray-700 '/></Link>}
            {isAboveSm  && <p className='text-xl font-bold'>{header}</p>}
        </div>
    )
}

export default TopBar
