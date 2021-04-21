import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import '../Styles/Navbar.css'

const NavBar = (props) => {

    const [favourites, setFavourites] = useState(null)


    useEffect(() => {
        setFavourites(props.favourites)
    }, [props.favourites])



    return (
        <div className="navMain">
            <ul className="navList">
                <li>
                    <NavLink exact to="/">Pokedex</NavLink>
                </li>
                <li>
                    <NavLink exact to="/settings">Settings</NavLink>
                </li>
                <li>
                    Favourites: {favourites ? favourites : 0}
                </li>
            </ul>
            
        </div>
    )
}

export default NavBar
