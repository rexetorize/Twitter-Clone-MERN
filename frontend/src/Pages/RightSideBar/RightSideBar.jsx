import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import RightSideBarContainer from './RightSideBarContainer/RightSideBarContainer'

function RightSideBar() {
    return (
        <div className='pt-2 ml-2 mr-1 w-80 h-full'>
            <SearchBar />

            <RightSideBarContainer />
        </div>
    )
}

export default RightSideBar
