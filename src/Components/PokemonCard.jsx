import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const PokemonCard = ({pokemonC}) => {

    const [sprite, setSprite] = useState()

    const fetchPhoto = async (pokemonC) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonC.name}`, {
        
            });

            setSprite(response.data.sprites.other['home'].front_default);
            
            // console.log(response);
            
            

        } catch (error) {
            console.error("Error fetching name pokemon:", error);
        }
    }
    
    useEffect(() => {
        fetchPhoto(pokemonC);
    }, [pokemonC]);
    return <>
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={sprite} />
      <Card.Body>
        <Card.Title>{pokemonC.name}</Card.Title>
        <Link to={`/details/${pokemonC.name}`}>
        <Button variant="primary">Détails</Button>
        </Link>
      </Card.Body>
    </Card>
    </>;
}
 
export default PokemonCard;