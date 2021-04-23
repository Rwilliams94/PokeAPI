import React, { useState, useEffect } from "react";
import api from "axios";
import withUser from "./Context/withUser";
import "../Styles/PokeList.css";

const PokeList = (props) => {
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

  return (
    <div>
      <h3>Total Pokemon: {pokeTotal}</h3>
      <table className="pokeTable">
        <thead className="pokeTable-head" >
          <tr>
            <th>Pokemon name</th>
            <th>add to favourites?</th>
          </tr>
        </thead>
        <tbody className="pokeTable-body" >
          {pokeList.map((pokemon) => (
            <tr
              className={`pokeList-item ${
                props.favourites.includes(pokemon.name) ? "favourite" : ""
              }`}
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
                  <button onClick={() => props.removeFromFave(pokemon.name)}>
                    remove from favourite
                  </button>
                </td>
              ) : (
                <td>
                  <button onClick={() => props.addToFave(pokemon.name)}>
                    add to favourte
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pageLinks">
        <p onClick={handleMoveListPrev}>previous</p>
        <p>
          {offset + 1} - {Number(props.limit) + Number(offset)}
        </p>
        <p onClick={handleMoveListNext}>next</p>
      </div>
    </div>
  );
};

export default withUser(PokeList);
