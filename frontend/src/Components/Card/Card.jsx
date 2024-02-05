import React from 'react'



function Card({ children }) {

    

    return (
        <div className=' w-full h-screen  md:w-2/4 md:h-4/5 lg:w-4/12 lg:h-4/5  shadow-lg'>
            {children}
        </div>
    )
}

export default Card
