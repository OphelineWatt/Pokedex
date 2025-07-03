import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../Components/PokemonCard";
import InputGroup from "react-bootstrap/InputGroup";

const HomePage = () => {
  const [pokemons, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");



  const fetchPokemon = async () => {
    try {
      if (search === "") {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`,
          {}
        );
        setPokemon(response.data.results);

      } else {
        //Recherche des pokemon
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${search}`
        );
        //pokemons est un tableau  d'objet
        setPokemon([{ name: response.data.name }]);
      }


    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
// console.log(response.data.cries.latest);

  useEffect(() => {
    fetchPokemon();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="pokedex-background">
      <div className="d-flex flex-column align-items-center justify-content-center gap-3">
        <h1 className="pokemon-title">Pokedex</h1>

        <input
          type="texte"
          className="barre form-control col-4"
          placeholder="Rechercher un pokemon"
          value={search}
          onChange={handleSearchChange}
        />

        <div className="d-flex justify-content-between align-items-center col-8">
          <button
            className="btn-pokedex"

            onClick={() => setPage(page - 20)}
          >
            ◀ Précédent​
          </button>
          <button
            className="btn-pokedex"

            onClick={() => setPage(page + 20)}
          >
            Suivant ▶​
          </button>
        </div>

        <div className="d-flex flex-wrap justify-content-center align-content-center gap-5 col-8">
          {pokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.name} pokemonC={pokemon} />;
          })}
        </div>

        <div className="d-flex justify-content-between align-items-center col-8">
          <button
            className="btn-pokedex"

            onClick={() => setPage(page - 20)}
          >
            ◀ Précédent​
          </button>
          <button
            className="btn-pokedex"

            onClick={() => setPage(page + 20)}
          >
            Suivant ▶​
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
