
import React from 'react'
import {URL, isFollowing, followUnfollowUser} from '../../http/index'

function Follow({ht, wd, margin, id,}) {

    const [disabled, setDisabled] = React.useState(true)
    const [following, setFollowing] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        isFollowing(id).then(res => {
            
            setFollowing(res.data.isFollowing)
            setDisabled(false)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setDisabled(true)
            setLoading(false)
            setErr(true)
        })
    }, [id])


    const followUserHandler = async(e) => {
        
        e.preventDefault()
        
        setLoading(true)
        setDisabled(true)
        
        try{
            const res = await followUnfollowUser(id)
            console.log(res)
            setFollowing(res.data.following)
            setLoading(false)
            setDisabled(false) 

        }
        catch(err){
            console.log(err)
            setLoading(false)
            setDisabled(false)
        }
    }

    

    return (
        <button disabled={disabled} onClick={followUserHandler} className={` w-${wd} h-${ht} ${margin}  ${following ? 'bg-white text-black hover:bg-red-100 hover:text-red-500' : 'bg-black text-white' }  font-semibold rounded-full p-auto cursor-pointer ${err && 'bg-red-500'}`} style={{border: '1px solid #d3d3d38e'}} >
         <p className='mx-3'> {err ? "Oops" :
            loading ? "Working..." :
            following ? "Unfollow" : "Follow" 
          }</p>
        </button>
    )
}

export default Follow
