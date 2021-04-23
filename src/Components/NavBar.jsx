import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./Context/UserContext";
import "../Styles/Navbar.css";

const NavBar = (props) => {
  const [favourites, setFavourites] = useState(null);
  const context = useContext(UserContext);

  useEffect(() => {
    setFavourites(props.favourites);
  }, [props.favourites]);

  if (!context) return <div>loading...</div>;
  const darkMode = context.user.darkMode;

  return (
    <div className={`navMain ${darkMode ? "dark-mode" : "light-mode"} `}>
      <ul className="navList">
        <li className="navList-item">
          <NavLink
            exact
            to="/"
            className={`navList-item ${darkMode ? "dark-mode" : "light-mode"} `}
          >
            <h3>Pokedex</h3>
          </NavLink>
        </li>
        <li
          className={`navList-item ${darkMode ? "dark-mode" : "light-mode"} `}
        >
          <NavLink
            exact
            to="/settings"
            className={`navList-item ${darkMode ? "dark-mode" : "light-mode"} `}
          >
            <h3>Settings</h3>
          </NavLink>
        </li>
        <li
          className={`navList-item ${darkMode ? "dark-mode" : "light-mode"} `}
        >
            <h3>Favourites : {favourites ? favourites : 0}</h3>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
