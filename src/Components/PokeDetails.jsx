import React, { useState, useEffect } from 'react';
import api from 'axios';
import '../Styles/PokeDetails.css'

const PokeDetails = (props) => {

    
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


    if(!pokemon) return <div>loading...</div>
    // console.log(pokemon);


    return (
        <div>
            <img className="poke-image" src={pokemon.sprites.front_default} alt={pokemon.name}/>
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <div className="databox">
                <p><b>{pokemon.height} dm</b></p>
                <p><b>{pokemon.weight} hg</b></p>
            </div>
            <div>
                <h2>Abilities</h2>
                <table>
                <tr>
                    <th>Ability</th>
                    <th>Effect</th>
                </tr>
                
                    {pokemon.abilityList.map(ability => (
                        <tr>
                            <td><h4>{ability.name}</h4></td>
                            <td><p>{ability.effect_entries[0].language.name === "en" ? ability.effect_entries[0].short_effect : ability.effect_entries[1].short_effect }</p></td>
                        </tr>
                    
                    ))}
                
                </table>
            </div>
        </div>
    )
}

export default PokeDetails
