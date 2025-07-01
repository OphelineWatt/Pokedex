import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const PokemonCard = ({pokemonC}) => {

    const [sprite, setSprite] = useState()
    const [id, setId] = useState()
    const [cries, setCries] = useState()

    const fetchPhoto = async (pokemonC) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonC.name}`, {
        
            });

            setSprite(response.data.sprites.other['home'].front_default);
            setId(response.data.id);
            setCries(response.data.cries.latest)

            
            
            
            
            

        } catch (error) {
            console.error("Error fetching name pokemon:", error);
        }
    }
    
    useEffect(() => {
        fetchPhoto(pokemonC);
    }, [pokemonC]);

      const playCry = () => {
    if (cries) {
      new Audio(cries).play();
    }
  };



    return <>
     <Card  style={{ width: '12rem'}}>
      <Card.Img variant="top" style={{ cursor: 'pointer' }} src={sprite} onClick={playCry} />
      <Card.Body id='bodyCard'>
        <Card.Title>{pokemonC.name} N°{id} </Card.Title>
        <Link to={`/details/${pokemonC.name}`}>
        <Button variant="outline-danger" >Détails</Button>
        </Link>
      </Card.Body>
    </Card>
    </>;
}
 
export default PokemonCard;