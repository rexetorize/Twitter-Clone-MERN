import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from "react-icons/io5";
import PostFunctions from '../PostFunctions/PostFunctions';
import { MdVerified } from "react-icons/md";
import Post from '../../Pages/Post/Post';
import TweetContainer from '../TweetContainer/TweetContainer';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {URL, getTweetById, getReplies} from '../../http/index'
import Loader from '../Loader/Loader';

function TweetPage() {
    const {postid} = useParams()
    const {_id} = useSelector(state => state.user)
    const [error, setError] = React.useState(false);
    const [tweet, setTweet] = React.useState();
    const [replies, setReplies] = React.useState([]);

    React.useEffect(async () => {
        try{
            let res = await getTweetById(postid)
            setTweet(res && res.data.tweet)
            res && setError(false)
        }
        catch(err){
            setError(true)
          
            return
        }
    }, [postid])

    React.useEffect(async () => {
        const replies = await getReplies(postid)
        replies && setReplies( replies.data.replies)
    }, [postid])

    //if is replying?
    console.log(tweet)

    return (
        <>
        
        <div className='w-full mb-20 '>
            <div className='w-full h-12 bg-white flex items-center  '>
                <Link to='/'><IoArrowBackOutline className='p-2 w-10 h-10 m-3  font-light text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer'/></Link>
                <p className='text-xl font-bold'>Tweet</p>     
            </div>
            {!tweet  ? <Loader /> : <div className=' m-3 h-auto'>
            

            <div className='flex items-center w-full h-auto relative  ' >
                <div className='w-16 h-16 rounded-full  bg-cover bg-center  cursor-pointer mr-4' style={{backgroundImage: `url(${URL+tweet.creatorImg})`}}></div>
                <div className='flex flex-col '>
                    <Link to={'/user/'+tweet.createdBy} className='text-lg font-semibold hover:underline cursor-pointer flex items-center'>{tweet.creatorName}  </Link>
                    <Link to={'/user/'+tweet.createdBy} className='text-sm font-normal text-gray-500'>{"@"+tweet.creatorUsername}</Link>
                </div>

                {tweet.createdBy === _id && <div className='w-6 -mx-3 h-full flex items-center justify-center absolute right-2 ' >
                    <BiDotsHorizontalRounded className='w-6 h-6  hover:bg-gray-100 rounded-full cursor-pointer  font-light text-gray-700 ' />
                </div>}
            </div>

            {tweet.tweet && <div style={{maxWidth : '600px'}} className='tweet text-lg font-medium mt-3 '>
                {tweet.tweet}
            </div>}

            {tweet.tweetImg && <img style={{maxWidth : '600px'}} className=' w-80 sm:w-full tweet-img text-lg font-medium mt-3 rounded-2xl' src={URL+tweet.tweetImg} />}

            <div className='flex items-center justify-start mt-3 mb-4'>
                <p className='text-md font-normal text-gray-500 hover:underline mr-2 cursor-pointer '>Jan 5, 2021</p>
                <p className='text-md font-normal text-gray-500 hover:underline mr-2' > . </p>
                <p className='text-md font-normal text-gray-500 hover:underline mr-2 cursor-pointer ' >Twitter Web App </p>
            </div>

            <hr></hr>

            <div className='flex items-center justify-start mt-3 mb-4'>
                <div className='font-medium text-md flex cursor-pointer'>{tweet.likedBy.length} <p className='ml-1 font-normal text-gray-500 hover:underline cursor-pointer'>Likes</p></div>
            </div>

            <hr></hr>

            <div className='w-full flex items-center justify-center '>
                <PostFunctions tweet={tweet}/>
            </div>
            <hr className='mb-3'></hr>

            <Post placeholder={"Tweet your reply"} isReplying={true} replydata={{tweetId : postid, username : tweet.creatorUsername, pfp:tweet.creatorImg, userId : tweet.createdBy }}/>
            </div>}
            
            <div className='w-full h-12 bg'>
                {replies ? 
                 (
                     replies.map(reply => {
                        return <TweetContainer tweet={reply}/>
                     })
                 )
                 :
                  <Loader />}
            </div>

            
        </div>
       
        </>
    )
}

export default TweetPage
