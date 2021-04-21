import React, { useState } from "react";
import PokeDetails from "../Components/PokeDetails";
import PokeList from "../Components/PokeList";
import "../Styles/Ditectory.css";

const Directory = (props) => {
  const [pokemon, setPokemon] = useState("ivysaur");
 

  function handleChangePokemon(pokemon) {
    setPokemon(pokemon);
  }


  return (
    <div className="directory_main">
      <div className="left-frame">
        <PokeList
          changePokemon={handleChangePokemon}
          addToFave={props.addToFavourites}
          removeFromFave={props.removeFromFavourites}
          favourites={props.favourites}
          limit={props.listLimit}
        />
      </div>
      <div className="right-frame">
        <PokeDetails pokemon={pokemon} />
      </div>
    </div>
  );
};

export default Directory;
