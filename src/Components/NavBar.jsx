import { Navbar, Container, NavLink, } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
// import { useState } from 'react';



function NavBar() {
  // const [token, setToken] = useState(null);

  // setToken(localStorage.getItem('token'));
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="p-3" sticky="top">
        <Image src="pokedexlogo.png" rounded  width="50"
              height="50"
              className="d-inline-block align-top"/>
      <Container>
        <Navbar.Brand href="/">Pokedex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/register">inscription</Nav.Link>
            <Nav.Link href="/login">connexion</Nav.Link>
            <Nav.Link href="/profile">profil</Nav.Link>
            <Nav.Link href="/team">team</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar