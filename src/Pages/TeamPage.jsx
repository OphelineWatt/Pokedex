import { useState } from "react";
import {Card,Container,Row,Col,Button,Modal,Form} from "react-bootstrap";
import { createTeam, userTeams} from "../services/teamService";

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
  return (
    <Container className="mt-5">
      <h1>Mes équipes</h1>
      <Button variant="danger" onClick={() => setModalTeam(true)}>
        ✏️ créer équipe
      </Button>
      <Modal show={modalTeam} onHide={() => setModalTeam(false)}>
                <Form onSubmit={handleCreateTeam}>
                    <Modal.Header closeButton>
                        <Modal.Title>création d'une équipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nom d’équipe</Form.Label>
                            <Form.Control
                                type="text"
                                value={formTeam.teamName}
                                onChange={(e) => setFormTeam({ ...formTeam, teamName: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalTeam(false)}>Annuler</Button>
                        <Button type="submit" variant="primary">ajouter</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
    </Container>
  );
};

export default TeamPage;
