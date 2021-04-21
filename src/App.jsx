import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Directory from "./Pages/Directory";
import Settings from "./Pages/Settings";

function App() {
  const [favourites, setFavourites] = useState([]);
  const [listLimit, setListLimit] = useState(20);

  function handleChangeLimit(limit) {
    setListLimit(limit)
  }

  function handleAddToFavourites(pokemon) {
    setFavourites([...favourites, pokemon]);
  }

  function handleRemoveFromFavourites(pokemon) {
    setFavourites(favourites.filter(poke => poke !== pokemon))
  }

  console.log(listLimit);

  return (
    <div className="App">
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
              />
            );
          }} 
          />
      </Switch>
    </div>
  );
}

export default App;
