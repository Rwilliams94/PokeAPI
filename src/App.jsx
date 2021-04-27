import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Directory from "./Pages/Directory";
import Settings from "./Pages/Settings";
import Lost from './Pages/Lost';
import UserContext from "./Components/Context/UserContext"
import api from './API/apiHandler'

function App() {
  const context = useContext(UserContext)
  const [favourites, setFavourites] = useState(null);
  const [listLimit, setListLimit] = useState(null);

  useEffect(() => {
    
    api
    .getUser()
    .then(user => {
      setFavourites(user.favourites)
      setListLimit(user.listLength)
    })
    
  }, [])


  function handleChangeLimit(limit) {

    const userId = context.user._id
    api
    .editUser(userId, limit)
    .then(response => setListLimit(response.listLength))

  }

  function handleChangeTheme(theme) {

    const userId = context.user._id
    api
    .editUser(userId, theme)
    .then(response => setListLimit(response.listLength))

  }

  function handleAddToFavourites(pokemon) {
    const userId = context.user._id
    const updateName = {"name": pokemon}
    api
    .addPokemon(userId, updateName)
    .then(response => setFavourites(response.favourites))
  }

  function handleRemoveFromFavourites(pokemon) {
    const updateName = {"name": pokemon}
    const userId = context.user._id
    api
    .removePokemon(userId, updateName)
    .then(response => setFavourites(response.favourites))
  }


  if (favourites === null) return <div>loading...</div>
  if (context === undefined) return <div>loading...</div>
  const darkMode = context.user.darkMode;

  return (
    <div 
      className="App"
      style={{backgroundImage: `${darkMode ? `url("https://res.cloudinary.com/dahzswwzk/image/upload/v1619439020/dark_background_whh8ck.jpg")` : `url("https://res.cloudinary.com/dahzswwzk/image/upload/v1619439018/light_background_okqvst.jpg")` }`,
    backgroundSize: "cover"}}
    >
      <NavBar favourites={favourites.length} />

      <Switch>
        <Route
          exact
          path="/"
          render={(historyProps) => {
            return (
              <Directory
                {...historyProps}
                favourites={favourites}
                listLimit={listLimit}
                addToFavourites={handleAddToFavourites}
                removeFromFavourites={handleRemoveFromFavourites}
              />
            );
          }}
        />
        <Route 
          exact 
          path="/settings" 
          render={(historyProps) => {
            return (
              <Settings
                {...historyProps}
                listLimit={listLimit}
                changeLimit={handleChangeLimit}
                changeTheme={handleChangeTheme} 
              />
            );
          }} 
          />
        <Route path="*" component={Lost} />
      </Switch>
    </div>
  );
}

export default App;
