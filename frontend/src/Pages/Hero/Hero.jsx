import React from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import Post from '../Post/Post'
import {useSelector} from 'react-redux'
import TopBar from '../../Components/TopBar/TopBar'
import TweetMap from '../../Components/TweetMap/TweetMap'

function Hero() {

    const user = useSelector(state => state.user)
    const isAboveSm = useMediaQuery('(min-width: 640px)')

    return (
        <>
            
            <TopBar pfp={user.pfp} header={"Home"} isAboveSm={isAboveSm} />
            {isAboveSm && <Post placeholder={"What's happening"} httpRoute={"tweetPost"} isAboveSm={isAboveSm}/>}
            
            <TweetMap />
                
        
        </>
    )
}

export default Hero
