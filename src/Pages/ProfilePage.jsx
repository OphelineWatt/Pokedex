import { useEffect, useState } from "react";
import { getProfile , updateProfile, updatePassword} from "../services/userService";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import {useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState (false);
  const [form, setForm] = useState({name:'', mail:''})
  const navigate = useNavigate();
  const [modalPassword, SetModalPassword] = useState(false);
  const [formPassword, SetFormPassword] =useState({oldPassword:"", newPassword:""});

  const fetchUser = async () => {
    try {
      const response = await getProfile();

      setUser(response.data);
      

    } catch (error) {
        console.error("Error fetching user profile", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await updateProfile(form);
        console.log(response.data);
        location.reload();
        setShow(false);
        
    } catch (error) {
    console.error('Error updating profile', error);        
    }
  }

  const handleUpdatePassword = async (e) => {
        e.preventDefault();
    try {
        if(formPassword.oldPassword != formPassword.newPassword){

            const response = await updatePassword(formPassword);
            console.log(response.data);

            localStorage.removeItem('token');

            navigate('/login');
        } else {
            alert ("Le mot de passe est identique à l'ancien mot de passe !");
        }
        
    } catch (error) {
    console.error('Error updating password', error);        
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return <>
  <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={6}>
        <Card bg="light" border="danger" className="text-center shadow">
          <Card.Header className="bg-danger text-white">
            <h3>🔍 PokéProfil</h3>
          </Card.Header>
          <Card.Body>
            <Card.Title>👤 {user.name}</Card.Title>
            <Card.Text>📧 {user.mail}</Card.Text>

            <div className="d-grid gap-2 mt-4">
              <Button variant="danger" onClick={() => setShow(true)}>
                ✏️ Modifier le profil
              </Button>
              <Button variant="warning" onClick={() => SetModalPassword(true)}>
                🔐 Modifier mot de passe
              </Button>
            </div>
          </Card.Body>
          <Card.Footer className="text-muted">
            Dernière mise à jour : aujourd’hui
          </Card.Footer>
        </Card>
      </Col>
    </Row>

  <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier mes informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nom d’utilisateur</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.mail}
                onChange={(e) => setForm({ ...form, mail: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
            <Button type="submit" variant="dark">Enregistrer</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={modalPassword} onHide={() => SetModalPassword(false)}>
                <Form onSubmit={handleUpdatePassword}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier mot de passe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>ancien mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                value={formPassword.oldPassword}
                                onChange={(e) => SetFormPassword({ ...formPassword, oldPassword: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>nouveau mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                value={formPassword.newPassword}
                                onChange={(e) => SetFormPassword({ ...formPassword, newPassword: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => SetModalPassword(false)}>Annuler</Button>
                        <Button type="submit" variant="primary">Enregistrer</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
              </Container>

  </>
};

export default ProfilePage;
