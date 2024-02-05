import React from 'react'
import {useSelector} from 'react-redux'
import TweetContainer from '../../Components/TweetContainer/TweetContainer';
import { getTweetsByUserId } from '../../http/index'
import Spinner from '../../Assets/Spinner.svg'
import ProfileHero from './ProfileHero';
import Loader from '../../Components/Loader/Loader';
import {useParams} from 'react-router-dom'

function Profile() {
    const [tweets, setTweets] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const {_id} = useSelector(state => state.user)
    const {id} = useParams()

    React.useEffect(async () => {   
        
        try{
            let res = await getTweetsByUserId(id)
            setTweets(res && res.data.tweets)
            res && setLoading(false)
            res && setError(false)
        }
        catch(err){
            setError(true)
            setLoading(false)
            return
        }
        
        
    }, [id])

    

    const editProfileHandler = (e) => {
        e.preventDefault()
        console.log('edit profile')
    }

    const messageHandler = (e) => {
        e.preventDefault()
        console.log('message')
    }

    const followHandler = (e) => {
        e.preventDefault()
        console.log('follow profile')
    }

    const clickHandler = (e) => {
        e.preventDefault();
        console.log('Clicked')

        test().then(res => {
            console.log(res)
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }


    return (
        <div className=' overflow-y-scroll h-auto '>
            <ProfileHero  />

            <div style={{ borderBottom : '1px solid #d3d3d38e'}} className='w-full h-12 mt-3  flex items-center justify-start'>
                <span className='w-auto h-12  px-4 hover:bg-gray-200 border-blue-400 border-b-4 flex items-center justify-center cursor-pointer'>
                    <p className='font-semibold '>Tweets</p>
                </span>
            </div>
            
            <div className='w-full h-auto '>
                {loading ? 
                    <Loader /> 
                :
                 tweets.map(tweet => {
                    return <TweetContainer key={tweet._id} userId={_id} tweet={tweet} />
                })}
            </div>

            <div className='w-full h-16'></div>
        </div>
    )
}

export default Profile
