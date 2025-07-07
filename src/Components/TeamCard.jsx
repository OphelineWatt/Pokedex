import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"; // Assure-toi que cette importation existe !

const TeamCard = ({ team }) => {
  const [pokemonInfos, setPokemonInfos] = useState([]);
const [opened, setOpened] = useState([]);



// créer un tableau seulement avec les emplacement utilisé par des pkm
  const pokemons = [
    team.pkm1,
    team.pkm2,
    team.pkm3,
    team.pkm4,
    team.pkm5,
    team.pkm6,
  ].filter(Boolean);

  const fetchPhotos = async () => {
    try {
      const promises = pokemons.map(async (name) => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        return {
          name,
          id: response.data.id,
          sprite: response.data.sprites.other["home"].front_default,
        };
      });

      const results = await Promise.all(promises);
      setPokemonInfos(results);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };



useEffect(() => {
    // afficher seulement les équipes avec pkm
  if (pokemons.length > 0) {
    fetchPhotos();
    setOpened(Array(pokemons.length).fill(false));
  }
}, [team]);

const toggleCard = (index) => {
  setOpened((prev) => {
    const updated = [...prev];
    updated[index] = !updated[index];
    return updated;
  });
};


 return (
  <div className="text-center mb-4">
    <h4 style={{ fontWeight: "bold", color: "#fff3cd" }}>
      Équipe : {team.teamName}
    </h4>


    <div className="d-flex flex-row justify-content-center gap-3 flex-nowrap">
  {pokemonInfos.map((pkm, index) => (
    <div key={index} onClick={() => toggleCard(index)} style={{ cursor: "pointer" }}>
      {!opened[index] ? (
        <img
          src="pokeball.png"
          alt="Pokéball"
          style={{ width: "10rem" }}
        />
      ) : (
        <Card style={{ width: "10rem" }}>
          <Card.Img variant="top" src={pkm.sprite} />
          <Card.Body>
            <Link to={`/details/${pkm.name}`}>
              <Button variant="outline-danger">Détails</Button>
            </Link>
          </Card.Body>
        </Card>
      )}
    </div>
  ))}
</div>

  </div>
);


}
export default TeamCard;
