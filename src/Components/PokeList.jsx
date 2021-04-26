import React, { useState, useEffect, useContext } from 'react';
import UserContext from './Context/UserContext'
import api from "axios";
import withUser from "./Context/withUser";
import "../Styles/PokeList.css";

const PokeList = (props) => {
  const context = useContext(UserContext);
  const [pokeList, setPokeList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pokeTotal, setPokeTotal] = useState(null);

  useEffect(() => {
    api
      .get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${props.limit}&offset=${offset}`
      )
      .then((dbRes) => {
        setPokeTotal(dbRes.data.count);
        setPokeList(dbRes.data.results);
      })
      .catch((err) => console.log(err));
  }, [offset, props.limit]);

  function handleMoveListPrev() {
    if (offset === 0) return;
    setOffset(offset - props.limit);
  }

  function handleMoveListNext() {
    setOffset(offset + props.limit);
  }

  if (!pokeList) return <div>loading...</div>;
  // console.log(pokeList);

  const darkMode = context.user.darkMode;
  console.log(darkMode);

  return (
    <div className="pokelist-main">
        <div className={`poketotal-box ${darkMode ? "dark-mode" : "light-mode"} `}>
            <h3>Total Pokemon: {pokeTotal}</h3>
        </div>
      <table className="pokeTable">
        <thead className="pokeTable-head" >
          <tr className="poke-table-row">
            <th className="poke-table-title"><h3>Pokemon name</h3></th>
            <th className="poke-table-title"><h3>Add to favourites?</h3></th>
          </tr>
        </thead>
        <tbody className="pokeTable-body" >
          {pokeList.map((pokemon) => (
            <tr
              className={`pokeList-item 
              ${props.favourites.includes(pokemon.name) && darkMode ? "dark-mode" : ""} 
              ${props.favourites.includes(pokemon.name) && !darkMode ? "light-mode" : ""} `}
              key={pokemon.name}
            >
              <td
                className="pokeList-name"
                onClick={() => {
                  props.changePokemon(pokemon.name);
                }}
              >
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
              </td>
              {props.favourites.includes(pokemon.name) ? (
                <td className="pokeList-favourite">
                  <button className={`pokelist-button ${darkMode ? "light-mode" : "dark-mode"} `} onClick={() => props.removeFromFave(pokemon.name)}>
                    Remove
                  </button>
                </td>
              ) : (
                <td className="pokeList-favourite">
                  <button className={`pokelist-button ${darkMode ? "dark-mode" : "light-mode"} `} onClick={() => props.addToFave(pokemon.name)}>
                    Add
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pageLinks">
        <p className={`pokelink-button ${darkMode ? "dark-mode" : "light-mode"} `} onClick={handleMoveListPrev}>Previous</p>
        <p style={{color: "whitesmoke"}}>
          {offset + 1} - {Number(props.limit) + Number(offset)}
        </p>
        <p className={`pokelink-button ${darkMode ? "dark-mode" : "light-mode"} `} onClick={handleMoveListNext}>Next</p>
      </div>
    </div>
  );
};

export default withUser(PokeList);
