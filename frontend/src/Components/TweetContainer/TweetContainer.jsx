import React from 'react'
import PostFunctions from '../PostFunctions/PostFunctions';
import { MdVerified } from "react-icons/md";

import useMediaQuery from '../../hooks/useMediaQuery';
import {useHistory} from 'react-router-dom';
import {URL} from '../../http/index';

function TweetContainer({tweet, _id}) {
    
   

    const history = useHistory();
    const isMobile = useMediaQuery('(max-width: 550px)');

    function truncateString(str) {

        const num = isMobile ? 6 : 20;

        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      }

      function truncateUsername(str) {

        const num = isMobile ? 4 : 10;

        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      }

      function truncateTweet(str) {

        const num = isMobile ? 100 : 210;

        if (str.length > num) {
          return str.slice(0, num) + ".....";
        } else {
          return str;
        }
      }

      function tweetClick(e){
        e.preventDefault();
        history.push('/tweet/' + tweet.creatorUsername + '/' + tweet._id)
      }

    return (
        <div className='  h-auto w-full  flex flex-col items-center justify-center bb  '>
           <div onClick={tweetClick}  className='hover:bg-gray-100 cursor-pointer h-auto w-full   flex items-start justify-start p-2 px-2 '>
                <img src={URL+tweet.creatorImg} className='rounded-full h-12 w-12' />
            
                <div className='flex flex-col items-start justify-start ml-2 '>
                  <div>
                    <div className='flex mb-2 relative  '>
                        <p className='w-auto h-5   hover:underline text-md font-semibold'>{truncateString(tweet.creatorName)}</p>
                        {tweet.verfied && <MdVerified className='text-blue-400 mt-1.5 mr-2' />}
                        <p className=' text-gray-400'>{truncateUsername("@"+tweet.creatorUsername)}</p>
                        <p className='mx-1'>.</p>
                        <p className='text-gray-400'>Dec 20th, 2021</p>

                        
                    </div>
                      {tweet.replying &&  <div className='text-sm text-gray-400 flex -mt-2 mb-2 '>Replying to <p className='text-sm text-blue-400 ml-1 cursor-pointer hover:underline'>@{tweet.replyingToUsername}</p></div>}
                  </div>
                    <div  className='flex flex-col'>
                        
                        {tweet.tweet &&<div style={{maxWidth: '500px'}} className='w-72 mx-auto sm:w-full h-auto overflow-hidden mb-2 flex items-start' >{truncateTweet(tweet.tweet)} </div>}
                        {tweet.tweetImg && <img style={{maxWidth: '500px', maxHeight : '400px'}} src={URL+tweet.tweetImg} className='w-72 mx-auto sm:w-full rounded-2xl object-cover' />}
                    </div>

                </div>

                
           </div>
      
          <PostFunctions tweet={tweet} _id={_id} />

        </div>
    )
}

export default TweetContainer
