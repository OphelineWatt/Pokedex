import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Figure from "react-bootstrap/Figure";
import typeColors from "../utils/typeColors";

const PokemonDetailPage = () => {
  const [pokemonDetails, setPokemonDetail] = useState([]);
  const { name } = useParams();

  //Pour récuperer les details de mes pokemon
  const fetchDetail = async (pokemon) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
        {}
      );

      setPokemonDetail(response.data.stats);

      // console.log(response.data.stats);
    } catch (error) {
      console.error("Error fetching detail pokemon:", error);
    }
  };

  const [names, setName] = useState();
  const [sprite, setSprite] = useState();
  const [types, setType] = useState([]);
  const [height, setHeight] = useState();
  const [weight, setweight] = useState();

  const fetchPhoto = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
        {}
      );

      setSprite(response.data.sprites.other["home"].front_default);
      setName(response.data.name);
      setType(response.data.types);
      setHeight(response.data.height);
      setweight(response.data.weight);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching  pokemon:", error);
    }
  };
  useEffect(() => {
    fetchDetail();
    fetchPhoto();
  }, []);

  return (
    <Figure className="d-flex flex-column align-items-center justify-content-center gap-3">
      <Figure.Image width={171} height={180} alt="171x180" src={sprite} />

      <h2 className="pokemon-title">{names}</h2>

      <div className="rowStyle">
        <p>Taille : {height / 10}M</p>
        <p>Poids: {weight / 10}Kg</p>
      </div>

      {/* console.log(type.type.name) */}

      <div className="rowStyle">
        {types.map((type) => (
          <p
            key={type.type.name}
            style={{
              backgroundColor: typeColors[type.type.name],
              padding: "5px 15px",
              borderRadius: "20px",
              textTransform: "capitalize",
              margin: "5px",
            }}
          >
            {type.type.name}
          </p>
        ))}
      </div>

      <div>
        {pokemonDetails.map((pokemonDetail, index) => (
          <div key={pokemonDetail.stat.name || index}>
            <p>{pokemonDetail.stat.name}</p>

            <ProgressBar
              max={200}
              now={pokemonDetail.base_stat}
              label={pokemonDetail.base_stat}
            />
          </div>
        ))}
      </div>
    </Figure>
  );
};

export default PokemonDetailPage;
