import React from 'react'
import { BiPoll } from "react-icons/bi";
import { BiImage } from "react-icons/bi";
import {URL } from '../../http/index'

import {useSelector, useDispatch} from 'react-redux'
import styles from './Post.styles.css'

import useMediaQuery from '../../hooks/useMediaQuery'

import {postTweet, replyTweet} from '../../http/index'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useHistory} from 'react-router-dom'


function Post({pfp, placeholder, isReplying, replydata}) {

    const history = useHistory()
   

    const TweetPostHandler = async (e) => {
        e.preventDefault();

        
        if(tweetText === '' && tweetImg === ''){
            return toast.warn('Tweet cannot be empty 🎭', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        try{

            const endpoint = isReplying ? replyTweet({
                tweetImg, 
                tweetText,
                tweetId: replydata.tweetId,
                username : replydata.username,
                pfp : replydata.pfp,
                userId : replydata.userId
            })
             :
              postTweet({tweetText, tweetImg})

            const res = await toast.promise(endpoint,
            {
                pending: 'Working on it...',
                success: isReplying ?'Replied...🎉' : 'Tweeted 👌',
                error: 'Something went wrong 😕',
            });

            if(res.data.message === 'success'){
                setTweetText('');
                setTweetImg('');

                !isReplying && window.setTimeout(() => {
                    history.push('/user/'+user._id)
                }, 2000);
            }
        }
        catch(err){
            return 
        }

    }

    const tweetImgHandler = (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        const reader = new FileReader()
        try{
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setTweetImg(reader.result)
            }
        }
        catch{

            return setTweetImg('')
        }
    }

    const [tweetImg, setTweetImg] = React.useState('')
    const [tweetText, setTweetText] = React.useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const isBigScr = useMediaQuery('(min-width: 550px)')
   
    return (
        <div className={`${isBigScr ? 'bg-screen' : 'sm-screen'} w-full h-auto pb-1 bb flex  ${isBigScr ? 'px-4' : 'px-2'} justify-items-center`}>
            
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
        
            <img src = {URL+user.pfp} alt = 'pfp' className = ' object-cover w-14 h-14 md:w-16 md:h-16 rounded-full'/>

            <div className=' flex-grow ml-4'>

                    {tweetImg !== '' && 
                       
                            <img src={tweetImg} style={{borderRadius : '20px', maxWidth: '500px'}} alt = 'tweetImg' className = 'w-full rounded-lg md:px-0 h-72 object-cover '/>

                    }
                    {tweetImg !== '' && <p onClick={e => setTweetImg("")} className='text-red-500 hover:underline cursor-pointer  md:px-0 mb-2'>clear</p>}
                    <textarea  style={{borderBottom : '1px solid #d3d3d38e', maxWidth : '500px'}} value={tweetText} onChange={(e)=>setTweetText(e.target.value)} className = 'w-full md:px-0 h-24 text-md outline-none' placeholder ={placeholder}>

                    </textarea>
                   
                <div style={{ maxWidth : "500px"}} className='flex justify-between py-3 px-2 items-center w-full '>
                    <div className='flex'>

                        <div  className=''>
                            
                            <input id="coverImageInput" type="file"  className='hidden' onChange={tweetImgHandler}/>
                                <label htmlFor="coverImageInput" className='cursor-pointer hover:underline'>
                                <BiImage className='w-8 h-7 cursor-pointer mr-2 text-blue-400'/>
                                </label>
                        </div>

                        
                        <BiPoll className='w-8 h-7 cursor-pointer mr-2 text-blue-400'/>
                    </div>
                   
                    <button onClick={TweetPostHandler} style={{backgroundColor : '#1DA1F3'}} className = ' w-auto h-10 px-6 rounded-full text-white '>
                        Tweet
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Post
