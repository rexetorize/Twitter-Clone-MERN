import React from 'react'
import UserCard from '../../../Components/UserCard/UserCard'
import{URL, getAllUsers} from '../../../http/index'
import { useEffect, useState } from 'react'


function RightSideBarContainer() {
    
    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers().then(res => {
            setUsers(res.data.users)
        })
    }, [])


    return (
        <div style={{borderRadius : "20px", backgroundColor : '#e4e8eb77'}} className=' mt-10 w-full h-auto flex flex-col  justify-between '>
            <p className='font-bold text-2xl px-5 pt-5'>You might like</p>

            <div className='flex flex-col items-center justify-center mt-5'>
                {users && users.map(user => {
                    return <UserCard width='full' height='auto' name={user.name} username={user.username} key={user._id} _id={user._id} pfp={user.pfp}/>
                })}
            </div>

            <p className='text-blue-400  px-6 mt-7 hover:underline cursor-pointer pb-2'>Show more</p>
        </div>
    )
}

export default RightSideBarContainer
