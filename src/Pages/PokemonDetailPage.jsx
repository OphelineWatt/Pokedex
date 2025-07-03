import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Figure from "react-bootstrap/Figure";
import typeColors from "../utils/typeColors";
import Image from "react-bootstrap/Image";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
import EvolveCard from "../Components/EvolveCard";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { chooseTeams, addPokemonToTeam } from "../services/teamService";



const PokemonDetailPage = () => {
  const [pokemonDetails, setPokemonDetail] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();
  
  
  
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
      
      
      
      
    } catch (error) {
      console.error("Error fetching  pokemon:", error);
    }
  };
  
  
  const [evolutionData, setEvolutionData] = useState([]);
  
  const fetchEvolution = async () => {
    try {
      const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      const evolutionUrl = speciesRes.data.evolution_chain.url;
      // console.log(speciesRes);
      
      const evolutionChainRes = await axios.get(evolutionUrl);
      // console.log(evolutionChainRes);
      
      const evoNames = extractEvolutions(evolutionChainRes.data.chain)
      
      
      setEvolutionData(evoNames);
    } catch (error) {
      console.error('Error fetching evolution data:', error);
    }
  }
  const [modalAddTeam, setModalAddTeam]= useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  
  const userTeams = async () => {
    try {
      const response = await chooseTeams();
      
      setTeams(response.data)
      
      
    } catch (error) {

      console.error('Erreur lors de la récupération des équipes:', error)
      
    }
  };

  const handleAddPokemonTeam = async (e) => {

    e.preventDefault();

    console.log("coucou")
    try {
      console.log(selectedTeam)
      console.log(name)
      await addPokemonToTeam(selectedTeam, {pokemonName : name});
      setModalAddTeam(false);
      
    } catch (error) {

      console.error('Erreur lors de lajout du pokemon à lequipe :', error)
      
    }
  }
  
  useEffect(() => {
    fetchDetail();
    fetchPhoto();
    fetchEvolution();
    userTeams();
  }, [name]);
  
  const extractEvolutions = (chain) => {
    const evolutionNames = [];
    
  let current = chain;
  
  while (current && current.species){
    evolutionNames.push(current.species.name)
    current = current.evolves_to[0];
  }
  
  
  
  return evolutionNames
}
  return (
    <div className="d-flex flex-column justify-content-around align-items-center">
      <div className="d-flex w-100 flex-row justify-content-around align-items-center">
        <h2 className="pokemon-title">{names}</h2>
        <CloseButton
          className="position-absolute top-0 end-0"
          style={{ margin: "0.5rem" }}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="d-flex flex-row justify-content-around align-items-center">
        <Image src={sprite} rounded />
        <Figure className="d-flex flex-column align-items-center justify-content-center gap-3">
          <div className="rowStyle">
            <p>Taille : {height / 10}M</p>
            <p>Poids: {weight / 10}Kg</p>
          </div>
      <Button variant="danger" onClick={() => setModalAddTeam(true)}>
        ajouter à l'équipe
      </Button>
<Modal show={modalAddTeam} onHide={() => setModalAddTeam(false)}>
                    <Form onSubmit={handleAddPokemonTeam}>
                        <Modal.Header closeButton>
                            <Modal.Title>ajout d'un pokemon dans une équipe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Nom d’équipe</Form.Label>
                                <Form.Select
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                >
                                  <option value="">Sélectionner une équipe</option>
                                  {teams.map(index => (
                                    <option key={index.idTeams} value={index.idTeams}>
                                      {index.teamName}
                                    </option>
                                  ))}
                                </Form.Select>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModalAddTeam(false)}>Annuler</Button>
                            <Button type="submit" variant="primary">ajouter</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

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
                  max={110}
                  now={pokemonDetail.base_stat}
                  label={pokemonDetail.base_stat}
                  />
              </div>
            ))}
          </div>
        </Figure>
      </div>
                  <div className="rowStyle">
                  {evolutionData.map((evo) => {
                    return <EvolveCard key={evo} name={evo}/>;
                  })}
                  </div>
    </div>
  );
};

export default PokemonDetailPage;
