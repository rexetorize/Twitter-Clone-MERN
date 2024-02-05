import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'


import {useSelector} from 'react-redux'


import {useLoadingWithRefresh} from './hooks/useLoadingWithRefresh'
import Activate from './Pages/Activate/Activate'
import Spinner from './Components/Spinner/Spinner'






function App() {
  const { loading } = useLoadingWithRefresh();
 

  return (
    <>
      {loading ? <Spinner/>
      
      : 
      
    <Router>
      <Switch>

        <GuestRoute exact path="/login">
          <Login />
        </GuestRoute>

        <SemiPrivateRoutes exact path="/activate">
          <Activate />
        </SemiPrivateRoutes>

        <FullProtectedRoutes  path="/">
          <Home />
        </FullProtectedRoutes>

        
    
      </Switch>
   </Router>

      }
    </>
  )
}


function GuestRoute({children, ...rest }) {
  
  const  Auth = useSelector((state)=>state.isAuthenticated)
  
  return(

    
      <Route {...rest} render={({location}) => 

          {

           return Auth ? (
              <Redirect to={{
                pathname : '/',
                state : {from : location},

              }} />
            ) 
            
            : 
            
            (children)

          }

         }>
        

      </Route>

  )

}


const SemiPrivateRoutes = ({children, ...rest}) => {

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
              children
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: location },
                    }}
                />
            );
        }}
    ></Route>
);
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


export default App
