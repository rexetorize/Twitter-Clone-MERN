import React from 'react'
import EmailSignUpPassword from './EmailSignUpPassword'
import EmailSignUp from './EmailSignUp'
import EmailSignUpOtp from './EmailSignUpOtp'
import useMediaQuery from '../../../hooks/useMediaQuery'
function EmailSignUpHandler() {
    const parts = {
            1 : EmailSignUp,
            2 : EmailSignUpPassword
    }
    const isAboveSmall = useMediaQuery("(min-width: 500px)");
    const [page, setPage] = React.useState(1);

    const nextPage = () => {
        setPage(page + 1)
    }
  
    const CurrentPage = parts[page];

    return (
        <>
            <CurrentPage nextPage={nextPage} isAboveSmall={isAboveSmall}/>   
        </>
    )
}

export default EmailSignUpHandler
