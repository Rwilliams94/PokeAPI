import React, { useState, useEffect, useContext } from 'react';
import UserContext from './Context/UserContext'
import api from 'axios';
import '../Styles/PokeDetails.css'

const PokeDetails = (props) => {

    const context = useContext(UserContext);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {   

        async function fetchData() {
            try {
    
                const result = await api.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
                // const abilities = [];
                // result.data.abilities.forEach(async(ability) => {
                //     const details = await api.get(ability.url)
                // })
                const { name, weight, height, abilities, sprites,} = result.data
                
                async function addAbilities (abilities) {
                    const aArray = abilities.map(async n => {
                        const response = await api.get(n.ability.url);
                        return response.data
                    })                    
                    const abilitiesList = await Promise.all(aArray)
                    return abilitiesList
                } 
                
                const abilityList = await addAbilities(abilities)
                // console.log(abilityList);
                const pokemonDetails = { name, weight, height, abilityList, sprites}

                setPokemon(pokemonDetails)
                
            } catch(err) {
                console.log(err)
            }
        
        }
        fetchData();

    }, [props.pokemon])


    if(!pokemon) return <div className="hold-box"><img className="hold-image" src="https://res.cloudinary.com/dahzswwzk/image/upload/v1619195906/pokecard_ujgqy4.jpg" alt="pokecard"/></div>
    // console.log(pokemon);

    const darkMode = context.user.darkMode;

    return (
        <div className={`details-box ${darkMode ? "dark-mode" : "light-mode"} `}>
            <div className="poke-name">
                <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            </div>
            <div className={`poke-image-box ${darkMode ? "light-mode" : "dark-mode"} `}>
                <img className="poke-image" src={pokemon.sprites.front_default} alt={pokemon.name}/>
            </div>
            <div className="databox">
                <p><b>height: {pokemon.height} dm</b></p>
                <p><b>weight: {pokemon.weight} hg</b></p>
            </div>
            <div className="abilities-box">
                {/* <h3>Abilities</h3> */}
                <table className="abilities-table">
                    {pokemon.abilityList.map(ability => (
                        <tr className="abilities-table-row">
                            <td className="abilities-table-title"><h4>{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}</h4></td>
                            <td className="abilities-table-effect"><p>{ability.effect_entries[0].language.name === "en" ? ability.effect_entries[0].short_effect : ability.effect_entries[1].short_effect }</p></td>
                        </tr>
                    
                    ))}
                
                </table>
            </div>
        </div>
    )
}

export default PokeDetails
