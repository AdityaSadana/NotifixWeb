import React, {useState} from 'react'
import logo from '../notifixWeb.png'
import {Link} from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    const [state, dispatch] = useState()
    
    const handleSignOut = () => {
        localStorage.clear()
        dispatch({type: "CLEAR_USER"})
    }

    return (
        <div className="navbar">
            <Link to="/home"><img className="navbar_logo" src={logo} alt="Logo" /></Link>
            <div className="navbar_options">
                <Link to="/" style={{'textDecoration': 'none', 'color': 'gray'}}><h4 onClick={handleSignOut}>SignOut</h4></Link>
                <Link to="/profile" style={{'textDecoration': 'none', 'color': 'gray'}}><h4>Profile</h4></Link>
                <Link to="/createpost" style={{'textDecoration': 'none', 'color': 'gray'}}><h4>Create Post</h4></Link>
            </div>
        </div>
    )
}

export default NavBar
