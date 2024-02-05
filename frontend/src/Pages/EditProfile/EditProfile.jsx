import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import {URL, updateUser} from '../../http/index'
import {useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {

   

    const submitHandler = async(e) => {
        e.preventDefault()
         
        const res = await toast.promise(updateUser({name, username, pfp, bio, coverImage, website}),
        {
          pending: 'Working on it...',
          success: 'Updated successfully 👌',
          error: 'Something went wrong 😕',
        })
    }


    const profilePicHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        
        try{
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                
                setPfp(reader.result)
            }
        }
        catch{
            return
        }
        
    }

    const coverImageHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        try{
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setCoverImage(reader.result)
            }
        }
        catch{
            return
        }
    }
    
    const user = useSelector(state => state.user)

    const [pfp, setPfp] = React.useState(user.pfp)
    const [coverImage, setCoverImage] = React.useState(user.coverImage)
    const [name, setName] = React.useState(user.name)
    const [username, setUsername] = React.useState(user.username)
    const [website, setWebsite] = React.useState(user.website)
    const [bio, setBio] = React.useState(user.bio)

    console.log(pfp, coverImage)

    return (

        <div className=' overflow-y-scroll'>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div style={{ borderBottom : '1px solid #d3d3d38e'}} className='w-full h-12 bg-white flex items-center '>
                <Link to={'/user/'+user._id}><IoArrowBackOutline className='p-2 w-10 h-10 m-3 font-light text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer'/></Link>
                <div className='ml-2 sm:ml-5 flex flex-col font-bold text-lg'>
                    Edit
                </div>
            </div>

            <div className='profile-div w-full  h-auto relative'>
                
                <div className='w-full h-36 sm:h-60 bg-cover bg-center ' style={{backgroundImage: `url(${coverImage.length > 100 ? coverImage : URL + coverImage  })`}}></div>
                <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-white border-2 sm:border-4 bg-cover bg-center -mt-12 sm:-mt-16 ml-4 sm:ml-6' style={{backgroundImage: `url(${pfp.length > 100 ? pfp : URL + pfp})`}}></div>

            </div>
            
            <div>
                <div className='px-5 -mt-10 sm:-mt-16 relative z-20 w-full h-full  flex flex-col text-sm text-blue-400 font-light justify-end items-end'>
                    <input id="coverImageInput" type="file" onChange={coverImageHandler} className='hidden' />
                        <label htmlFor="coverImageInput" className='cursor-pointer hover:underline'>
                        change cover photo
                        </label>
                </div>
            </div>

           <div className=' w-full h-auto flex flex-col justify-start items-center'>

                <div className='pl-8 mt-6 -ml-3 sm:ml-4 sm:mt-10 md:px-6 lg:px-9 w-full h-full  flex flex-col text-sm text-blue-400 font-light justify-start items-start  -mb-5'>
                    <input id="Avatarinput" type="file" onChange={profilePicHandler} className='hidden' />
                        <label htmlFor="Avatarinput" className='cursor-pointer hover:underline'>
                        change photo
                        </label>
                </div>

                <div className=' overflow-y-scroll w-full h-full flex flex-col justify-start items-start px-5 md:px-6 lg:px-10 mt-10 sm:mt-20'>
                    <p className='text-gray-400'>Name</p>
                    <input defaultValue={name} type='text' onChange={(e)=> setName(e.target.value)} required className='w-full h-10 p-2 outline-none text-lg border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                    <p className='text-gray-400'>Username</p>
                    <input defaultValue={username} type='text' onChange={(e)=> setUsername(e.target.value)} required className='w-full h-10 p-2 outline-none text-lg border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                    <p className='text-gray-400'>Website</p>
                    <input defaultValue={website} type='text' onChange={(e)=> setWebsite(e.target.value)} className='w-full h-10 p-2 text-lg outline-none border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                    <p className='text-gray-400'>Bio</p>
                    <textarea defaultValue={bio} style={{resize:'none', height : '100px'}} type='text' className="" onChange={(e)=> setBio(e.target.value)} className='w-full h-10 p-2 text-md outline-none border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                </div>  

                <button onClick={submitHandler}   style={{backgroundColor : '#1DA1F3', borderRadius : "25px"}} className='mb-20 sm:mb-10 h-11 mt-3  w-1/2 cursor-pointer flex items-center justify-center'>
                    <p style={{color : "#fff"}} className=' text-sm md:text-md text-black self-center font-light'>
                        Update
                    </p>
                </button>
            
                
            </div>
        </div>
    )
}

export default EditProfile
