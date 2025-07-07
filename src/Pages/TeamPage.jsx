import { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import { createTeam, showTeams} from "../services/teamService";
import TeamCard from "../Components/TeamCard";

const TeamPage = () => {
    const [modalTeam, setModalTeam]=useState(false);
    const [formTeam, setFormTeam] = useState({teamName:''});

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const response = await createTeam(formTeam);
            console.log(response.data);
            
            setModalTeam(false);
            setFormTeam({teamName:''}); // réinitialisation de la page pour pouvoir recréer une team 
            
        } catch (error) {
        console.error('Error updating profile', error);        
        }
      }

      const [teams, setTeams] = useState([]);


      const fetchTeams = async () =>{
        try {
            const response = await showTeams();

            setTeams(response.data);

            console.log(response.data);
            
            
        } catch (error) {
            console.error("Error fetching teams", error);
        }
      }

      useEffect(() =>{
        fetchTeams();
      },[])

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center gap-3">

          <Card.Title as="h1" className="mb-4 text-white"> Mes équipes Pokémon :</Card.Title>
          <Button variant="danger" onClick={() => setModalTeam(true)}>
            ✏️ Créer une équipe
          </Button>


      <Modal show={modalTeam} onHide={() => setModalTeam(false)}>
        <Form onSubmit={handleCreateTeam}>
          <Modal.Header closeButton>
            <Modal.Title>Création d'une équipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nom de l’équipe</Form.Label>
              <Form.Control
                type="text"
                value={formTeam.teamName}
                onChange={(e) => setFormTeam({ ...formTeam, teamName: e.target.value })}
                placeholder="ex: Équipe Électrik ⚡"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalTeam(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="danger">
              Ajouter
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    <div className="d-flex flex-wrap justify-content-center  gap-5 col-8">
      <Row className="mt-4 justify-content-center gap-4">
        {teams.map((team, index) => (
          <Col xs="auto" key={index}>
            <TeamCard team={team} />
          </Col>
        ))}
      </Row>
      </div>
    </Container>
  );
};

export default TeamPage;

