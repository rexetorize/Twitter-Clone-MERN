import React from 'react'
import {styles} from './Login.styles.css'
import useMediaQuery from '../../hooks/useMediaQuery'
import {GOOGLELOGINURL, GITHUBLOGINURL, URL} from '../../http/index'

import OAuthSignup from './OAuthSignup';

import EmailSignin from './EmailSignin';
import EmailSignUpHandler from './EmailSignUpHandler/EmailSignUpHandler';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

function Login() {

    const isAboveSmall = useMediaQuery("(min-width: 500px)");
    
    
    
    return (
        <div className='login-div flex subpixel-antialiased'>
           {isAboveSmall ? <img className='login-left-img' src='/images/twitter.jpg'  alt='logo' /> : null}

        <Router>
            <Switch>
                <Route exact path='/login'>
                    <OAuthSignup isAboveSmall={isAboveSmall}/>
                </Route>

                <Route exact path='/login/email-signup'>
                    <EmailSignUpHandler isAboveSmall={isAboveSmall}/>
                </Route>

                <Route exact path='/login/email-signin'>
                    <EmailSignin isAboveSmall={isAboveSmall}/>
                </Route>
            </Switch>


        </Router>

     
        {/* <Modal>
            <h1>Hello World</h1>
        </Modal> */}

    </div>
    )
}



export default Login
