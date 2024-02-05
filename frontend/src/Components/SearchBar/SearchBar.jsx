import React from 'react'
import { RiSearch2Line } from "react-icons/ri";

function SearchBar() {
    return (
        <div style={{  backgroundColor : "#e4e8eb77"}} className='w-full h-10 rounded-full flex   items-center '>
            <RiSearch2Line  className='w-6 h-6 m-3 font-light text-gray-700 '/>
            <input style={{  backgroundColor : "#e4e8eb00"}} className=' h-full outline-none px-2 rounded-full text-md py-3 font-light' type='text' placeholder='search twitter'/>
        </div>
    )
}

export default SearchBar
