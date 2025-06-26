import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../Components/PokemonCard';

const HomePage = () => {
    const [pokemons, setPokemon] = useState([]);


    const fetchPokemon = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`, {
            });
            setPokemon(response.data.results);
            // console.log(response);
            
            

        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    

    useEffect(() => {
        fetchPokemon();
    }, []);


    return <div className='d-flex flex-column align-items-center justify-content-center'>
        <h1 className="pokemon-title">Pokedex</h1>


    <input
        type='texte'
        className='barre form-control col-8'
        placeholder='Rechercher un pokemon'
    />


        <div className='d-flex flex-wrap justify-content-around align-content-center gap-5 col-8'>
            {pokemons.map((pokemon) => {
                return <PokemonCard key={pokemon.name} pokemonC={pokemon} />
            })}
        </div>
    </div>;
}
 
export default HomePage;