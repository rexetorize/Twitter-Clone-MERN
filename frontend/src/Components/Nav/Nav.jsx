import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}

export default Nav
