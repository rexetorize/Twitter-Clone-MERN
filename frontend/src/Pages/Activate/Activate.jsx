import React from 'react'

import Card from '../../Components/Card/Card'
import Spinner from '../../Components/Spinner/Spinner';

import {activate} from '../../http/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useDispatch} from 'react-redux'
import {setUser} from '../../AuthRedux/AuthAction';

function Activate() {

    const [pfp, setPfp] = React.useState(`https://avatars.dicebear.com/api/avataaars/`+Math.random()*1000+`.svg`)
    const [coverImage, setCoverImage] = React.useState('https://image.freepik.com/free-vector/black-pattern-background-abstract-geometric-simple-design-vector_53876-154190.jpg')
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [website, setWebsite] = React.useState('')
    const [bio, setBio] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const dispatch = useDispatch()

    const activateHandler = async (e) => {
        e.preventDefault()
        
        const data = {
            pfp,
            coverImage,
            name,
            username,
            website,
            bio
        }

        if(data.name === '' || data.username === '' ){
            toast.error("😓 Name and username can't be blank.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return
        }
       
        try{
            setLoading(true)
            const res = await activate(data)
        
            //store the user data in redux
            if(res.status === 200){
                dispatch(setUser(res.data.user))
                setLoading(false)
            }

            //various toast notifications
            if(res.data.err){
                toast.warn('🦔 Username already exists!', {
                    position: "top-center",
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }catch(err){
            setLoading(false)
            toast.error('😓 Something went wrong!', { position: "top-center",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        }
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

    return (
    <>
        {loading ? <Spinner/> 
            :
        <div className='h-screen md:flex items-center justify-center'>

            <ToastContainer
                position="top-center"
                autoClose={15000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

           <Card>

           <div className=' w-full relative bg-white  h-40 flex flex-col  items-center justify-start '>

                <img src={coverImage} alt='cover' className='w-full h-full object-cover bg-white' />     
                
                <div className=' w-24 h-24 absolute overflow-hidden border-white border-4 rounded-full flex  justify-center items-center mt-28   left-7'>
                    <img style={{width:"100%", height:"100%", objectFit : 'cover'}}  src={pfp}/> 
                </div> 

            </div>
            
            <div>
                <div className='px-5 w-full h-full  flex flex-col text-sm text-blue-400 font-light justify-end items-end'>
                    <input id="coverImageInput" type="file" onChange={coverImageHandler} className='hidden' />
                        <label htmlFor="coverImageInput" className='cursor-pointer hover:underline'>
                        change cover photo
                        </label>
                </div>
            </div>

           <div className=' w-full h-auto flex flex-col justify-start items-center'>

                <div className='pl-8 md:px-6 lg:px-9 w-full h-full  flex flex-col text-sm text-blue-400 font-light justify-start items-start mt-7 -mb-5'>
                    <input id="Avatarinput" type="file" onChange={profilePicHandler} className='hidden' />
                        <label htmlFor="Avatarinput" className='cursor-pointer hover:underline'>
                        change photo
                        </label>
                </div>

                <div className=' w-full h-full flex flex-col justify-start items-start px-5 md:px-6 lg:px-10 mt-20'>
                    <p className='text-gray-400'>Name</p>
                    <input defaultValue={name} type='text' onChange={(e)=> setName(e.target.value)} required className='w-full h-10 p-2 outline-none text-lg border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                    <p className='text-gray-400'>Username</p>
                    <input defaultValue={username} type='text' onChange={(e)=> setUsername(e.target.value)} required className='w-full h-10 p-2 outline-none text-lg border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                    <p className='text-gray-400'>Website</p>
                    <input defaultValue={website} type='text' onChange={(e)=> setWebsite(e.target.value)} className='w-full h-10 p-2 text-lg outline-none border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                    <p className='text-gray-400'>Bio</p>
                    <textarea defaultValue={bio} style={{resize:'none'}} type='text' onChange={(e)=> setBio(e.target.value)} className='w-full h-10 p-2 text-md outline-none border-2 border-t-0 border-l-0 border-r-0 mb-5' />
                </div>  

                <button   onClick={activateHandler} style={{backgroundColor : '#1DA1F3', borderRadius : "25px"}} className='mb-5 h-11 mt-6  w-1/2 cursor-pointer flex items-center justify-center'>
                    <p style={{color : "#fff"}} className=' text-sm md:text-md text-black self-center font-light'>
                        Let's Go..
                    </p>
                </button>
                
            </div>
           </Card>
        </div>}
    </>
    )
}

export default Activate
