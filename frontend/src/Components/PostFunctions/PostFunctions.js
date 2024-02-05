import React from 'react'
import { GoComment } from "react-icons/go";
import { BsHeart } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import {URL, likeUnlikeTweet} from '../../http/index';
import {useSelector} from 'react-redux'



function PostFunctions({tweet}) {

    const {_id} = useSelector(state => state.user);
    const [replies, setReplies] = React.useState();
    const [likes, setLikes] = React.useState();
    const [liked, setLiked] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(() => {
        setLiked(tweet.likedBy.includes(_id));
        setLikes(tweet.likedBy.length)
        setReplies(tweet.replies.length)
    }, [tweet._id])

    function likeHandler(e){
        e.preventDefault()
        setDisabled(true)
        likeUnlikeTweet(tweet._id).then(res => 
            {
                if(res.data.tweet.likedBy.includes(_id)) setLiked(true)
                else setLiked(false)

                setLikes(res.data.tweet.likedBy.length)
                setDisabled(false)
                
            })
            .catch(err => { console.log(err); setDisabled(false) })
    }
    


    

    return (
        <div style={{maxWidth: '500px'}} className=' flex items-center justify-between mb-2 mt-2 mx-auto h-10 w-72 sm:w-full '>
               
                        <div className=' cursor-pointer flex justify-between items-center text-gray-400 hover:text-blue-400  w-20'>
                            <div className='flex items-center justify-center h-10 w-10 rounded-full hover:text-blue-400  hover:bg-blue-200 '>
                                <GoComment className='w-5 h-5 pt-0.5  text-gray-400' />
                            </div>
                            {replies && replies}
                        </div>

                        <div className=' cursor-pointer flex justify-center items-center text-gray-400 hover:text-green-400  w-20'>
                            <div className='flex items-center justify-center h-10 w-10 rounded-full hover:text-green-400  hover:bg-green-200 '>
                                <AiOutlineRetweet className='w-5 h-5 pt-0.5  text-gray-400' />
                            </div>
                            
                        </div>

                        <div className=' cursor-pointer flex justify-between items-center text-gray-400 hover:text-red-400  w-20'>
                            <button disabled={disabled} onClick={likeHandler} className={`flex items-center justify-center h-10 w-10 rounded-full hover:text-red-400  hover:bg-red-200 `}>
                                {liked ? <AiFillHeart className='w-5 h-5 pt-0.5  text-red-500' /> : <BsHeart className='w-5 h-5 pt-0.5  text-gray-400' />}
                            </button>
                            {likes && likes}
                        </div>
                        
                  </div>
    )
}

export default PostFunctions
