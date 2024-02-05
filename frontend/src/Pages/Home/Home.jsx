import React, { Profiler } from 'react'
import {setAuth} from '../../AuthRedux/AuthAction'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../http'
import {Link} from 'react-router-dom'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import LeftSidebarMin from '../LeftSidebar/LeftSidebarMin'
import RightSideBar from '../RightSideBar/RightSideBar'
import  Profile  from '../Profile/Profile'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import TopBar from '../../Components/TopBar/TopBar'
import Post from '../Post/Post'

import Hero from '../Hero/Hero'

import useMediaQuery from '../../hooks/useMediaQuery'
import {styles} from './Home.styles.css'
import EditProfile from '../EditProfile/EditProfile'

import TweetPage from '../../Components/TweetPage/TweetPage'
import Explore from '../Explore/Explore'
import Messages from '../Messages/Messages'
import Search from '../Search/Search'

function Home() {

    const isAboveMd = useMediaQuery('(min-width: 1125px)')
    const isAboveSm = useMediaQuery('(min-width: 640px)')
    
    const {name, pfp, username, _id} = useSelector((state)=>state.user)

    let user = useSelector(state => state.user)
    let dispatch = useDispatch()

 

    const logoutHandler =  (e) => {
            e.preventDefault()

            logout().then(res => {
                if(res.status === 200){
                    dispatch(setAuth(false))
                }
            }).catch(err => {
                dispatch(setAuth(false))
                console.log(err)
            }
        )
    }


    
    return (
      
            <div className={`mx-auto  ${isAboveMd ? 'max-w-7xl h-screen flex ' : 'container-sm'} flex ${!isAboveSm && ' flex-col-reverse'}  bg-white `}>
                
                { isAboveSm ? <LeftSidebar username={username} name={name} pfp={pfp} _id={_id}/> : <LeftSidebarMin username={username} name={name} pfp={pfp} _id={_id}/> }

                <div style={{maxWidth : '800px', borderLeft : '1px solid #d3d3d38e', borderRight : '1px solid #d3d3d38e'}}  className="hero  home-middle flex flex-col h-screen flex-grow  overflow-y-scroll  ">
              
                    
                        <FullProtectedRoutes exact path="/">
                            <Hero />
                        </FullProtectedRoutes>

                        <FullProtectedRoutes exact  path="/user/:id">
                            <Profile />
                        </FullProtectedRoutes>

                        <FullProtectedRoutes exact  path="/post">
                            <TopBar pfp={user.pfp} header={"Post"} isAboveSm={isAboveSm} />
                            <Post placeholder={"What's happening"} httpRoute={"tweetPost"}/>
                        </FullProtectedRoutes>

                        <FullProtectedRoutes exact  path="/edit">
                            <EditProfile />
                        </FullProtectedRoutes>
                        
                        <FullProtectedRoutes exact  path="/messages">
                            <Messages />
                        </FullProtectedRoutes>
                 
                        <FullProtectedRoutes exact path="/tweet/:username/:postid">
                            <TweetPage />
                        </FullProtectedRoutes>

                        <FullProtectedRoutes exact path="/explore">
                            <Explore />
                        </FullProtectedRoutes>

                        <FullProtectedRoutes exact path="/search">
                            <TopBar pfp={user.pfp} header={"Search"} isAboveSm={isAboveSm} />
                            <Search />
                        </FullProtectedRoutes>

                </div>

                {isAboveMd && <RightSideBar />}

            
            </div>
      
    )
}


const FullProtectedRoutes = ({children, ...rest }) => {

    const  Auth = useSelector((state)=>state.isAuthenticated)
    const  user = useSelector((state)=>state.user)
  
    return (
  
      
        <Route
            {...rest}
            render={({ location }) => {
                return !Auth ? (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                ) : Auth && !user?.activated ? (
                   <Redirect
                  to={{
                      pathname: '/activate',
                      state: { from: location },
                  }}
              />
                ) : (
                  children
                );
            }}
        ></Route>
    
  
  
    )
  }

export default Home
