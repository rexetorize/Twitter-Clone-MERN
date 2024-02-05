import React from 'react'
import TweetContainer from '../TweetContainer/TweetContainer'
import {getAllTweets} from '../../http/index'
import Loader from '../Loader/Loader'

function TweetMap() {

    const [tweets, setTweets] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    React.useEffect(async () => {
        try{
            const response = await getAllTweets()
            setTweets(response.data.tweets)
            setLoading(false)
        }

        catch(error){
            setError(true)
            setLoading(false)
            return
        }
    }, [])

  

    return (
        <>

            <div className="hero-container w-full h-auto mt-4 ">

                {loading ? <Loader /> : tweets.map(tweet => {
                    return <TweetContainer key={tweet.id}  tweet={tweet} />
                })}
            </div>
                
        
        </>
    )
}

export default TweetMap
