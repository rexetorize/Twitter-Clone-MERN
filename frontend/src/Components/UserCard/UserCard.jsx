import React from 'react'
import {URL} from '../../http/index'
import {Link} from 'react-router-dom'
import Follow from '../Follow/Follow'

function UserCard({width, height, name, pfp, username, _id}) {

    

    return (
        <div className={`w-${width} h-${height}  flex items-center  justify-between pt-2 pb-2 hover:bg-gray-200`}>
            
            <div className='flex items-center'>
               
                    <img className='w-12 h-12 rounded-full object-cover ml-3 mr-3' src={URL+pfp} alt=""/>
                    <div className='flex flex-col  '>
                        <Link to={"/user/"+_id}  className='font-semibold text-md cursor-pointer hover:underline'>{name}</Link>
                        <Link to={"/user/"+_id} className='text-gray-500'>@{username}</Link>
                    </div>
            </div>

            <Follow margin={`mr-5`} wd={'auto'} ht={8} id={_id}/>
        </div>
    )
}

export default UserCard
