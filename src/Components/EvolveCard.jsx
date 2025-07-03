import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';

 
const EvolveCard = ({ name }) => {
  const [sprite, setSprite] = useState();
  const [id, setId] = useState();

  const fetchEvol = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setSprite(response.data.sprites.other['home'].front_default);
      setId(response.data.id);
    } catch (error) {
      console.error("Error fetching name pokemon:", error);
    }
  };

  useEffect(() => {
    fetchEvol();
  }, [name]);

  // console.log(name);
  

  return (
<div>
  <Card
    style={{
      width: '12rem',
      backgroundColor: '#005063',
      border: '2px solid #212121',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(33,33,33,0.5)',
      color: '#F5F5F5',
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 0 10px #FFEB3B';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <Link to={`/details/${name}`}>
      <Card.Img
        variant="top"
        src={sprite}
        alt={name}
      />
    </Link>
    <Card.Body id="bodyCard" style={{ textAlign: 'center' }}>
      <Card.Title style={{ color: '#FFEB3B', fontWeight: 'bold' }}>
        {name} N°{id}
      </Card.Title>
    </Card.Body>
  </Card>
</div>




  );
};
export default EvolveCard;

